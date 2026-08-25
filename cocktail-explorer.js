state.cocktailQuery = state.cocktailQuery || '';
state.cocktailStyleFilter = state.cocktailStyleFilter || 'All';
state.cocktailCollectionFilter = state.cocktailCollectionFilter || 'All';
state.selectedCocktailId = state.selectedCocktailId || null;

navButton = function(view, label) {
  const active = state.view === view ||
    (view === 'ingredients' && state.view === 'ingredient') ||
    (view === 'cocktails' && state.view === 'cocktail');
  return `<button data-nav="${view}" class="${active ? 'active' : ''}">${label}</button>`;
};

const baseLayoutForCocktails = layout;
layout = function(content) {
  baseLayoutForCocktails(content);
  const footer = document.querySelector('.footer');
  if (footer) footer.textContent = 'Flavor Atlas V0.5 · Recipes record outcomes. Flavor Atlas records reasoning.';
};

function cocktailTags(items = []) {
  return `<div class="tags">${items.map(item => `<span class="tag">${esc(item)}</span>`).join('')}</div>`;
}

function cocktailStatus(c) {
  return c.recordStatus === 'encoded' ? 'Encoded' : 'Reference';
}

function cocktailCard(c) {
  const aliases = c.aliases?.length ? ` · aka ${c.aliases.map(esc).join(', ')}` : '';
  return `
    <article class="card cocktail-card">
      <div class="meta">${esc(c.id)} · ${esc(c.style || 'Unclassified')}</div>
      <h4>${esc(c.name)}</h4>
      <p class="meta">${esc(c.subtitle || '')}${aliases}</p>
      ${cocktailTags([cocktailStatus(c), ...(c.tags || []).slice(0, 4)])}
      <button class="chip card-open" data-cocktail-id="${esc(c.id)}" aria-label="Open ${esc(c.name)}">Open cocktail</button>
    </article>`;
}

