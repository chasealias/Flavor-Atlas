state.cocktailQuery = state.cocktailQuery || '';
state.cocktailStyleFilter = state.cocktailStyleFilter || 'All';
state.selectedCocktailId = state.selectedCocktailId || null;

navButton = function(view, label) {
  const active = state.view === view ||
    (view === 'ingredients' && state.view === 'ingredient') ||
    (view === 'cocktails' && state.view === 'cocktail');
  return `<button data-nav="${view}" class="${active ? 'active' : ''}">${label}</button>`;
};

function cocktailTags(items = []) {
  return `<div class="tags">${items.map(item => `<span class="tag">${esc(item)}</span>`).join('')}</div>`;
}

function cocktailCard(c) {
  return `
    <article class="card cocktail-card">
      <div class="meta">${esc(c.id)} · ${esc(c.style)}</div>
      <h4>${esc(c.name)}</h4>
      <p class="meta">${esc(c.subtitle)}</p>
      ${cocktailTags((c.tags || []).slice(0, 5))}
      <button class="chip card-open" data-cocktail-id="${esc(c.id)}" aria-label="Open ${esc(c.name)}">Open cocktail</button>
    </article>`;
}

renderCocktails = function() {
  const q = state.cocktailQuery.trim().toLowerCase();
  const styles = ['All', ...new Set(DATA.cocktails.map(c => c.style).filter(Boolean))];
  const filtered = DATA.cocktails.filter(c => {
    const styleOk = state.cocktailStyleFilter === 'All' || c.style === state.cocktailStyleFilter;
    const haystack = [
      c.id, c.name, c.style, c.subtitle, c.intent, c.method, c.glassware, c.garnish,
      ...(c.tags || []),
      ...c.specs.flat(),
      ...c.functions.flat(),
      ...c.progression.flatMap(p => [p.stage, p.signal || '', ...(p.notes || [])])
    ].join(' ').toLowerCase();
    return styleOk && (!q || haystack.includes(q));
  });

  layout(`
    <div class="section-head">
      <div><span class="eyebrow">Cocktail Explorer</span><h3>Recipes with their reasoning attached</h3></div>
      <p>${DATA.cocktails.length} encoded cocktails. Search by ingredient, style, technique, flavor, or function.</p>
    </div>
    <div class="searchbar"><input id="cocktail-search" value="${esc(state.cocktailQuery)}" placeholder="Try: gin, bergamot, stirred, savory, honey…" aria-label="Search cocktails"></div>
    <div class="filters">
      ${styles.map(style => `<button class="chip ${state.cocktailStyleFilter === style ? 'active' : ''}" data-cocktail-style="${esc(style)}">${esc(style)}</button>`).join('')}
    </div>
    <section class="grid cocktail-grid">
      ${filtered.length ? filtered.map(cocktailCard).join('') : '<div class="empty">No cocktail matches that combination yet.</div>'}
    </section>`);

  const input = document.querySelector('#cocktail-search');
  input.addEventListener('input', e => {
    state.cocktailQuery = e.target.value;
    renderCocktails();
    requestAnimationFrame(() => {
      const next = document.querySelector('#cocktail-search');
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
    });
  });

  document.querySelectorAll('[data-cocktail-style]').forEach(btn => btn.addEventListener('click', () => {
    state.cocktailStyleFilter = btn.dataset.cocktailStyle;
    renderCocktails();
  }));

  document.querySelectorAll('[data-cocktail-id]').forEach(btn => btn.addEventListener('click', () => {
    state.selectedCocktailId = btn.dataset.cocktailId;
    state.view = 'cocktail';
    render();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }));
};

function cocktailProgression(c) {
  return (c.progression || []).map(p => `
    <div class="progress-card">
      <div class="stage"><strong>${esc(p.stage)}</strong>${p.signal ? `<span class="tag role">${esc(p.signal)}</span>` : ''}</div>
      <ul>${(p.notes || []).map(n => `<li>${esc(n)}</li>`).join('')}</ul>
    </div>`).join('');
}

function renderCocktailProfile() {
  const c = DATA.cocktails.find(item => item.id === state.selectedCocktailId);
  if (!c) {
    state.view = 'cocktails';
    state.selectedCocktailId = null;
    return renderCocktails();
  }

  layout(`
    <div class="profile-actions"><button class="chip" data-back-cocktails>← Back to Cocktail Explorer</button></div>
    <div class="section-head cocktail-profile-heading">
      <div>
        <span class="eyebrow">${esc(c.id)} · ${esc(c.style)}</span>
        <h3>${esc(c.name)}</h3>
        <p class="meta">${esc(c.subtitle)}</p>
      </div>
      <p>${esc(c.intent)}</p>
    </div>

    <section class="two-col">
      <div class="panel">
        <h4>Build</h4>
        <div class="spec-list">${c.specs.map(([measure, ingredient]) => `<div class="spec-row"><strong>${esc(measure)}</strong><span>${esc(ingredient)}</span></div>`).join('')}</div>
        <div class="service-block">
          <p class="meta"><strong>Method:</strong> ${esc(c.method)}</p>
          <p class="meta"><strong>Glassware:</strong> ${esc(c.glassware)}</p>
          <p class="meta"><strong>Garnish:</strong> ${esc(c.garnish)}</p>
        </div>
        ${cocktailTags(c.tags || [])}
      </div>
      <div class="panel"><h4>Flavor Vector</h4>${metricBars(c.vector)}</div>
    </section>

    <div class="section-head"><div><span class="eyebrow">Functional architecture</span><h3>Why each element is there</h3></div></div>
    <section class="two-col">
      <div class="panel"><div class="function-list">${c.functions.map(([ingredient, role]) => `<div class="function-row"><strong>${esc(role)}</strong><span>${esc(ingredient)}</span></div>`).join('')}</div></div>
      <div class="panel"><h4>Flavor Progression</h4><div class="progression">${cocktailProgression(c)}</div></div>
    </section>`);

  document.querySelector('[data-back-cocktails]').addEventListener('click', () => {
    state.view = 'cocktails';
    state.selectedCocktailId = null;
    render();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}

const baseRender = render;
render = function() {
  if (state.view === 'cocktail') return renderCocktailProfile();
  return baseRender();
};

render();
