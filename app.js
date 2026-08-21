const DATA = window.FLAVOR_ATLAS_DATA;

const state = {
  view: 'home',
  ingredientQuery: '',
  roleFilter: 'All',
  selectedIngredientId: null
};

const app = document.querySelector('#app');

function esc(value = '') {
  return String(value).replace(/[&<>\"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[ch]));
}

function navButton(view, label) {
  const active = state.view === view || (view === 'ingredients' && state.view === 'ingredient');
  return `<button data-nav="${view}" class="${active ? 'active' : ''}">${label}</button>`;
}

function layout(content) {
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-inner">
          <div class="brand">
            <div class="brand-mark">FA</div>
            <div><h1>Flavor Atlas</h1><small>Flavor-design knowledge system</small></div>
          </div>
          <nav class="nav" aria-label="Primary">
            ${navButton('home','Atlas')}
            ${navButton('ingredients','Ingredients')}
            ${navButton('cocktails','Cocktails')}
            ${navButton('relationships','Relationships')}
          </nav>
        </div>
      </header>
      ${content}
      <footer class="footer">Flavor Atlas V0.2 · Recipes record outcomes. Flavor Atlas records reasoning.</footer>
    </div>`;

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.view = btn.dataset.nav;
      state.selectedIngredientId = null;
      render();
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });
}

function hero() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">A structured language for flavor</span>
        <h2>Map the reasons a drink works.</h2>
        <p>Explore ingredients by function and sensory character, trace relationships, and model how a cocktail changes from first sip to final sip.</p>
      </div>
      <div class="hero-card">
        <div class="quote">
          <strong>“Recipes record outcomes. Flavor Atlas records reasoning.”</strong>
          <span>The craft lives in the decisions behind the recipe.</span>
        </div>
      </div>
    </section>`;
}

function metricBars(vector) {
  return Object.entries(vector).map(([name, value]) => `
    <div class="metric">
      <div class="metric-head"><span>${esc(name)}</span><strong>${value}/10</strong></div>
      <div class="metric-bar"><div class="metric-fill" style="width:${Math.max(0, Math.min(10, value))*10}%"></div></div>
    </div>`).join('');
}

function tags(items = [], className = '') {
  return `<div class="tags">${items.map(item => `<span class="tag ${className}">${esc(item)}</span>`).join('')}</div>`;
}

function detailList(items = [], emptyText = 'No entries yet.') {
  if (!items.length) return `<p class="meta">${esc(emptyText)}</p>`;
  return `<ul class="detail-list">${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function ingredientCard(ing) {
  return `
    <article class="card ingredient-card">
      <div class="meta">${esc(ing.id)} · ${esc(ing.category)}</div>
      <h4>${esc(ing.name)}</h4>
      <div class="meta">${esc(ing.region)}</div>
      ${tags(ing.roles, 'role')}
      ${tags(ing.flavors.slice(0,4))}
      <p class="meta">${esc(ing.notes)}</p>
      <button class="chip card-open" data-ingredient-id="${esc(ing.id)}" aria-label="Open ${esc(ing.name)} profile">Open profile</button>
    </article>`;
}

function renderHome() {
  const philosopher = DATA.cocktails[0];
  layout(`
    ${hero()}
    <section class="two-col">
      <div class="panel">
        <div class="section-head"><div><span class="eyebrow">Reference cocktail</span><h3>${esc(philosopher.name)}</h3></div></div>
        <p>${esc(philosopher.intent)}</p>
        <div class="tags">${philosopher.progression[0].notes.map(n => `<span class="tag">${esc(n)}</span>`).join('')}</div>
        <p><button class="chip active" data-open-philosopher>Open ${esc(philosopher.id)}</button></p>
      </div>
      <div class="panel">
        <h4>Reference Flavor Vector</h4>
        ${metricBars(philosopher.vector)}
      </div>
    </section>
    <div class="section-head"><div><span class="eyebrow">Explore the system</span><h3>Three ways in</h3></div></div>
    <section class="grid">
      <article class="card"><div class="meta">01</div><h4>Ingredient Explorer</h4><p class="meta">Search by sensory character, functional role, category, region and culinary relationship.</p><button class="chip" data-nav="ingredients">Browse ingredients</button></article>
      <article class="card"><div class="meta">02</div><h4>Cocktail Architecture</h4><p class="meta">See specs, intent, flavor vectors, ingredient functions and temporal progression in one record.</p><button class="chip" data-open-philosopher>Open FA-0001</button></article>
      <article class="card"><div class="meta">03</div><h4>Flavor Graph</h4><p class="meta">Follow semantic connections such as bridges, contrasts, amplification and time-dependent change.</p><button class="chip" data-nav="relationships">View relationships</button></article>
    </section>`);

  document.querySelectorAll('[data-open-philosopher]').forEach(btn => btn.addEventListener('click', () => { state.view='cocktails'; render(); }));
}

function renderIngredients() {
  const q = state.ingredientQuery.trim().toLowerCase();
  const filtered = DATA.ingredients.filter(ing => {
    const roleOk = state.roleFilter === 'All' || ing.roles.includes(state.roleFilter);
    const haystack = [
      ing.name,
      ing.category,
      ing.region,
      ing.notes,
      ...ing.roles,
      ...ing.flavors,
      ...ing.aroma,
      ...ing.texture,
      ...(ing.pairings || []),
      ...(ing.substitutes || []),
      ...(ing.cautions || [])
    ].join(' ').toLowerCase();
    return roleOk && (!q || haystack.includes(q));
  });

  layout(`
    <div class="section-head"><div><span class="eyebrow">Ingredient Explorer</span><h3>Search by flavor and function</h3></div><p>Search names, roles, sensory notes, pairings, substitutes and cautions.</p></div>
    <div class="searchbar"><input id="ingredient-search" value="${esc(state.ingredientQuery)}" placeholder="Try: earthy, bridge, fortified wine, honey…" aria-label="Search ingredients"></div>
    <div class="filters">
      ${['All','Foundation','Structure','Bridge','Modifier','Sweetener','Aromatic','Dynamic Modifier'].map(role => `<button class="chip ${state.roleFilter===role?'active':''}" data-role="${esc(role)}">${esc(role)}</button>`).join('')}
    </div>
    <section class="grid">
      ${filtered.length ? filtered.map(ingredientCard).join('') : '<div class="empty">No ingredient matches that combination yet.</div>'}
    </section>`);

  const input = document.querySelector('#ingredient-search');
  input.addEventListener('input', (e) => {
    state.ingredientQuery = e.target.value;
    renderIngredients();
    requestAnimationFrame(() => {
      const next = document.querySelector('#ingredient-search');
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
    });
  });

  document.querySelectorAll('[data-role]').forEach(btn => btn.addEventListener('click', () => {
    state.roleFilter = btn.dataset.role;
    renderIngredients();
  }));

  document.querySelectorAll('[data-ingredient-id]').forEach(btn => btn.addEventListener('click', () => {
    state.selectedIngredientId = btn.dataset.ingredientId;
    state.view = 'ingredient';
    render();
    window.scrollTo({top:0, behavior:'smooth'});
  }));
}

function renderIngredientProfile() {
  const ing = DATA.ingredients.find(item => item.id === state.selectedIngredientId);
  if (!ing) {
    state.view = 'ingredients';
    state.selectedIngredientId = null;
    return renderIngredients();
  }

  layout(`
    <div class="profile-actions">
      <button class="chip" data-back-ingredients>← Back to Ingredient Explorer</button>
    </div>

    <div class="section-head profile-heading">
      <div>
        <span class="eyebrow">${esc(ing.id)} · ${esc(ing.category)}</span>
        <h3>${esc(ing.name)}</h3>
        <p class="meta">${esc(ing.region)}</p>
      </div>
      <p>${esc(ing.notes)}</p>
    </div>

    <section class="two-col ingredient-profile-top">
      <div class="panel">
        <h4>Flavor Vector</h4>
        ${metricBars(ing.vector)}
      </div>
      <div class="panel">
        <h4>Functional Roles</h4>
        ${tags(ing.roles, 'role')}
        <div class="profile-section">
          <h5>Flavor</h5>
          ${tags(ing.flavors)}
        </div>
        <div class="profile-section">
          <h5>Aroma</h5>
          ${tags(ing.aroma)}
        </div>
        <div class="profile-section">
          <h5>Texture</h5>
          ${tags(ing.texture)}
        </div>
      </div>
    </section>

    <section class="profile-grid">
      <article class="panel profile-panel">
        <span class="eyebrow">Connections</span>
        <h4>Best Pairings</h4>
        ${detailList(ing.pairings || [], 'No pairings recorded yet.')}
      </article>
      <article class="panel profile-panel">
        <span class="eyebrow">Function first</span>
        <h4>Substitutions</h4>
        ${detailList(ing.substitutes || [], 'No substitutes recorded yet.')}
      </article>
      <article class="panel profile-panel caution-panel">
        <span class="eyebrow">Failure points</span>
        <h4>Watch Out</h4>
        ${detailList(ing.cautions || [], 'No cautions recorded yet.')}
      </article>
    </section>`);

  document.querySelector('[data-back-ingredients]').addEventListener('click', () => {
    state.view = 'ingredients';
    state.selectedIngredientId = null;
    render();
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

function renderCocktails() {
  const c = DATA.cocktails[0];
  layout(`
    <div class="section-head"><div><span class="eyebrow">${esc(c.id)}</span><h3>${esc(c.name)}</h3></div><p>${esc(c.subtitle)}</p></div>
    <section class="two-col">
      <div class="panel">
        <h4>Intent</h4>
        <p>${esc(c.intent)}</p>
        <h4>Build</h4>
        <div class="spec-list">${c.specs.map(([measure, ingredient]) => `<div class="spec-row"><strong>${esc(measure)}</strong><span>${esc(ingredient)}</span></div>`).join('')}</div>
        <p class="meta"><strong>Method:</strong> ${esc(c.method)}</p>
        <p class="meta"><strong>Glassware:</strong> ${esc(c.glassware)} · <strong>Garnish:</strong> ${esc(c.garnish)}</p>
      </div>
      <div class="panel"><h4>Flavor Profile</h4>${metricBars(c.vector)}</div>
    </section>
    <div class="section-head"><div><span class="eyebrow">Functional architecture</span><h3>Why each ingredient is there</h3></div></div>
    <section class="two-col">
      <div class="panel"><div class="function-list">${c.functions.map(([ingredient,role]) => `<div class="function-row"><strong>${esc(role)}</strong><span>${esc(ingredient)}</span></div>`).join('')}</div></div>
      <div class="panel"><h4>Temporal Flavor Design</h4><div class="progression">${c.progression.map(p => `<div class="progress-card"><div class="stage"><strong>${esc(p.stage)}</strong><span class="tag role">Salinity ${p.salinity}/10</span></div><ul>${p.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>`).join('')}</div></div>
    </section>`);
}

function renderRelationships() {
  layout(`
    <div class="section-head"><div><span class="eyebrow">Flavor Graph</span><h3>Relationships, not isolated records</h3></div><p>These edges explain what one element does to another. Eventually this becomes the reasoning layer for substitutions and discovery.</p></div>
    <section class="relationships">
      ${DATA.relationships.map(r => `<article class="relationship"><div class="node">${esc(r.from)}</div><div class="verb">${esc(r.verb)}</div><div class="node">${esc(r.to)}</div><small>${esc(r.why)}</small></article>`).join('')}
    </section>`);
}

function render() {
  if (state.view === 'ingredients') return renderIngredients();
  if (state.view === 'ingredient') return renderIngredientProfile();
  if (state.view === 'cocktails') return renderCocktails();
  if (state.view === 'relationships') return renderRelationships();
  return renderHome();
}

render();
