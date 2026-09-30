const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

// Load production data in the same order as the application.
function load(beforeFamilies = () => {}) {
  const context = vm.createContext({window:{}});
  for (const [, file] of read('index.html').matchAll(/<script src="([^"]+)"/g)) {
    if (file === 'app.js') break;
    if (file === 'cocktail-families.js') beforeFamilies(context.window.FLAVOR_ATLAS_DATA);
    vm.runInContext(read(file), context, {filename:file});
  }
  return context;
}

// Capture rendered markup and real event handlers without a browser dependency.
function explorer(context) {
  const handlers = new Map();
  let html = '';
  const footer = {insertAdjacentHTML:(_, markup) => { html += markup; }};
  Object.assign(context, {
    state:{},
    esc:value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'),
    layout:markup => { html = markup; },
    renderRelationships:() => { html = 'ingredient graph'; },
    renderCocktailProfile:() => { html = ''; },
    render:() => {},
    document:{
      querySelector:selector => selector === '.footer' ? footer : null,
      querySelectorAll:selector => {
        const match = selector.match(/^\[data-(.+)\]$/);
        if (!match) return [];
        const attr = match[1];
        const key = attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        return [...html.matchAll(new RegExp(`data-${attr}="([^"]+)"`, 'g'))].map(([, value]) => ({
          dataset:{[key]:value},
          addEventListener:(event, handler) => handlers.set(`${attr}:${value}:${event}`, handler)
        }));
      }
    }
  });
  context.window.scrollTo = () => {};
  vm.runInContext(read('cocktail-family-explorer.js'), context);
  return {
    show(id, filter = 'All') {
      context.state.familyCocktailId = id;
      context.state.familyFilter = filter;
      context.renderRelationships();
      return html;
    },
    profile(id) { context.state.selectedCocktailId = id; context.renderCocktailProfile(); return html; },
    click(attr, value) { handlers.get(`${attr}:${value}:click`)(); return html; },
    key(attr, value, key) { handlers.get(`${attr}:${value}:keydown`)({key, preventDefault(){}}); return html; }
  };
}

test('complete canon has unique IDs, valid families, and 45 ID-based edges', () => {
  const d = load().window.FLAVOR_ATLAS_DATA;
  const ids = new Set(d.cocktails.map(c => c.id));
  const families = new Set(d.cocktailFamilyTaxonomy.map(f => f.id));
  assert.equal(d.cocktails.length, 150);
  assert.equal(ids.size, 150);
  assert.equal(families.size, 18);
  assert.equal(d.cocktailLineage.length, 45);
  assert.equal(Object.values(d.cocktailFamilySummary.counts).reduce((a,b) => a+b), 150);
  for (const c of d.cocktails) assert.ok(families.has(c.structuralFamilyId));
  for (const e of d.cocktailLineage) {
    assert.ok(ids.has(e.fromId) && ids.has(e.toId));
    assert.notEqual(e.fromId, e.toId);
    assert.ok(!('from' in e) && !('to' in e));
  }
});

test('egg-white sours, true flips, cream cocktails, and fizzes retain their structures', () => {
  const d = load().window.FLAVOR_ATLAS_DATA;
  const expected = {
    'FA-0022':'sour', 'FA-0031':'sour', 'FA-0039':'sour', 'FA-0048':'sour',
    'IBA-009':'sour', 'IBA-061':'sour', 'IBA-024':'flip-cream',
    'FA-0040':'flip-cream', 'IBA-001':'flip-cream', 'IBA-047':'flip-cream',
    'FA-0029':'flip-cream', 'IBA-025':'fizz-collins', 'FA-0034':'fizz-collins'
  };
  for (const [id, family] of Object.entries(expected)) {
    assert.equal(d.cocktails.find(c => c.id === id).structuralFamilyId, family, id);
  }
});

test('new egg-white sours and tropical slings use the corrected fallback rules', () => {
  const d = load(d => d.cocktails.push(
    {id:'test-sour', name:'Test drink', family:'Egg-white sour'},
    {id:'test-sling', name:'Test drink', family:'Tropical sling'}
  )).window.FLAVOR_ATLAS_DATA;
  assert.equal(d.cocktails.find(c => c.id === 'test-sour').structuralFamilyId, 'sour');
  assert.equal(d.cocktails.find(c => c.id === 'test-sling').structuralFamilyId, 'sling');
});

