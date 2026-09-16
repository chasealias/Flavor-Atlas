const D = window.PNP_DATA;
const app = document.querySelector("#app");
const STORE_KEY = "pnp-saved-v1";

const state = {
  view: "pair",
  flow: null,
  selectedCigar: null,
  selectedCocktail: null,
  cigarQuery: "",
  cocktailQuery: "",
  saved: JSON.parse(localStorage.getItem(STORE_KEY) || "[]")
};

function esc(v) {
  return String(v == null ? "" : v).replace(/[&<>"]/g, function(c) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];
  });
}

function average(values) {
  return values.reduce(function(a,b){ return a+b; },0) / (values.length || 1);
}

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

function pct(n) {
  return Math.round(clamp01(n) * 100);
}

function puffinMark() {
  return '<svg class="puffin-mark" viewBox="0 0 220 180" role="img" aria-label="Front-facing puffin with cigar and rocks glass">' +
    '<defs><linearGradient id="amber" x1="0" x2="1"><stop stop-color="#8c4e1c"/><stop offset="1" stop-color="#e39b45"/></linearGradient></defs>' +
    '<circle cx="110" cy="84" r="70" fill="#131916" stroke="#c89a58" stroke-width="3"/>' +
    '<path d="M58 72c8-37 30-55 52-55s45 18 52 55v50c-15 19-35 28-52 28s-38-9-52-28z" fill="#111"/>' +
    '<path d="M66 66c14-28 28-36 44-36s31 8 44 36c-10 26-22 43-44 43S76 92 66 66z" fill="#efe6d5"/>' +
    '<path d="M93 54 110 36l17 18 15 39-32 27-32-27z" fill="#d9692e"/>' +
    '<path d="M110 36v84" stroke="#34271f" stroke-width="5"/>' +
    '<circle cx="82" cy="61" r="7" fill="#111"/><circle cx="138" cy="61" r="7" fill="#111"/>' +
    '<circle cx="84" cy="59" r="2" fill="#e7a650"/><circle cx="140" cy="59" r="2" fill="#e7a650"/>' +
    '<rect x="132" y="79" width="64" height="10" rx="5" fill="#6d391e" transform="rotate(7 132 79)"/>' +
    '<circle cx="194" cy="88" r="6" fill="#e2542e"/>' +
    '<path d="M194 80c9-12 10-20 3-31 12 8 15 20 7 33" fill="none" stroke="#aaa" stroke-width="3" opacity=".55"/>' +
    '<path d="M42 100c-19 6-27 24-23 45h48l8-45z" fill="#111"/>' +
    '<rect x="15" y="112" width="50" height="50" rx="6" fill="none" stroke="#e8dec9" stroke-width="4"/>' +
    '<path d="M20 135h40v22H20z" fill="url(#amber)" opacity=".9"/>' +
    '<path d="m30 126 12-8 12 8-9 12z" fill="#e8dec9" opacity=".6"/>' +
    '</svg>';
}

function navItem(view,label,icon){
  return '<button data-go="' + view + '" class="' + (state.view===view ? 'active' : '') + '"><span>' + icon + '</span><small>' + label + '</small></button>';
}

function layout(content) {
  app.innerHTML =
    '<div class="shell">' +
      '<header class="brandbar">' +
        '<button class="brandbutton" data-go="pair" aria-label="Go home">' +
          puffinMark() +
          '<span><strong>Puff ’n Pour</strong><small>The right pour for every puff.</small></span>' +
        '</button>' +
      '</header>' +
      '<section class="content">' + content + '</section>' +
      '<nav class="bottomnav" aria-label="Primary">' +
        navItem("pair","Pair","✦") +
        navItem("cigars","Cigars","▰") +
        navItem("cocktails","Cocktails","◒") +
        navItem("saved","Saved","♡") +
      '</nav>' +
    '</div>';

  document.querySelectorAll("[data-go]").forEach(function(el){
    el.addEventListener("click", function(){
      state.view = el.dataset.go;
      render();
      window.scrollTo({top:0,behavior:"smooth"});
    });
  });
}

