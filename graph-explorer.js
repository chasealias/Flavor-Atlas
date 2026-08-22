state.graphIngredientId = state.graphIngredientId || DATA.ingredients[0]?.id || null;

const baseLayoutForGraph = layout;
layout = function(content) {
  baseLayoutForGraph(content);
  const footer = document.querySelector('.footer');
  if (footer) footer.textContent = 'Flavor Atlas V0.4 · Recipes record outcomes. Flavor Atlas records reasoning.';
};

function faNorm(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function faJaccard(a = [], b = []) {
  const A = new Set(a.map(faNorm).filter(Boolean));
  const B = new Set(b.map(faNorm).filter(Boolean));
  if (!A.size && !B.size) return 0;
  let intersection = 0;
  A.forEach(v => { if (B.has(v)) intersection += 1; });
  return intersection / (A.size + B.size - intersection || 1);
}

function faVectorSimilarity(a, b) {
  const keys = ['Sweetness', 'Bitterness', 'Acidity', 'Herbal', 'Earthiness', 'Umami', 'Body'];
  const distance = Math.sqrt(keys.reduce((sum, key) => {
    const d = Number(a?.vector?.[key] || 0) - Number(b?.vector?.[key] || 0);
    return sum + d * d;
  }, 0));
  const maxDistance = Math.sqrt(keys.length * 100);
  return Math.max(0, 1 - distance / maxDistance);
}

function faPairingSignal(a, b) {
  const stop = new Set(['fresh','juice','liqueur','syrup','spirit','wine','acid','bitter','bitters','greek','other','style']);
  const tokens = [b.name, b.category, ...(b.flavors || [])]
    .flatMap(v => faNorm(v).split(' '))
    .filter(v => v.length > 3 && !stop.has(v));
  const authored = (a.pairings || []).map(faNorm).join(' ');
  return tokens.some(token => authored.includes(token)) ? 1 : 0;
}

function faAffinity(a, b) {
  const vector = faVectorSimilarity(a, b);
  const roles = faJaccard(a.roles, b.roles);
  const flavors = faJaccard(a.flavors, b.flavors);
  const category = faNorm(a.category) === faNorm(b.category) ? 1 : 0;
  const pairing = Math.max(faPairingSignal(a, b), faPairingSignal(b, a));
  return Math.round((vector * .35 + roles * .25 + flavors * .15 + category * .10 + pairing * .15) * 100);
}

function faSubstitutionScore(a, b) {
  const vector = faVectorSimilarity(a, b);
  const roles = faJaccard(a.roles, b.roles);
  const flavors = faJaccard(a.flavors, b.flavors);
  const category = faNorm(a.category) === faNorm(b.category) ? 1 : 0;
  const pairing = Math.max(faPairingSignal(a, b), faPairingSignal(b, a));
  return Math.round((roles * .35 + vector * .25 + category * .20 + flavors * .15 + pairing * .05) * 100);
}

function faSubReason(a, b) {
  const reasons = [];
  const sharedRoles = (a.roles || []).filter(role => (b.roles || []).includes(role));
  const sharedFlavors = (a.flavors || []).filter(flavor => (b.flavors || []).includes(flavor));
  if (faNorm(a.category) === faNorm(b.category)) reasons.push(`same category: ${a.category}`);
  if (sharedRoles.length) reasons.push(`shared role${sharedRoles.length > 1 ? 's' : ''}: ${sharedRoles.slice(0, 2).join(', ')}`);
  if (sharedFlavors.length) reasons.push(`shared flavor${sharedFlavors.length > 1 ? 's' : ''}: ${sharedFlavors.slice(0, 2).join(', ')}`);
  const vector = Math.round(faVectorSimilarity(a, b) * 100);
  if (vector >= 70) reasons.push(`${vector}% sensory-vector similarity`);
  if (!reasons.length) reasons.push('exploratory match based on overall sensory distance');
  return reasons.join(' · ');
}

function faGraphNeighbors(selected, count = 8) {
  return DATA.ingredients
    .filter(item => item.id !== selected.id)
    .map(item => ({ item, score: faAffinity(selected, item), pairing: Math.max(faPairingSignal(selected, item), faPairingSignal(item, selected)) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

function faSubstitutes(selected, count = 5) {
  return DATA.ingredients
    .filter(item => item.id !== selected.id)
    .map(item => ({ item, score: faSubstitutionScore(selected, item) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

function faGraphSvg(selected, neighbors) {
  const width = 760;
  const height = 480;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 185;
  const nodes = neighbors.map((entry, index) => {
    const angle = (-Math.PI / 2) + (index * Math.PI * 2 / neighbors.length);
    return {
      ...entry,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius
    };
  });

  const lines = nodes.map(node => `
    <line x1="${cx}" y1="${cy}" x2="${node.x.toFixed(1)}" y2="${node.y.toFixed(1)}" class="graph-edge ${node.pairing ? 'pairing-edge' : ''}" />
    <text x="${((cx + node.x) / 2).toFixed(1)}" y="${((cy + node.y) / 2).toFixed(1)}" class="graph-score">${node.pairing ? 'pairing' : `${node.score}%`}</text>`).join('');

  const outer = nodes.map(node => `
    <g class="graph-node graph-node-related" data-graph-node="${esc(node.item.id)}" tabindex="0" role="button" aria-label="Explore ${esc(node.item.name)}">
      <circle cx="${node.x.toFixed(1)}" cy="${node.y.toFixed(1)}" r="38" />
      <text x="${node.x.toFixed(1)}" y="${(node.y - 3).toFixed(1)}">${esc(node.item.name.split(' ').slice(0,2).join(' '))}</text>
      <text x="${node.x.toFixed(1)}" y="${(node.y + 14).toFixed(1)}" class="node-meta">${node.score}%</text>
    </g>`).join('');

  return `<svg class="flavor-graph" viewBox="0 0 ${width} ${height}" aria-label="Flavor relationship graph for ${esc(selected.name)}">
    ${lines}
    ${outer}
    <g class="graph-node graph-node-center">
      <circle cx="${cx}" cy="${cy}" r="58" />
      <text x="${cx}" y="${cy - 4}">${esc(selected.name.split(' ').slice(0,2).join(' '))}</text>
      <text x="${cx}" y="${cy + 16}" class="node-meta">${esc(selected.category)}</text>
    </g>
  </svg>`;
}

function faRecordedNotes(selected) {
  const terms = [selected.name, selected.category, ...(selected.flavors || [])].map(faNorm).filter(Boolean);
  const relevant = (DATA.relationships || []).filter(r => {
    const text = faNorm(`${r.from} ${r.to} ${r.why}`);
    return terms.some(term => term.length > 3 && text.includes(term.split(' ')[0]));
  }).slice(0, 4);
  if (!relevant.length) return '';
  return `<div class="recorded-relations">
    <span class="eyebrow">Recorded reasoning</span>
    ${relevant.map(r => `<div class="reason-note"><strong>${esc(r.from)} ${esc(r.verb)} ${esc(r.to)}</strong><span>${esc(r.why)}</span></div>`).join('')}
  </div>`;
}

renderRelationships = function() {
  const selected = DATA.ingredients.find(item => item.id === state.graphIngredientId) || DATA.ingredients[0];
  state.graphIngredientId = selected.id;
  const neighbors = faGraphNeighbors(selected);
  const substitutes = faSubstitutes(selected);

  layout(`
    <div class="section-head">
      <div><span class="eyebrow">V0.4 · Flavor Intelligence</span><h3>Relationships you can actually use</h3></div>
      <p>The graph shows close sensory and functional neighbors. The substitution engine ranks replacements by role, category, flavor overlap, and sensory distance.</p>
    </div>

    <div class="graph-toolbar panel">
      <label for="graph-ingredient">Explore ingredient</label>
      <select id="graph-ingredient" aria-label="Choose ingredient">
        ${DATA.ingredients.map(item => `<option value="${esc(item.id)}" ${item.id === selected.id ? 'selected' : ''}>${esc(item.name)}</option>`).join('')}
      </select>
      <div class="graph-key"><span><i class="key-dot"></i> sensory/function affinity</span><span><i class="key-line"></i> authored pairing signal</span></div>
    </div>

    <section class="graph-layout">
      <article class="panel graph-panel">
        <div class="graph-panel-head"><div><span class="eyebrow">Flavor Graph</span><h4>${esc(selected.name)}</h4></div><span class="tag role">${esc(selected.category)}</span></div>
        ${faGraphSvg(selected, neighbors)}
        <p class="meta graph-help">Tap any outer node to make it the center.</p>
        ${faRecordedNotes(selected)}
      </article>

      <article class="panel substitution-panel">
        <span class="eyebrow">Substitution Engine</span>
        <h4>Replace ${esc(selected.name)}</h4>
        <p class="meta">These are structural candidates, not claims that two ingredients taste identical. Humans invented nuance, then immediately tried to automate it.</p>
        <div class="sub-list">
          ${substitutes.map(({item, score}, index) => `
            <button class="sub-card" data-graph-node="${esc(item.id)}">
              <span class="sub-rank">${index + 1}</span>
              <span class="sub-copy"><strong>${esc(item.name)}</strong><small>${esc(faSubReason(selected, item))}</small></span>
              <span class="sub-score">${score}%</span>
            </button>`).join('')}
        </div>
        ${(selected.substitutes || []).length ? `<div class="authored-subs"><h5>Recorded substitution notes</h5>${detailList(selected.substitutes)}</div>` : ''}
        ${(selected.cautions || []).length ? `<div class="authored-subs caution-notes"><h5>Watch out</h5>${detailList(selected.cautions)}</div>` : ''}
      </article>
    </section>`);

  document.querySelector('#graph-ingredient').addEventListener('change', e => {
    state.graphIngredientId = e.target.value;
    renderRelationships();
  });

  document.querySelectorAll('[data-graph-node]').forEach(node => {
    const activate = () => {
      state.graphIngredientId = node.dataset.graphNode;
      renderRelationships();
      window.scrollTo({top: 0, behavior: 'smooth'});
    };
    node.addEventListener('click', activate);
    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });
};

render();