renderCocktails = function() {
  const q = state.cocktailQuery.trim().toLowerCase();
  const styles = ['All', ...new Set(DATA.cocktails.map(c => c.style).filter(Boolean))];
  const collections = ['All', ...new Set(DATA.cocktails.map(c => c.collection).filter(Boolean))];

  const filtered = DATA.cocktails.filter(c => {
    const styleOk = state.cocktailStyleFilter === 'All' || c.style === state.cocktailStyleFilter;
    const collectionOk = state.cocktailCollectionFilter === 'All' || c.collection === state.cocktailCollectionFilter;
    const haystack = [
      c.id, c.name, c.style, c.subtitle, c.intent, c.method, c.glassware, c.garnish,
      c.collection, c.source, c.canonCategory, c.recordStatus,
      ...(c.aliases || []),
      ...(c.tags || []),
      ...(c.specs || []).flat(),
      ...(c.functions || []).flat(),
      ...(c.progression || []).flatMap(p => [p.stage, p.signal || '', ...(p.notes || [])])
    ].filter(Boolean).join(' ').toLowerCase();
    return styleOk && collectionOk && (!q || haystack.includes(q));
  });

  const encodedCount = DATA.cocktails.filter(c => c.recordStatus === 'encoded').length;
  const referenceCount = DATA.cocktails.length - encodedCount;

  layout(`
    <div class="section-head">
      <div><span class="eyebrow">Cocktail Canon</span><h3>Recipes, references, and their reasoning</h3></div>
      <p>${DATA.cocktails.length} cocktails indexed · ${encodedCount} fully encoded · ${referenceCount} canonical or house references.</p>
    </div>
    <div class="searchbar"><input id="cocktail-search" value="${esc(state.cocktailQuery)}" placeholder="Try: Negroni, Metaxa, IBA, lychee, stirred, sour…" aria-label="Search cocktails"></div>
    <div class="filters">
      ${collections.map(collection => `<button class="chip ${state.cocktailCollectionFilter === collection ? 'active' : ''}" data-cocktail-collection="${esc(collection)}">${esc(collection)}</button>`).join('')}
    </div>
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

  document.querySelectorAll('[data-cocktail-collection]').forEach(btn => btn.addEventListener('click', () => {
    state.cocktailCollectionFilter = btn.dataset.cocktailCollection;
    renderCocktails();
  }));

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

function referencePanel(c) {
  const aliases = c.aliases?.length ? `<p class="meta"><strong>Also known as:</strong> ${c.aliases.map(esc).join(', ')}</p>` : '';
  return `
    <section class="two-col">
      <div class="panel">
        <h4>Reference Record</h4>
        <p>${esc(c.intent || 'This cocktail is indexed but has not yet received a full Flavor Atlas analysis.')}</p>
        ${aliases}
        <p class="meta"><strong>Collection:</strong> ${esc(c.collection || 'Cocktail Canon')}</p>
        ${c.canonCategory ? `<p class="meta"><strong>Canon category:</strong> ${esc(c.canonCategory)}</p>` : ''}
        ${c.source ? `<p class="meta"><strong>Source:</strong> ${esc(c.source)}</p>` : ''}
      </div>
      <div class="panel">
        <h4>Next Encoding Pass</h4>
        <p class="meta">Add verified spec, technique, glassware, garnish, flavor vector, functional roles, and progression. Reference records remain searchable in the meantime.</p>
      </div>
    </section>`;
}

function renderCocktailProfile() {
  const c = DATA.cocktails.find(item => item.id === state.selectedCocktailId);
  if (!c) {
    state.view = 'cocktails';
    state.selectedCocktailId = null;
    return renderCocktails();
  }

  const isEncoded = c.recordStatus === 'encoded' || ((c.specs || []).length && c.vector);

  layout(`
    <div class="profile-actions"><button class="chip" data-back-cocktails>← Back to Cocktail Explorer</button></div>
    <div class="section-head cocktail-profile-heading">
      <div>
        <span class="eyebrow">${esc(c.id)} · ${esc(c.style || 'Unclassified')} · ${esc(cocktailStatus(c))}</span>
        <h3>${esc(c.name)}</h3>
        <p class="meta">${esc(c.subtitle || '')}</p>
      </div>
      <p>${esc(c.intent || '')}</p>
    </div>

    ${isEncoded ? `
    <section class="two-col">
      <div class="panel">
        <h4>Build</h4>
        <div class="spec-list">${(c.specs || []).map(([measure, ingredient]) => `<div class="spec-row"><strong>${esc(measure)}</strong><span>${esc(ingredient)}</span></div>`).join('')}</div>
        <div class="service-block">
          <p class="meta"><strong>Method:</strong> ${esc(c.method || 'Not recorded')}</p>
          <p class="meta"><strong>Glassware:</strong> ${esc(c.glassware || 'Not recorded')}</p>
          <p class="meta"><strong>Garnish:</strong> ${esc(c.garnish || 'Not recorded')}</p>
        </div>
        ${cocktailTags([...(c.aliases || []).map(a => `aka ${a}`), ...(c.tags || [])])}
      </div>
      <div class="panel"><h4>Flavor Vector</h4>${c.vector ? metricBars(c.vector) : '<p class="meta">Flavor vector not encoded yet.</p>'}</div>
    </section>

    <div class="section-head"><div><span class="eyebrow">Functional architecture</span><h3>Why each element is there</h3></div></div>
    <section class="two-col">
      <div class="panel">${(c.functions || []).length ? `<div class="function-list">${c.functions.map(([ingredient, role]) => `<div class="function-row"><strong>${esc(role)}</strong><span>${esc(ingredient)}</span></div>`).join('')}</div>` : '<p class="meta">Functional roles not encoded yet.</p>'}</div>
      <div class="panel"><h4>Flavor Progression</h4>${(c.progression || []).length ? `<div class="progression">${cocktailProgression(c)}</div>` : '<p class="meta">Flavor progression not encoded yet.</p>'}</div>
    </section>` : referencePanel(c)}`);

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