function tags(profile){
  return Object.entries(profile)
    .filter(function(pair){ return pair[1] >= 3; })
    .sort(function(a,b){ return b[1]-a[1]; })
    .slice(0,5)
    .map(function(pair){ return '<span class="tag">' + esc(pair[0]) + '</span>'; })
    .join("");
}

function metric(label,value){
  return '<div class="metric"><div><span>' + esc(label) + '</span><b>' + value + '/100</b></div><i><em style="width:' + value + '%"></em></i></div>';
}

function compatibility(cigar,cocktail){
  const overlap = average(D.flavors.map(function(k){
    return Math.min(cigar.flavor[k] || 0, cocktail.flavor[k] || 0) / 5;
  }));

  const intensity = 1 - Math.abs(cigar.strength - cocktail.intensity) / 4;

  const contrastPairs = [
    ["creamy","bitter"],["creamy","acidic"],["sweet","bitter"],["sweet","smoky"],
    ["fruity","earthy"],["acidic","roasted"],["herbal","woody"],["savory","fruity"]
  ];

  const contrast = average(contrastPairs.map(function(pair){
    return Math.min(cigar.flavor[pair[0]] || 0, cocktail.flavor[pair[1]] || 0) / 5;
  }));

  const cleanse = Math.max(
    Math.min(cocktail.flavor.acidic || 0, cigar.flavor.creamy || 0) / 5,
    Math.min(cocktail.flavor.bitter || 0, cigar.flavor.sweet || 0) / 5
  );

  const savedPair = state.saved.find(function(x){
    return x.cigarId === cigar.id && x.cocktailId === cocktail.id;
  });
  const preferenceMap = {love:1,good:.86,neutral:.62,nope:.12,saved:.72};
  const preference = savedPair ? (preferenceMap[savedPair.rating] || .72) : .72;
  const score = .30*clamp01(intensity) + .30*overlap + .20*contrast + .10*cleanse + .10*preference;

  return {
    score:pct(score),
    intensity:pct(intensity),
    bridge:pct(overlap),
    contrast:pct(contrast),
    cleanse:pct(cleanse),
    preference:pct(preference)
  };
}

function strongest(profile){
  return Object.entries(profile).sort(function(a,b){return b[1]-a[1];}).slice(0,3).map(function(x){return x[0];});
}

function explanation(cigar,cocktail,result){
  const shared = D.flavors.filter(function(k){
    return (cigar.flavor[k] || 0) >= 3 && (cocktail.flavor[k] || 0) >= 3;
  });
  const c1 = strongest(cigar.flavor);
  const c2 = strongest(cocktail.flavor);

  const bridge = shared.length
    ? "Shared " + shared.slice(0,2).join(" and ") + " notes create the bridge."
    : "The match works more through structure and contrast than direct flavor overlap.";

  const intensity = result.intensity >= 75
    ? "Their intensity is aligned, so neither side disappears."
    : "The intensity contrast is noticeable, so pacing matters.";

  const contrast = result.contrast >= 35
    ? "Useful contrast between " + c1[0] + " and " + c2[0] + " keeps the pairing from going flat."
    : "This pairing leans complementary, led by " + c1[0] + " and " + c2[0] + ".";

  return bridge + " " + intensity + " " + contrast;
}

function renderPair(){
  if(state.selectedCigar && state.selectedCocktail){
    renderResult();
    return;
  }

  layout(
    '<section class="hero">' +
      '<div class="eyebrow">Cigar × Cocktail Pairing</div>' +
      '<h1>Smoke with intent.<br>Pour with purpose.</h1>' +
      '<p>Choose either side first. Puff ’n Pour maps flavor, intensity, structure, complement and contrast, then explains why the pairing works.</p>' +
      '<div class="choicegrid">' +
        '<button class="choice" data-flow="smoking"><span>01</span><strong>I’m Smoking</strong><small>Choose a cigar, then find the pour.</small></button>' +
        '<button class="choice" data-flow="drinking"><span>02</span><strong>I’m Drinking</strong><small>Choose a cocktail, then find the smoke.</small></button>' +
      '</div>' +
    '</section>' +
    '<section class="feature">' +
      '<div><span class="eyebrow">Featured pairing</span><h2>ADVentura The Explorer × Toki Umamier</h2><p>Dark chocolate, nuts and wood meet bitter orange, herbs, oak and savory ponzu.</p></div>' +
      '<button class="ghost" data-feature>Try it →</button>' +
    '</section>'
  );

  document.querySelectorAll("[data-flow]").forEach(function(btn){
    btn.addEventListener("click",function(){
      state.flow = btn.dataset.flow;
      state.view = state.flow === "smoking" ? "cigars" : "cocktails";
      render();
    });
  });

  document.querySelector("[data-feature]").addEventListener("click",function(){
    state.selectedCigar = D.cigars[0];
    state.selectedCocktail = D.cocktails[0];
    state.view = "pair";
    render();
  });
}

