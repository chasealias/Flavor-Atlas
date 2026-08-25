// Flavor Atlas V0.6 — Cocktail Family Graph UI.
(() => {
  const DATA = window.FLAVOR_ATLAS_DATA;
  if (!DATA?.cocktails || !DATA?.cocktailFamilyTaxonomy) return;

  state.relationshipMode = state.relationshipMode || 'cocktails';
  state.familyCocktailId = state.familyCocktailId || DATA.cocktails.find(c => c.name === 'Negroni')?.id || DATA.cocktails[0]?.id || null;
  state.familyFilter = state.familyFilter || 'All';

  const baseLayoutForFamilyGraph = layout;
  layout = function(content) {
    baseLayoutForFamilyGraph(content);
    const footer = document.querySelector('.footer');
    if (footer) footer.textContent = 'Flavor Atlas V0.6 · Cocktail families explain structure. Lineage explains variation.';
  };

  const ingredientRelationshipView = renderRelationships;

  function familyRecord(id) {
    return DATA.cocktailFamilyTaxonomy.find(f => f.id === id) || DATA.cocktailFamilyTaxonomy.find(f => f.id === 'other');
  }

  function familyCocktail() {
    return DATA.cocktails.find(c => c.id === state.familyCocktailId) || DATA.cocktails[0];
  }

  function vectorSimilarity(a, b) {
    if (typeof faVectorSimilarity === 'function') return faVectorSimilarity(a, b);
    const keys = ['Sweetness','Bitterness','Acidity','Herbal','Earthiness','Umami','Body'];
    const distance = Math.sqrt(keys.reduce((sum, key) => {
      const d = Number(a?.vector?.[key] || 0) - Number(b?.vector?.[key] || 0);
      return sum + d * d;
    }, 0));
    return Math.max(0, 1 - distance / Math.sqrt(keys.length * 100));
  }

  function explicitConnections(c) {
    return (DATA.cocktailLineage || [])
      .filter(e => e.from === c.name || e.to === c.name)
      .map(e => ({
        edge:e,
        item:DATA.cocktails.find(x => x.name === (e.from === c.name ? e.to : e.from)),
        direction:e.from === c.name ? 'out' : 'in'
      }))
      .filter(x => x.item);
  }

  function sameFamilyRelatives(c, limit = 6) {
    return DATA.cocktails
      .filter(x => x.id !== c.id && x.structuralFamilyId === c.structuralFamilyId)
      .map(item => ({ item, score:Math.round(vectorSimilarity(c, item) * 100) }))
      .sort((a,b) => b.score - a.score)
      .slice(0, limit);
  }

  function familyGraphSvg(c) {
    const explicit = explicitConnections(c);
    const used = new Set(explicit.map(x => x.item.id));
    const relatives = sameFamilyRelatives(c, 8)
      .filter(x => !used.has(x.item.id))
      .slice(0, Math.max(0, 8 - explicit.length))
      .map(x => ({ item:x.item, score:x.score, direction:'peer', edge:{relation:'same family', why:`${x.score}% sensory similarity within ${c.structuralFamily}.`, confidence:'analytical'} }));
    const nodes = [...explicit, ...relatives].slice(0, 8);
    const width = 820, height = 500, cx = 410, cy = 250, radius = 190;
    const positioned = nodes.map((node, i) => {
      const angle = -Math.PI/2 + i * Math.PI * 2 / Math.max(nodes.length, 1);
      return {...node, x:cx + Math.cos(angle)*radius, y:cy + Math.sin(angle)*radius};
    });

    const edges = positioned.map(n => {
      const relation = n.edge?.relation || 'related';
      const klass = n.direction === 'peer' ? 'family-peer-edge' : (n.direction === 'in' ? 'family-parent-edge' : 'family-child-edge');
      return `<line x1="${cx}" y1="${cy}" x2="${n.x.toFixed(1)}" y2="${n.y.toFixed(1)}" class="family-edge ${klass}" />
        <text x="${((cx+n.x)/2).toFixed(1)}" y="${((cy+n.y)/2).toFixed(1)}" class="family-edge-label">${esc(relation)}</text>`;
    }).join('');

    const outer = positioned.map(n => `
      <g class="family-node family-node-related" data-family-cocktail="${esc(n.item.id)}" tabindex="0" role="button" aria-label="Explore ${esc(n.item.name)}">
        <circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="43" />
        <text x="${n.x.toFixed(1)}" y="${(n.y-5).toFixed(1)}">${esc(n.item.name.split(' ').slice(0,2).join(' '))}</text>
        <text x="${n.x.toFixed(1)}" y="${(n.y+13).toFixed(1)}" class="node-meta">${esc(n.direction === 'in' ? 'ancestor/parent' : n.direction === 'out' ? 'variation/child' : n.item.structuralFamily)}</text>
      </g>`).join('');

    return `<svg class="cocktail-family-graph" viewBox="0 0 ${width} ${height}" aria-label="Cocktail family graph for ${esc(c.name)}">
      ${edges}${outer}
      <g class="family-node family-node-center">
        <circle cx="${cx}" cy="${cy}" r="62" />
        <text x="${cx}" y="${cy-6}">${esc(c.name.split(' ').slice(0,2).join(' '))}</text>
        <text x="${cx}" y="${cy+15}" class="node-meta">${esc(c.structuralFamily)}</text>
      </g>
    </svg>`;
  }

  function relationshipTabs() {
    return `<div class="relationship-tabs panel" role="tablist" aria-label="Relationship graph mode">
      <button class="chip ${state.relationshipMode === 'cocktails' ? 'active' : ''}" data-relationship-mode="cocktails">Cocktail Families</button>
      <button class="chip ${state.relationshipMode === 'ingredients' ? 'active' : ''}" data-relationship-mode="ingredients">Ingredient Graph</button>
    </div>`;
  }

  function bindRelationshipTabs() {
    document.querySelectorAll('[data-relationship-mode]').forEach(btn => btn.addEventListener('click', () => {
      state.relationshipMode = btn.dataset.relationshipMode;
      renderRelationships();
      window.scrollTo({top:0, behavior:'smooth'});
    }));
  }

  function renderIngredientMode() {
    ingredientRelationshipView();
    const shell = document.querySelector('.app-shell');
    const first = shell?.querySelector('.section-head');
    if (first) first.insertAdjacentHTML('beforebegin', relationshipTabs());
    bindRelationshipTabs();
  }

  function familyCards() {
    return DATA.cocktailFamilyTaxonomy.map(f => {
      const count = DATA.cocktailFamilySummary?.counts?.[f.id] || 0;
      return `<button class="family-card ${state.familyFilter === f.id ? 'active' : ''}" data-family-filter="${esc(f.id)}">
        <span class="family-count">${count}</span>
        <strong>${esc(f.name)}</strong>
        <small>${esc(f.formula)}</small>
      </button>`;
    }).join('');
  }

  function renderCocktailMode() {
    const c = familyCocktail();
    const fam = familyRecord(c.structuralFamilyId);
    const connections = explicitConnections(c);
    const filteredCocktails = state.familyFilter === 'All'
      ? DATA.cocktails
      : DATA.cocktails.filter(x => x.structuralFamilyId === state.familyFilter);

    if (!filteredCocktails.some(x => x.id === c.id) && filteredCocktails.length) {
      state.familyCocktailId = filteredCocktails[0].id;
      return renderCocktailMode();
    }

    layout(`
      ${relationshipTabs()}
      <div class="section-head">
        <div><span class="eyebrow">V0.6 · Cocktail Genealogy</span><h3>Structure first. Lineage second.</h3></div>
        <p>Families describe how a drink is built. Lineage edges describe a specific variation or riff. A shared family does not automatically mean one cocktail historically descended from another.</p>
      </div>

      <div class="family-toolbar panel">
        <label for="family-cocktail">Explore cocktail</label>
        <select id="family-cocktail" aria-label="Choose cocktail">
          ${filteredCocktails.map(x => `<option value="${esc(x.id)}" ${x.id === c.id ? 'selected' : ''}>${esc(x.name)} · ${esc(x.structuralFamily)}</option>`).join('')}
        </select>
        <button class="chip ${state.familyFilter === 'All' ? 'active' : ''}" data-family-filter="All">All families</button>
      </div>

      <section class="family-graph-layout">
        <article class="panel family-graph-panel">
          <div class="graph-panel-head">
            <div><span class="eyebrow">Lineage + structural relatives</span><h4>${esc(c.name)}</h4></div>
            <span class="tag role">${esc(c.structuralFamily)}</span>
          </div>
          ${familyGraphSvg(c)}
          <p class="meta graph-help">Solid lineage edges are curated Flavor Atlas relationships. Peer nodes fill unused space with high-similarity cocktails from the same structural family.</p>
        </article>

        <article class="panel family-definition-panel">
          <span class="eyebrow">Structural family</span>
          <h4>${esc(fam.name)}</h4>
          <p class="family-formula">${esc(fam.formula)}</p>
          <p class="meta">${esc(fam.principle)}</p>
          <div class="family-stat"><strong>${DATA.cocktailFamilySummary.counts[fam.id] || 0}</strong><span>cocktails in this family</span></div>
          <div class="family-stat"><strong>${connections.length}</strong><span>explicit lineage edges for ${esc(c.name)}</span></div>
          <button class="chip" data-open-family-profile="${esc(c.id)}">Open cocktail profile</button>
          ${connections.length ? `<div class="lineage-notes"><h5>Recorded lineage</h5>${connections.map(({edge,item,direction}) => `
            <button class="lineage-note" data-family-cocktail="${esc(item.id)}">
              <strong>${esc(direction === 'in' ? `${edge.from} → ${edge.to}` : `${edge.from} → ${edge.to}`)}</strong>
              <span>${esc(edge.relation)} · ${esc(edge.confidence)}</span>
              <small>${esc(edge.why)}</small>
            </button>`).join('')}</div>` : '<p class="meta lineage-empty">No explicit parent/child edge is recorded yet. The graph is showing structural relatives from the same family.</p>'}
        </article>
      </section>

      <div class="section-head family-index-heading"><div><span class="eyebrow">Family Index</span><h3>${DATA.cocktailFamilyTaxonomy.length} structural families</h3></div><p>${DATA.cocktailFamilySummary.edgeCount} curated lineage edges across ${DATA.cocktailFamilySummary.cocktailCount} cocktails.</p></div>
      <section class="family-card-grid">${familyCards()}</section>`);

    bindRelationshipTabs();

    document.querySelector('#family-cocktail')?.addEventListener('change', e => {
      state.familyCocktailId = e.target.value;
      renderRelationships();
    });

    document.querySelectorAll('[data-family-filter]').forEach(btn => btn.addEventListener('click', () => {
      state.familyFilter = btn.dataset.familyFilter;
      if (state.familyFilter !== 'All') {
        const first = DATA.cocktails.find(x => x.structuralFamilyId === state.familyFilter);
        if (first) state.familyCocktailId = first.id;
      }
      renderRelationships();
      window.scrollTo({top:0, behavior:'smooth'});
    }));

    document.querySelectorAll('[data-family-cocktail]').forEach(node => {
      const activate = () => {
        state.familyCocktailId = node.dataset.familyCocktail;
        state.familyFilter = 'All';
        renderRelationships();
        window.scrollTo({top:0, behavior:'smooth'});
      };
      node.addEventListener('click', activate);
      node.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });

    document.querySelector('[data-open-family-profile]')?.addEventListener('click', e => {
      state.selectedCocktailId = e.currentTarget.dataset.openFamilyProfile;
      state.view = 'cocktail';
      render();
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  renderRelationships = function() {
    if (state.relationshipMode === 'ingredients') return renderIngredientMode();
    return renderCocktailMode();
  };

  if (typeof renderCocktailProfile === 'function') {
    const baseCocktailProfileForFamilies = renderCocktailProfile;
    renderCocktailProfile = function() {
      baseCocktailProfileForFamilies();
      const c = DATA.cocktails.find(x => x.id === state.selectedCocktailId);
      if (!c) return;
      const fam = familyRecord(c.structuralFamilyId);
      const connections = explicitConnections(c);
      const footer = document.querySelector('.footer');
      if (!footer) return;
      footer.insertAdjacentHTML('beforebegin', `
        <div class="section-head family-profile-heading"><div><span class="eyebrow">V0.6 · Genealogy</span><h3>Structural family</h3></div></div>
        <section class="two-col family-profile-panels">
          <article class="panel">
            <span class="eyebrow">${esc(fam.name)}</span>
            <h4>${esc(fam.formula)}</h4>
            <p class="meta">${esc(fam.principle)}</p>
            <button class="chip" data-open-cocktail-family="${esc(c.id)}">Explore this family</button>
          </article>
          <article class="panel">
            <span class="eyebrow">Lineage</span>
            <h4>${connections.length ? `${connections.length} explicit connection${connections.length === 1 ? '' : 's'}` : 'No explicit lineage edge yet'}</h4>
            ${connections.length ? connections.map(({edge,item}) => `<button class="lineage-note compact" data-profile-relative="${esc(item.id)}"><strong>${esc(item.name)}</strong><span>${esc(edge.relation)}</span><small>${esc(edge.why)}</small></button>`).join('') : '<p class="meta">This cocktail is classified structurally, but Flavor Atlas is not claiming a specific historical parent or child yet.</p>'}
          </article>
        </section>`);

      document.querySelector('[data-open-cocktail-family]')?.addEventListener('click', e => {
        state.familyCocktailId = e.currentTarget.dataset.openCocktailFamily;
        state.familyFilter = 'All';
        state.relationshipMode = 'cocktails';
        state.view = 'relationships';
        render();
        window.scrollTo({top:0, behavior:'smooth'});
      });
      document.querySelectorAll('[data-profile-relative]').forEach(btn => btn.addEventListener('click', () => {
        state.selectedCocktailId = btn.dataset.profileRelative;
        render();
        window.scrollTo({top:0, behavior:'smooth'});
      }));
    };
  }

  render();
})();
