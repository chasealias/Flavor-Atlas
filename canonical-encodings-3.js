// Flavor Atlas V0.5 — canonical encoding batch 3 · Contemporary Classics.
// Recipe specs verified against current IBA pages on 2026-08-25.
// Family, vector, ingredient functions, and progression are Flavor Atlas analysis.
(() => {
  const DATA = window.FLAVOR_ATLAS_DATA;
  if (!DATA?.cocktails) return;
  const M = ['Sweetness','Bitterness','Acidity','Herbal','Earthiness','Umami','Body'];
  const V = a => Object.fromEntries(M.map((k,i)=>[k,a[i]]));

  const roleFor = (ingredient) => {
    const x = ingredient.toLowerCase();
    if (/egg|cream|coconut cream/.test(x)) return 'Texture / Body';
    if (/lemon|lime/.test(x)) return 'Acid Structure';
    if (/orange juice|pineapple|cranberry|grapefruit|passion fruit puree|passion fruit purée/.test(x)) return 'Fruit Structure';
    if (/syrup|sugar|honey|nectar|grenadine|cassis|amaretto|schnapps|crème|creme|liqueur|maraschino|cointreau|triple sec|falernum/.test(x)) return 'Sweetener / Modifier';
    if (/vermouth|lillet|wine|prosecco|champagne|sherry|port/.test(x)) return 'Wine Structure / Modifier';
    if (/cola|ginger beer|ginger ale|soda|water/.test(x)) return 'Length / Dilution';
    if (/bitters|campari|cynar|fernet/.test(x)) return 'Bitter / Herbal Structure';
    if (/absinthe|pernod|mint|basil|chili|nutmeg|clove/.test(x)) return 'Aromatic Accent';
    return 'Foundation';
  };

  const structuralFinish = (specs) => {
    const text = specs.map(x=>x[1]).join(' ').toLowerCase();
    const out = [];
    if (/lemon|lime|grapefruit/.test(text)) out.push('citrus acidity');
    if (/campari|cynar|fernet|bitters/.test(text)) out.push('bitterness');
    if (/ginger beer|ginger ale|soda|prosecco|champagne/.test(text)) out.push('lift and length');
    if (/cream|egg|coconut/.test(text)) out.push('rich texture');
    if (/rum|whiskey|whisky|cognac|brandy|gin|tequila|vodka|cachaça|pisco|grappa/.test(text)) out.push('spirit persistence');
    if (!out.length) out.push('integrated finish');
    return out.slice(0,3);
  };

  const progressionFor = (r) => {
    const names = r.s.map(x=>x[1].replace(/Fresh |Freshly Squeezed |Syrup|Juice/gi,'').trim()).filter(Boolean);
    return [
      {stage:'Aroma',notes:names.slice(0,3)},
      {stage:'Midpalate',notes:[r.family, ...names.slice(1,3)].slice(0,3)},
      {stage:'Finish',notes:structuralFinish(r.s)}
    ];
  };

  const R = [{"n":"Corpse Reviver #2","family":"Equal-parts aromatic sour","url":"https://iba-world.com/iba-cocktail/corpse-reviver-2/","s":[["30 ml","Gin"],["30 ml","Cointreau"],["30 ml","Lillet Blanc"],["30 ml","Fresh Lemon Juice"],["1 dash","Absinthe"]],"m":"Shake all ingredients with ice and strain into a chilled cocktail glass.","g":"Cocktail glass","z":"Orange zest","v":[5,3,8,7,1,0,5]},{"n":"Cosmopolitan","family":"Vodka daisy / fruit sour","url":"https://iba-world.com/iba-cocktail/cosmopolitan/","s":[["40 ml","Vodka Citron"],["15 ml","Cointreau"],["15 ml","Fresh Lime Juice"],["30 ml","Cranberry Juice"]],"m":"Shake with ice and strain into a large cocktail glass.","g":"Large cocktail glass","z":"Lemon twist","v":[6,1,7,1,0,0,4]},{"n":"Cuba Libre","family":"Highball","url":"https://iba-world.com/iba-cocktail/cuba-libre/","s":[["50 ml","White Rum"],["120 ml","Cola"],["10 ml","Fresh Lime Juice"]],"m":"Build in a highball glass filled with ice.","g":"Highball","z":"Lime wedge","v":[7,2,4,0,1,0,4]},{"n":"French Connection","family":"Two-part spirit liqueur","url":"https://iba-world.com/iba-cocktail/french-connection/","s":[["35 ml","Cognac"],["35 ml","Amaretto"]],"m":"Build over ice in an old fashioned glass and stir gently.","g":"Old fashioned","z":"None","v":[8,1,0,2,2,0,8]},{"n":"Garibaldi","family":"Bitter fruit highball","url":"https://iba-world.com/iba-cocktail/garibaldi/","s":[["45 ml","Bitter Campari"],["120 ml","Fresh Orange Juice"]],"m":"Build in a highball glass filled with ice.","g":"Highball","z":"Orange wedge","v":[6,8,3,4,0,0,5]},{"n":"Grasshopper","family":"Cream cocktail","url":"https://iba-world.com/iba-cocktail/grasshopper/","s":[["20 ml","White Crème de Cacao"],["20 ml","Green Crème de Menthe"],["20 ml","Fresh Cream"]],"m":"Shake briskly with ice and strain into a chilled cocktail glass.","g":"Cocktail glass","z":"Optional mint leaf","v":[9,1,0,4,1,0,9]},{"n":"Hemingway Special","family":"Daiquiri variation","url":"https://iba-world.com/iba-cocktail/hemingway-special/","s":[["60 ml","Rum"],["40 ml","Grapefruit Juice"],["15 ml","Maraschino Luxardo"],["15 ml","Fresh Lime Juice"]],"m":"Shake with ice and strain into a large cocktail glass.","g":"Large cocktail glass","z":"None","v":[4,3,8,0,0,0,4]},{"n":"Horse’s Neck","family":"Buck / ginger highball","url":"https://iba-world.com/iba-cocktail/horses-neck/","s":[["40 ml","Cognac"],["120 ml","Ginger Ale"],["optional dash","Angostura Bitters"]],"m":"Build Cognac and ginger ale over ice in a highball and stir gently; bitters are optional.","g":"Highball","z":"Long lemon spiral","v":[6,2,2,2,1,0,5]},{"n":"Irish Coffee","family":"Hot coffee cocktail","url":"https://iba-world.com/iba-cocktail/irish-coffee/","s":[["50 ml","Irish Whiskey"],["120 ml","Hot Coffee"],["50 ml","Fresh Cream, chilled"],["1 tsp","Sugar"]],"m":"Combine hot coffee, whiskey, and sugar in a preheated Irish coffee glass; float chilled cream over the back of a spoon.","g":"Irish coffee glass","z":"None","v":[6,4,1,0,4,0,8]},{"n":"Kir","family":"Wine cocktail","url":"https://iba-world.com/iba-cocktail/kir/","s":[["90 ml","Dry White Wine"],["10 ml","Crème de Cassis"]],"m":"Pour crème de cassis into the glass and top with dry white wine.","g":"Wine glass","z":"None","v":[5,1,4,0,0,0,3]},{"n":"Lemon Drop Martini","family":"Vodka sour / daisy","url":"https://iba-world.com/iba-cocktail/lemon-drop-martini/","s":[["30 ml","Vodka"],["20 ml","Triple Sec"],["15 ml","Fresh Lemon Juice"]],"m":"Shake with ice and strain into a chilled cocktail glass.","g":"Cocktail glass","z":"None","v":[6,0,8,0,0,0,4]},{"n":"Long Island Iced Tea","family":"Multi-spirit highball","url":"https://iba-world.com/iba-cocktail/long-island-iced-tea/","s":[["15 ml","Vodka"],["15 ml","Tequila"],["15 ml","White Rum"],["15 ml","Gin"],["15 ml","Cointreau"],["25 ml","Fresh Lemon Juice"],["30 ml","Simple Syrup"],["top","Cola"]],"m":"Build all ingredients in a highball glass filled with ice and stir gently.","g":"Highball","z":"Optional lemon slice","v":[7,2,6,2,1,0,7]},{"n":"Mimosa","family":"Sparkling fruit cocktail","url":"https://iba-world.com/iba-cocktail/mimosa/","s":[["75 ml","Fresh Orange Juice"],["75 ml","Prosecco"]],"m":"Pour orange juice into a flute, gently add sparkling wine, and stir lightly.","g":"Champagne flute","z":"Optional orange twist","v":[6,0,4,0,0,0,3]},{"n":"Mint Julep","family":"Julep","url":"https://iba-world.com/iba-cocktail/mint-julep/","s":[["60 ml","Bourbon Whiskey"],["4 sprigs","Fresh Mint"],["1 tsp","Powdered Sugar"],["2 tsp","Water"]],"m":"Gently muddle mint with sugar and water in a julep cup, fill with cracked ice, add Bourbon, and stir until frosted.","g":"Julep cup","z":"Mint sprig","v":[4,1,0,5,2,0,6]},{"n":"Moscow Mule","family":"Buck / mule","url":"https://iba-world.com/iba-cocktail/moscow-mule/","s":[["45 ml","Vodka"],["120 ml","Ginger Beer"],["10 ml","Fresh Lime Juice"]],"m":"Combine vodka and ginger beer in a mule cup or rocks glass, add lime juice, and stir gently.","g":"Mule cup or rocks","z":"Lime slice","v":[5,1,5,1,0,0,4]},{"n":"Pina Colada","family":"Blended tropical cocktail","url":"https://iba-world.com/iba-cocktail/pina-colada/","s":[["50 ml","White Rum"],["30 ml","Coconut Cream"],["50 ml","Fresh Pineapple Juice"]],"m":"Blend all ingredients with ice and pour into a large glass.","g":"Large glass","z":"Pineapple slice and cocktail cherry","v":[9,0,3,0,0,0,9]},{"n":"Rabo de Galo","family":"Spirit + vermouth + amaro","url":"https://iba-world.com/iba-cocktail/rabo-de-galo/","s":[["60 ml","Cachaça"],["20 ml","Sweet Vermouth"],["15 ml","Cynar"],["optional 2 drops","Angostura Bitters"]],"m":"Combine in a rocks glass, add ice, and stir briefly.","g":"Rocks","z":"Orange twist","v":[5,7,0,6,3,0,7]},{"n":"Sea Breeze","family":"Fruit highball","url":"https://iba-world.com/iba-cocktail/sea-breeze/","s":[["40 ml","Vodka"],["120 ml","Cranberry Juice"],["30 ml","Grapefruit Juice"]],"m":"Build in a highball glass filled with ice.","g":"Highball","z":"Orange zest and cherry","v":[6,2,5,0,0,0,4]},{"n":"Sex on the Beach","family":"Fruit highball","url":"https://iba-world.com/iba-cocktail/sex-on-the-beach/","s":[["40 ml","Vodka"],["20 ml","Peach Schnapps"],["40 ml","Fresh Orange Juice"],["40 ml","Cranberry Juice"]],"m":"Build in a highball glass filled with ice.","g":"Highball","z":"Half orange slice","v":[8,0,4,0,0,0,5]},{"n":"Singapore Sling","family":"Tropical sling","url":"https://iba-world.com/iba-cocktail/singapore-sling/","s":[["30 ml","Gin"],["15 ml","Cherry Sangue Morlacco"],["7.5 ml","Cointreau"],["7.5 ml","DOM Bénédictine"],["120 ml","Fresh Pineapple Juice"],["15 ml","Fresh Lime Juice"],["10 ml","Grenadine Syrup"],["1 dash","Angostura Bitters"]],"m":"Shake with ice and strain into a hurricane glass.","g":"Hurricane","z":"Pineapple and maraschino cherry","v":[8,3,6,5,1,0,7]},{"n":"Tequila Sunrise","family":"Layered fruit highball","url":"https://iba-world.com/iba-cocktail/tequila-sunrise/","s":[["45 ml","Tequila"],["90 ml","Fresh Orange Juice"],["15 ml","Grenadine Syrup"]],"m":"Build tequila and orange juice over ice, then add grenadine without stirring to create the sunrise effect.","g":"Highball","z":"Half orange slice or orange zest","v":[7,0,3,0,1,0,5]},{"n":"Vesper","family":"Martini variation","url":"https://iba-world.com/iba-cocktail/vesper/","s":[["45 ml","Gin"],["15 ml","Vodka"],["7.5 ml","Lillet Blanc"]],"m":"Shake with ice and strain into a chilled cocktail glass.","g":"Cocktail glass","z":"Lemon zest","v":[2,1,0,5,0,0,7]},{"n":"Zombie","family":"Tiki / multi-rum sour","url":"https://iba-world.com/iba-cocktail/zombie/","s":[["45 ml","Jamaican Dark Rum"],["45 ml","Gold Puerto Rican Rum"],["30 ml","Demerara Rum"],["20 ml","Fresh Lime Juice"],["15 ml","Falernum"],["15 ml","Donn’s Mix"],["1 tsp","Grenadine Syrup"],["1 dash","Angostura Bitters"],["6 drops","Pernod"]],"m":"Flash-blend all ingredients with 170 g cracked ice and serve in a tall tumbler.","g":"Tall tumbler","z":"Mint leaves","v":[7,4,7,6,3,0,9]}];
  R.forEach(r => {
    const c = DATA.cocktails.find(x => x.name === r.n);
    if (!c) return;
    Object.assign(c, {
      family: r.family,
      source: 'International Bartenders Association',
      sourceUrl: r.url,
      sourceVerifiedOn: '2026-08-25',
      recordStatus: 'encoded',
      analysisStatus: 'first-pass',
      specs: r.s,
      method: r.m,
      glassware: r.g,
      garnish: r.z,
      vector: V(r.v),
      functions: r.s.map(([measure,ingredient]) => [ingredient, roleFor(ingredient)]),
      progression: progressionFor(r),
      tags: [...new Set([...(c.tags || []), 'IBA verified', r.family, 'Flavor Atlas encoded'])]
    });
  });
  if (DATA.cocktailCanon) DATA.cocktailCanon.encodedCount = DATA.cocktails.filter(c=>c.recordStatus==='encoded').length;
})();