function listCard(item,type,ranking){
  const meta = type === "cigar"
    ? item.wrapper + " · Strength " + item.strength + "/5"
    : item.base + " · " + item.style;

  const kicker = type === "cigar" ? item.brand : item.style;
  const rank = ranking
    ? '<div class="rankbadge">' + (ranking.rank === 1 ? 'Best match · ' : '#' + ranking.rank + ' · ') + ranking.score + '%</div>'
    : '';
  const verified = type === "cigar" && item.verified ? '<span class="verified">Verified profile</span>' : '';

  return '<button class="listcard ' + (ranking && ranking.rank===1 ? 'topmatch' : '') + '" data-pick-' + type + '="' + item.id + '">' +
    '<div>' + rank + '<span class="micro">' + esc(kicker) + '</span><h3>' + esc(item.name) + '</h3><p>' + esc(meta) + '</p>' + verified + '</div>' +
    '<div class="tags">' + tags(item.flavor) + '</div>' +
  '</button>';
}

function renderCigars(){
  const q = state.cigarQuery.toLowerCase();
  let items = D.cigars.filter(function(c){
    return [c.brand,c.name,c.wrapper,c.note,c.binder,c.filler,c.origin].concat(Object.keys(c.flavor)).join(" ").toLowerCase().includes(q);
  });

  let ranking = {};
  if(state.selectedCocktail){
    items = items.map(function(cigar){
      return {item:cigar, result:compatibility(cigar,state.selectedCocktail)};
    }).sort(function(a,b){return b.result.score-a.result.score;});
    items.forEach(function(row,index){
      ranking[row.item.id] = {rank:index+1,score:row.result.score};
    });
    items = items.map(function(row){return row.item;});
  }

  const heading = state.flow === "smoking" ? "What are you smoking?" : (state.selectedCocktail ? "Recommended smokes" : "Browse cigars");

  layout(
    '<div class="pagehead"><span class="eyebrow">Cigar library</span><h1>' + heading + '</h1>' +
      (state.selectedCocktail ? '<p>Ranked automatically for <b>' + esc(state.selectedCocktail.name) + '</b> using flavor, intensity, contrast and palate structure.</p>' : '') +
    '</div>' +
    (state.selectedCocktail ? '<div class="contextpill">Best match is shown first. Tap any cigar to see the full pairing breakdown.</div>' : '') +
    '<input class="search" id="cigar-search" value="' + esc(state.cigarQuery) + '" placeholder="Search brand, wrapper or flavor">' +
    '<div class="list">' + items.map(function(x){return listCard(x,"cigar",ranking[x.id]);}).join("") + '</div>' +
    '<p class="data-note">' + esc(D.dataNote || "") + '</p>'
  );

  document.querySelector("#cigar-search").addEventListener("input",function(e){
    state.cigarQuery = e.target.value;
    renderCigars();
    requestAnimationFrame(function(){
      const next = document.querySelector("#cigar-search");
      if(next){ next.focus(); next.setSelectionRange(next.value.length,next.value.length); }
    });
  });

  document.querySelectorAll("[data-pick-cigar]").forEach(function(btn){
    btn.addEventListener("click",function(){
      state.selectedCigar = D.cigars.find(function(x){return x.id === btn.dataset.pickCigar;});
      if(state.selectedCocktail){
        state.view = "pair";
      } else {
        state.flow = "smoking";
        state.view = "cocktails";
      }
      render();
    });
  });
}