test('renames, duplicate names, punctuation, and aliases cannot sever edges or curated families', () => {
  const context = load(d => {
    for (const c of d.cocktails) { c.name = 'Same “renamed” drink'; c.aliases = ['new alias']; }
  });
  const ui = explorer(context);
  const d = context.window.FLAVOR_ATLAS_DATA;
  for (const edge of d.cocktailLineage) {
    const html = ui.show(edge.fromId);
    assert.ok(html.includes(`data-family-cocktail="${edge.toId}"`), `${edge.fromId} -> ${edge.toId}`);
  }
  assert.equal(d.cocktails.find(c => c.id === 'FA-0039').structuralFamilyId, 'sour');
  assert.equal(d.cocktails.find(c => c.id === 'IBA-065').structuralFamilyId, 'sling');
  d.cocktails.find(c => c.id === 'IBA-020').name = 'Renamed Negroni';
  assert.match(ui.show('IBA-006'), /Renamed Negroni → Same “renamed” drink/);
  assert.match(ui.profile('IBA-006'), /Renamed Negroni/);
});

test('relative edges are symmetric in graphs, notes, and profiles from either endpoint', () => {
  const context = load();
  const ui = explorer(context);
  const d = context.window.FLAVOR_ATLAS_DATA;
  for (const edge of d.cocktailLineage.filter(e => /relative$/.test(e.relation))) {
    assert.equal(edge.directed, false);
    for (const [id, other] of [[edge.fromId,edge.toId],[edge.toId,edge.fromId]]) {
      const html = ui.show(id);
      const node = html.match(new RegExp(`<g[^>]+data-family-cocktail="${other}"[\\s\\S]*?</g>`));
      assert.ok(node, `${id} -> ${other}`);
      assert.ok(node[0].includes(`>${edge.relation}</text>`));
      assert.match(html, /↔/);
      assert.doesNotMatch(html, /ancestor\/parent|variation\/child/);
      assert.ok(ui.profile(id).includes(`<span>${edge.relation}</span>`));
    }
  }
});

test('actual variations retain source direction and recenter by ID on keyboard activation', () => {
  const context = load();
  const ui = explorer(context);
  assert.match(ui.show('IBA-006'), /Source of base-spirit variation/);
  assert.match(ui.show('IBA-020'), /Americano → Negroni/);
  ui.key('family-cocktail', 'IBA-006', 'Enter');
  assert.equal(context.state.familyCocktailId, 'IBA-006');
  assert.match(ui.profile('IBA-006'), /Source of base-spirit variation/);
});

test('Sling card selects Singapore Sling instead of leaving the prior drink visible', () => {
  const context = load();
  const ui = explorer(context);
  ui.show('IBA-020');
  const html = ui.click('family-filter', 'sling');
  assert.equal(context.state.familyCocktailId, 'IBA-065');
  assert.equal(context.window.FLAVOR_ATLAS_DATA.cocktailFamilySummary.counts.sling, 1);
  assert.match(html, /<h4>Singapore Sling<\/h4>/);
  assert.doesNotMatch(html, /<h4>Negroni<\/h4>/);
});

test('empty filters clear stale content and recover through All families', () => {
  const context = load();
  const d = context.window.FLAVOR_ATLAS_DATA;
  d.cocktails = d.cocktails.filter(c => c.id !== 'IBA-065');
  d.cocktailFamilySummary.counts.sling = 0;
  const ui = explorer(context);
  ui.show('IBA-020');
  const html = ui.click('family-filter', 'sling');
  assert.equal(context.state.familyCocktailId, null);
  assert.match(html, /role="status"/);
  assert.match(html, /<select[^>]+disabled/);
  assert.doesNotMatch(html, /<svg|data-open-family-profile|<h4>Negroni/);
  assert.match(ui.click('family-filter', 'All'), /<svg/);
  d.cocktails = [];
  assert.doesNotThrow(() => ui.show(null));
});
