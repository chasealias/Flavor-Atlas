const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

// Minimal DOM adapter: exercises production renderers and their event handlers.
// It checks markup and state transitions, not browser layout or CSS.
function app() {
  let html = '';
  const handlers = new Map();
  const node = (selector, value, dataKey) => ({
    dataset: dataKey ? {[dataKey]:value} : {},
    addEventListener(event, callback) { handlers.set(`${selector}:${value || ''}:${event}`, callback); },
    insertAdjacentHTML(_, markup) { html += markup; },
    querySelector(selector) { return node(selector); },
    focus() {}, setSelectionRange() {}, value:''
  });
  const mount = {get innerHTML(){ return html; }, set innerHTML(v){ html = v; handlers.clear(); }};
  const context = vm.createContext({window:{scrollTo(){}}, requestAnimationFrame:fn => fn(), document:{
    querySelector(selector) { return selector === '#app' ? mount : node(selector); },
    querySelectorAll(selector) {
      const match = selector.match(/^\[data-([^\]]+)\]$/);
      if (!match) return [];
      const key = match[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return [...html.matchAll(new RegExp(`data-${match[1]}(?:="([^"]*)")?(?=[\\s>])`, 'g'))].map(([,value]) => node(selector, value, key));
    }
  }});
  for (const [,file] of read('index.html').matchAll(/<script src="([^"]+)"/g)) vm.runInContext(read(file), context, {filename:file});
  return {
    context, data:context.window.FLAVOR_ATLAS_DATA,
    run(code) { const result = vm.runInContext(code, context); return result; },
    get html() { return html; },
    click(attr, id) { const handler = handlers.get(`[data-${attr}]:${id}:click`); assert.ok(handler, `${attr}:${id}`); handler(); }
  };
}

test('every recipe specification is linked; original catalog and recipe text are preserved', () => {
  const a = app(), d = a.data;
  const original = vm.createContext({window:{}});
  for (const [,file] of read('index.html').matchAll(/<script src="([^"]+)"/g)) {
    if (file === 'app.js') break;
    if (file !== 'ingredient-catalog.js') vm.runInContext(read(file), original);
  }
  const old = original.window.FLAVOR_ATLAS_DATA;
  assert.equal(d.ingredients.length, 247);
  assert.equal(new Set(d.ingredients.map(i => i.id)).size, d.ingredients.length);
  assert.equal(d.ingredientAudit.unresolved.length, 0);
  assert.equal(d.ingredientAudit.linkedRowCount, d.ingredientAudit.specRowCount);
  assert.equal(d.ingredientAudit.recipeCount, 150);
  for (const c of d.cocktails) {
    assert.equal(JSON.stringify(c.specs), JSON.stringify(old.cocktails.find(x => x.id === c.id).specs));
    for (const r of c.ingredientRefs) for (const id of r.ingredientIds) assert.ok(d.ingredients.find(i => i.id === id)?.usedIn.includes(c.id));
  }
  for (const i of old.ingredients) {
    const current = d.ingredients.find(x => x.id === i.id);
    for (const key of Object.keys(i)) assert.equal(JSON.stringify(current[key]), JSON.stringify(i[key]), `${i.id}.${key}`);
  }
});

test('aliases normalize spelling only and brands, grades, and preparations stay distinct', () => {
  const {data:d} = app();
  const ids = label => d.resolveRecipeIngredient(label).ingredientIds.join(',');
  assert.equal(ids(' Stray Dog Greek Gin '), ids('Stray Dog Gin'));
  assert.equal(ids("Peychaud’s Bitters"), ids("Peychaud's bitters"));
  assert.equal(ids('Egg White (optional)'), ids('Egg White'));
  for (const [a,b] of [['Mastiha','Mastiha Antica'],['Skinos Mastiha','Mastiha Antica'],['Metaxa 7 Star','Metaxa 12 Star'],['Cream','Heavy Cream'],['Umeshu bitters','Umeshu Tincture'],['Feta-Brine Ice','Feta brine + lactic acid ice'],['Applejack','Starlight Applejack'],['Triple Sec','Cointreau']]) assert.notEqual(ids(a), ids(b), `${a}/${b}`);
  assert.equal(d.resolveRecipeIngredient('unknown product').kind, 'unresolved');
});