function renderCocktails(){
  const q = state.cocktailQuery.toLowerCase();
  let items = D.cocktails.filter(function(c){
    return [c.name,c.style,c.base,c.note].concat(c.recipe,Object.keys(c.flavor)).join(" ").toLowerCase().includes(q);
  });

  let ranking = {};
  if(state.selectedCigar){
    items = items.map(function(cocktail){
      return {item:cocktail, result:compatibility(state.selectedCigar,cocktail)};
    }).sort(function(a,b){return b.result.score-a.result.score;});
    items.forEach(function(row,index){
      ranking[row.item.id] = {rank:index+1,score:row.result.score};
    });
    items = items.map(function(row){return row.item;});
  }

  const heading = state.flow === "drinking" ? "What are you drinking?" : (state.selectedCigar ? "Recommended pours" : "Browse cocktails");

  layout(
    '<div class="pagehead"><span class="eyebrow">Cocktail library</span><h1>' + heading + '</h1>' +
      (state.selectedCigar ? '<p>Ranked automatically for <b>' + esc(state.selectedCigar.name) + '</b> using the Puff ’n Pour pairing model.</p>' : '') +
    '</div>' +
    (state.selectedCigar ? '<div class="contextpill">Best match is shown first. Tap any cocktail to see the full pairing breakdown.</div>' : '') +
    '<input class="search" id="cocktail-search" value="' + esc(state.cocktailQuery) + '" placeholder="Search cocktail, spirit or flavor">' +
    '<div class="list">' + items.map(function(x){return listCard(x,"cocktail",ranking[x.id]);}).join("") + '</div>'
  );

  document.querySelector("#cocktail-search").addEventListener("input",function(e){
    state.cocktailQuery = e.target.value;
    renderCocktails();
    requestAnimationFrame(function(){
      const next = document.querySelector("#cocktail-search");
      if(next){ next.focus(); next.setSelectionRange(next.value.length,next.value.length); }
    });
  });

  document.querySelectorAll("[data-pick-cocktail]").forEach(function(btn){
    btn.addEventListener("click",function(){
      state.selectedCocktail = D.cocktails.find(function(x){return x.id === btn.dataset.pickCocktail;});
      if(state.selectedCigar){
        state.view = "pair";
      } else {
        state.flow = "drinking";
        state.view = "cigars";
      }
      render();
    });
  });
}

function sourceLinks(cigar){
  if(!cigar.sources || !cigar.sources.length) return "";
  return '<div class="sources"><span class="micro">Profile sources</span>' +
    cigar.sources.map(function(s){
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + ' ↗</a>';
    }).join("") +
  '</div>';
}

function saveCurrent(rating,note){
  const record = {
    id: state.selectedCigar.id + "__" + state.selectedCocktail.id,
    cigarId: state.selectedCigar.id,
    cocktailId: state.selectedCocktail.id,
    rating: rating || "saved",
    note: note || "",
    savedAt: new Date().toISOString()
  };

  state.saved = [record].concat(state.saved.filter(function(x){return x.id !== record.id;}));
  localStorage.setItem(STORE_KEY,JSON.stringify(state.saved));
}