test('alternatives, combined seasonings, and optional wording retain their meaning', () => {
  const a = app(), d = a.data;
  const alt = d.resolveRecipeIngredient('Metaxa 7 or 12 Star');
  assert.equal(alt.kind, 'alternative');
  assert.equal(alt.ingredientIds.length, 2);
  const combined = d.resolveRecipeIngredient('Tabasco, Celery Salt, Pepper');
  assert.equal(combined.kind, 'combined');
  assert.equal(combined.ingredientIds.length, 3);
  a.run("state.selectedCocktailId='FA-0006'; state.view='cocktail'; render();");
  assert.match(a.html, /Metaxa 7 or 12 Star/);
  assert.match(a.html, /recipe-ingredient-options/);
  a.run("state.selectedCocktailId='IBA-033'; render();");
  assert.match(a.html, /Egg White \(optional\)/);
});

test('reference entries have recipe provenance, without invented sensory scores', () => {
  const a = app();
  for (const i of a.data.ingredients.filter(i => i.recordStatus === 'reference')) {
    assert.equal(i.vector, null);
    assert.ok(i.usedIn.length);
    assert.ok(i.provenance);
    assert.equal(i.flavors.length, 0);
    for (const r of i.recipeRoles) assert.ok(a.data.cocktails.find(c => c.id === r.cocktailId).functions.some(([,role]) => role === r.role));
  }
  const id = a.data.resolveRecipeIngredient('Saline').ingredientIds[0];
  a.run(`state.selectedIngredientId=${JSON.stringify(id)}; state.view='ingredient'; render();`);
  assert.match(a.html, /Sensory profile not encoded yet/);
  assert.match(a.html, /Concentration is not recorded/);
});

test('recipe-to-ingredient-to-recipe navigation uses IDs after display-name changes', () => {
  const a = app(), d = a.data;
  const id = d.resolveRecipeIngredient('Saline').ingredientIds[0];
  d.ingredients.find(i => i.id === id).name = 'House saline <renamed>';
  a.run("state.selectedCocktailId='FA-0002'; state.view='cocktail'; render();");
  a.click('recipe-ingredient', id);
  assert.equal(a.run('state.view'), 'ingredient');
  assert.match(a.html, /House saline &lt;renamed&gt;/);
  assert.match(a.html, /Used in cocktails/);
  a.click('ingredient-cocktail', 'FA-0002');
  assert.equal(a.run('state.view'), 'cocktail');
  assert.equal(a.run('state.selectedCocktailId'), 'FA-0002');
  assert.match(a.html, /Greek Blonde/);
});

test('ingredient search includes aliases', () => {
  const a = app();
  a.run("state.ingredientQuery='Stray Dog Greek Gin'; state.view='ingredients'; render();");
  assert.match(a.html, /<h4>Stray Dog Gin<\/h4>/);
  assert.doesNotMatch(a.html, /No ingredient matches/);
});

test('unencoded references never become zero-vector similarity or substitution matches', () => {
  const a = app();
  const id = a.data.resolveRecipeIngredient('Saline').ingredientIds[0];
  assert.equal(a.run(`faVectorSimilarity(DATA.ingredients.find(i=>i.id==='${id}'), DATA.ingredients[0])`), null);
  assert.equal(a.run(`faSubstitutes(DATA.ingredients.find(i=>i.id==='${id}')).length`), 0);
  assert.ok(a.run('faSubstitutes(DATA.ingredients[0]).every(x => x.item.vector)'));
  a.run(`state.graphIngredientId='${id}'; state.relationshipMode='ingredients'; state.view='relationships'; render();`);
  assert.match(a.html, /Similarity and substitution rankings are unavailable/);
  assert.doesNotMatch(a.html, /class="sub-score"/);
});

test('all ingredient profiles and all cocktail builds render without errors', () => {
  const a = app();
  for (const i of a.data.ingredients) assert.doesNotThrow(() => a.run(`state.selectedIngredientId='${i.id}'; state.view='ingredient'; render();`), i.id);
  for (const c of a.data.cocktails) assert.doesNotThrow(() => a.run(`state.selectedCocktailId='${c.id}'; state.view='cocktail'; render();`), c.id);
});