function renderResult(){
  const cigar = state.selectedCigar;
  const cocktail = state.selectedCocktail;
  const result = compatibility(cigar,cocktail);

  layout(
    '<div class="resulthead">' +
      '<button class="back" data-reset>← New pairing</button>' +
      '<span class="eyebrow">Pairing result</span>' +
      '<h1>' + esc(cigar.name) + '<span>×</span>' + esc(cocktail.name) + '</h1>' +
    '</div>' +
    '<section class="scorecard">' +
      '<div class="score"><b>' + result.score + '</b><small>PAIR SCORE</small></div>' +
      '<div class="scorecopy"><h2>Why it works</h2><p>' + esc(explanation(cigar,cocktail,result)) + '</p></div>' +
    '</section>' +
    '<section class="breakdown">' +
      metric("Flavor bridge",result.bridge) +
      metric("Intensity match",result.intensity) +
      metric("Useful contrast",result.contrast) +
      metric("Palate structure",result.cleanse) +
    '</section>' +
    '<section class="duo">' +
      '<article><span class="micro">' + esc(cigar.brand) + '</span><h2>' + esc(cigar.name) + '</h2><p>' + esc(cigar.note) + '</p><p class="sourcefacts">' + esc(cigar.vitola) + ' · ' + esc(cigar.wrapper) + ' wrapper · ' + esc(cigar.origin) + '</p><div class="tags">' + tags(cigar.flavor) + '</div>' + sourceLinks(cigar) + '</article>' +
      '<article><span class="micro">' + esc(cocktail.style) + '</span><h2>' + esc(cocktail.name) + '</h2><p>' + esc(cocktail.note) + '</p><ul>' + cocktail.recipe.map(function(x){return '<li>'+esc(x)+'</li>';}).join("") + '</ul></article>' +
    '</section>' +
    '<section class="feedback">' +
      '<h2>How did it drink and smoke?</h2>' +
      '<div class="ratingrow">' +
        '<button data-rate="love">Love it</button>' +
        '<button data-rate="good">Good</button>' +
        '<button data-rate="neutral">Neutral</button>' +
        '<button data-rate="nope">Not for me</button>' +
      '</div>' +
      '<textarea id="note" placeholder="Add a tasting note…"></textarea>' +
      '<button class="primary" data-save>Save pairing</button>' +
      '<p class="savedmsg" id="savedmsg"></p>' +
    '</section>'
  );

  document.querySelector("[data-reset]").addEventListener("click",function(){
    state.selectedCigar = null;
    state.selectedCocktail = null;
    state.flow = null;
    state.view = "pair";
    render();
  });

  document.querySelectorAll("[data-rate]").forEach(function(btn){
    btn.addEventListener("click",function(){
      document.querySelectorAll("[data-rate]").forEach(function(x){x.classList.remove("chosen");});
      btn.classList.add("chosen");
    });
  });

  document.querySelector("[data-save]").addEventListener("click",function(){
    const selected = document.querySelector("[data-rate].chosen");
    saveCurrent(selected ? selected.dataset.rate : "saved",document.querySelector("#note").value.trim());
    document.querySelector("#savedmsg").textContent = "Saved to My Pairings.";
  });
}

function renderSaved(){
  const rows = state.saved.map(function(s){
    const cigar = D.cigars.find(function(x){return x.id===s.cigarId;});
    const cocktail = D.cocktails.find(function(x){return x.id===s.cocktailId;});
    if(!cigar || !cocktail) return "";
    return '<article class="savedcard">' +
      '<span class="micro">' + esc(s.rating) + '</span>' +
      '<h3>' + esc(cigar.name) + ' × ' + esc(cocktail.name) + '</h3>' +
      '<p>' + esc(s.note || "No tasting note yet.") + '</p>' +
      '<button class="ghost" data-open-saved="' + s.id + '">Open pairing →</button>' +
    '</article>';
  }).join("");

  layout(
    '<div class="pagehead"><span class="eyebrow">Your palate</span><h1>Saved pairings</h1><p>Every rating becomes preference data later. Miraculously, your opinions finally have a database.</p></div>' +
    '<div class="savedgrid">' +
      (rows || '<div class="empty"><h2>No saved pairings yet.</h2><p>Start with a cigar or cocktail and save something worth repeating.</p><button class="primary" data-go="pair">Start pairing</button></div>') +
    '</div>'
  );

  document.querySelectorAll("[data-open-saved]").forEach(function(btn){
    btn.addEventListener("click",function(){
      const s = state.saved.find(function(x){return x.id===btn.dataset.openSaved;});
      state.selectedCigar = D.cigars.find(function(x){return x.id===s.cigarId;});
      state.selectedCocktail = D.cocktails.find(function(x){return x.id===s.cocktailId;});
      state.view = "pair";
      render();
    });
  });
}

function render(){
  if(state.view === "cigars") return renderCigars();
  if(state.view === "cocktails") return renderCocktails();
  if(state.view === "saved") return renderSaved();
  return renderPair();
}

render();
