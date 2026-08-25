// Flavor Atlas V0.5.1 — House Canon completion batch.
// Exact recovered specs are labeled locked; archive concepts are normalized house-canon reconstructions.
(() => {
  const DATA = window.FLAVOR_ATLAS_DATA;
  if (!DATA?.cocktails) return;
  const METRICS = ['Sweetness','Bitterness','Acidity','Herbal','Earthiness','Umami','Body'];
  const V = values => Object.fromEntries(METRICS.map((key, i) => [key, values[i]]));
  const P = rows => rows.map(([stage, notes]) => ({ stage, notes }));

  const RECORDS = [
    {
      name:'Santorini Bellini', confidence:'normalized house canon', family:'Bellini / sparkling fruit cocktail',
      intent:'A Greek-leaning Bellini marrying white peach with Mastiha and dry sparkling wine.',
      specs:[['0.5 oz','Mastiha'],['1 oz','White Peach Purée'],['3.5 oz','Prosecco']],
      method:'Add peach and Mastiha to a chilled flute, top slowly with Prosecco, and stir once very gently.', glassware:'Champagne flute', garnish:'Thin peach slice',
      vector:[6,0,4,4,1,0,4],
      functions:[['Mastiha','Resinous Greek Modifier'],['White Peach Purée','Fruit Body / Sweetness'],['Prosecco','Length / Acidity / Carbonation']],
      progression:[['Aroma',['peach','mastic resin','sparkling wine']],['Attack',['white peach','dry bubbles']],['Midpalate',['Mastiha','stone fruit']],['Finish',['resin','dry wine','peach skin']]],
      tags:['house riff','Bellini','Mastiha','sparkling','peach']
    },
    {
      name:'Blood Orange Mimosa', confidence:'normalized house canon', family:'Mimosa / sparkling citrus cocktail',
      intent:'A richer Mimosa with blood orange depth and a restrained orange-liqueur bridge.',
      specs:[['2 oz','Blood Orange Juice'],['0.25 oz','Orange Liqueur'],['3 oz','Prosecco']],
      method:'Build in a chilled flute, adding Prosecco last.', glassware:'Champagne flute', garnish:'Blood-orange half wheel',
      vector:[6,1,5,0,0,0,3],
      functions:[['Blood Orange Juice','Fruit / Acid Structure'],['Orange Liqueur','Sweetener / Citrus Bridge'],['Prosecco','Length / Carbonation']],
      progression:[['Aroma',['blood orange','wine']],['Attack',['juicy citrus','bubbles']],['Midpalate',['orange liqueur','wine acidity']],['Finish',['dry citrus','light bitterness']]],
      tags:['house riff','Mimosa','blood orange','sparkling']
    },
    {
      name:'Bloody Mama Mia', confidence:'normalized house canon', family:'Bloody Mary / savory highball',
      intent:'A Greek Bloody Mary riff using Tsipouro, tomato, olive brine, oregano, citrus, and savory spice.',
      specs:[['1.5 oz','Tsipouro'],['3 oz','Tomato Juice'],['0.5 oz','Fresh Lemon Juice'],['0.25 oz','Olive Brine'],['2 dashes','Worcestershire Sauce'],['2 dashes','Hot Sauce'],['1 pinch','Dried Oregano'],['1 drop','Saline']],
      method:'Roll gently with ice and pour over fresh ice.', glassware:'Highball', garnish:'Lemon wedge, olive, and oregano-dusted cucumber or celery',
      vector:[2,3,5,4,5,8,7],
      functions:[['Tsipouro','Dry Grape-Spirit Foundation'],['Tomato Juice','Savory Body / Umami'],['Lemon Juice','Acid Structure'],['Olive Brine + Saline','Salinity'],['Worcestershire + Hot Sauce','Umami / Heat / Spice'],['Oregano','Greek Herbal Signature']],
      progression:[['Aroma',['oregano','tomato','olive']],['Attack',['savory tomato','lemon','salt']],['Midpalate',['Tsipouro','olive brine','umami spice']],['Finish',['oregano','heat','dry grape spirit']]],
      tags:['house riff','Bloody Mary','Tsipouro','savory','Greek']
    },
    {
      name:'Hellenic Negroni', confidence:'locked working spec', family:'Negroni / equal-parts bitter aperitivo',
      intent:'A pale Greek Negroni variation replacing Campari and sweet vermouth with White Bitter Rouge and Lillet Blanc.',
      specs:[['1 oz','Stray Dog Gin'],['1 oz','White Bitter Rouge'],['1 oz','Lillet Blanc'],['1 dash','Orange Bitters'],['1 drop','Saline']],
      method:'Stir with ice and strain over a large cube.', glassware:'Double old fashioned', garnish:'Grapefruit or orange peel; rosemary optional',
      vector:[4,7,1,7,1,0,6],
      functions:[['Stray Dog Gin','Botanical Foundation'],['White Bitter Rouge','Bitter Structure'],['Lillet Blanc','Wine Structure / Sweetness'],['Orange Bitters','Citrus Spice'],['Saline','Amplifier']],
      progression:[['Aroma',['citrus oil','juniper','Mediterranean herbs']],['Attack',['pale bittersweet citrus','Lillet']],['Midpalate',['gin botanicals','white bitter herbs']],['Finish',['dry bitterness','orange spice','saline lift']]],
      tags:['house riff','Negroni','Stray Dog','Lillet','white bitter']
    },
    {
      name:'Hellenic Boulevardier', confidence:'locked working spec', family:'Boulevardier / bitter aperitivo',
      intent:'A Greek Boulevardier replacing whiskey with Metaxa while keeping the pale bitter-and-Lillet architecture.',
      specs:[['1 oz','Metaxa 7 Star'],['1 oz','White Bitter Rouge'],['1 oz','Lillet Blanc'],['1 dash','Orange Bitters'],['1 drop','Saline']],
      method:'Stir with ice and strain over a large cube.', glassware:'Double old fashioned', garnish:'Orange peel',
      vector:[5,7,1,6,3,0,7],
      functions:[['Metaxa 7 Star','Aged Grape-Spirit Foundation'],['White Bitter Rouge','Bitter Structure'],['Lillet Blanc','Wine Structure'],['Orange Bitters','Aromatic Spice'],['Saline','Amplifier']],
      progression:[['Aroma',['orange oil','dried fruit','herbs']],['Attack',['Metaxa fruit','pale bitterness']],['Midpalate',['Lillet','orange herbs','oak']],['Finish',['dry bitter citrus','warm grape spirit']]],
      tags:['house riff','Boulevardier','Metaxa','Lillet','white bitter']
    },
    {
      name:'Wings of Icarus', confidence:'normalized house canon', family:'Mediterranean brandy sour',
      intent:'A bright Greek brandy sour built to feel lifted and sunlit rather than heavy, with Mastiha, bitter orange, lemon, and honey.',
      specs:[['1.5 oz','Metaxa 7 Star'],['0.5 oz','Mastiha'],['0.5 oz','Aperol'],['0.75 oz','Fresh Lemon Juice'],['0.5 oz','Honey Syrup'],['1 drop','Saline']],
      method:'Shake with ice and fine-strain.', glassware:'Coupe', garnish:'Expressed orange peel',
      vector:[6,4,8,6,2,0,6],
      functions:[['Metaxa','Foundation'],['Mastiha','Resinous Bridge'],['Aperol','Bittersweet Orange Modifier'],['Lemon Juice','Acid Structure'],['Honey Syrup','Sweetener / Floral Bridge'],['Saline','Amplifier']],
      progression:[['Aroma',['orange oil','mastic resin','honey']],['Attack',['lemon','Aperol orange']],['Midpalate',['Metaxa fruit','Mastiha','honey']],['Finish',['bitter orange','resin','dry citrus']]],
      tags:['house original','Metaxa','Mastiha','sour','Greek']
    },
    {
      name:'Tiki of Troy', confidence:'locked working spec', family:'Tiki sour',
      intent:'A Greek tiki drink using Tsipouro as the main foundation with aged rum, bergamot, falernum, pineapple, lime, and orgeat.',
      specs:[['1.5 oz','Tsipouro'],['0.5 oz','Aged Rum'],['0.5 oz','Italicus'],['0.75 oz','Pineapple Juice'],['0.5 oz','Fresh Lime Juice'],['0.5 oz','Velvet Falernum'],['0.25 oz','Orgeat'],['1 dash','Angostura Bitters'],['1 dash','JUJU BEE / Red & Raw'],['optional','Saline']],
      method:'Shake with ice and dirty-dump over crushed ice.', glassware:'Tiki mug or double old fashioned', garnish:'Pineapple frond, mint bouquet, and lime shell',
      vector:[7,3,7,5,3,0,8],
      functions:[['Tsipouro','Greek Grape-Spirit Foundation'],['Aged Rum','Tiki Depth'],['Italicus','Bergamot Bridge'],['Pineapple + Lime','Fruit / Acid Structure'],['Velvet Falernum','Spiced Sweetener'],['Orgeat','Nutty Body'],['Bitters + JUJU BEE','Spice / Aromatic Finish']],
      progression:[['Aroma',['mint','pineapple','bergamot']],['Attack',['pineapple','lime','falernum']],['Midpalate',['Tsipouro','aged rum','orgeat']],['Finish',['Angostura spice','bergamot','grape spirit']]],
      tags:['house original','tiki','Tsipouro','Italicus','pineapple']
    },
    {
      name:'Grecian Corpse Reviver', confidence:'locked working spec', family:'Corpse Reviver #2 riff',
      intent:'A clean Greek-accented Corpse Reviver built on Stray Dog Gin, Lillet, orange liqueur, and lemon.',
      specs:[['0.75 oz','Stray Dog Gin'],['0.75 oz','Lillet Blanc'],['0.75 oz','Cointreau'],['0.75 oz','Fresh Lemon Juice']],
      method:'Shake with ice and fine-strain.', glassware:'Chilled coupe', garnish:'Expressed lemon peel',
      vector:[5,1,8,5,1,0,5],
      functions:[['Stray Dog Gin','Botanical Foundation'],['Lillet Blanc','Wine Structure'],['Cointreau','Orange Sweetener'],['Fresh Lemon Juice','Acid Structure']],
      progression:[['Aroma',['lemon oil','orange','juniper']],['Attack',['bright lemon','orange']],['Midpalate',['Lillet','Greek gin botanicals']],['Finish',['dry citrus','soft wine herbs']]],
      tags:['house riff','Corpse Reviver','Stray Dog','Lillet']
    },
    {
      name:'Greek Last Word', confidence:'locked working spec', family:'Last Word / equal-parts herbal sour',
      intent:'A Greek Last Word riff replacing maraschino with Mastiha for a more resinous, Mediterranean center.',
      specs:[['0.5 oz','Stray Dog Gin'],['0.5 oz','Skinos Mastiha'],['0.5 oz','Green Chartreuse'],['0.5 oz','Fresh Lime Juice']],
      method:'Shake with ice and fine-strain.', glassware:'Chilled coupe', garnish:'Expressed lime coin',
      vector:[5,5,8,10,2,0,5],
      functions:[['Stray Dog Gin','Botanical Foundation'],['Mastiha','Resinous Modifier'],['Green Chartreuse','Herbal Engine'],['Fresh Lime Juice','Acid Structure']],
      progression:[['Aroma',['lime oil','alpine herbs','mastic resin']],['Attack',['lime','Chartreuse']],['Midpalate',['gin','Mastiha','dense herbs']],['Finish',['resin','herbal bitterness','dry citrus']]],
      tags:['house riff','Last Word','Mastiha','Chartreuse','Stray Dog']
    },
    {
      name:'Greek Naked & Famous', confidence:'locked working spec', family:'Naked & Famous / equal-parts smoky herbal sour',
      intent:'A Greek riff using Elixir and Mastiha with Aperol and lime for an herbal-resinous interpretation of the modern classic.',
      specs:[['0.75 oz','Elixir Liqueur'],['0.75 oz','Skinos Mastiha'],['0.75 oz','Aperol'],['0.75 oz','Fresh Lime Juice']],
      method:'Shake with ice and fine-strain.', glassware:'Chilled coupe', garnish:'Expressed orange peel',
      vector:[6,5,8,8,2,0,6],
      functions:[['Elixir Liqueur','Herbal Foundation'],['Mastiha','Resinous Modifier'],['Aperol','Bittersweet Orange Structure'],['Fresh Lime Juice','Acid Structure']],
      progression:[['Aroma',['orange oil','mastic resin','herbs']],['Attack',['lime','Aperol']],['Midpalate',['Elixir herbs','Mastiha']],['Finish',['bitter orange','resin','dry lime']]],
      tags:['house riff','Naked & Famous','Mastiha','Aperol']
    },
    {
      name:'Greek Vesper', confidence:'locked working spec', family:'Vesper / spirit-forward martini',
      intent:'A Greek Vesper replacing vodka with Metaxa to add grape, oak, and orange depth beneath Stray Dog Gin and Lillet.',
      specs:[['1 oz','Stray Dog Gin'],['1 oz','Metaxa 7 Star'],['0.5 oz','Lillet Blanc']],
      method:'Stir very cold with ice and strain.', glassware:'Nick & Nora or martini glass', garnish:'Long lemon twist',
      vector:[3,2,0,6,3,0,8],
      functions:[['Stray Dog Gin','Botanical Foundation'],['Metaxa 7 Star','Aged Grape-Spirit Structure'],['Lillet Blanc','Aromatized-Wine Bridge']],
      progression:[['Aroma',['lemon oil','juniper','orange peel']],['Attack',['cold spirit','gin botanicals']],['Midpalate',['Metaxa fruit','Lillet']],['Finish',['oak','dry herbs','citrus oil']]],
      tags:['house riff','Vesper','Metaxa','Stray Dog','Lillet']
    },
    {
      name:'Metaxa Sangria', confidence:'normalized house canon', family:'Sangria / wine punch',
      intent:'A Greek sangria that uses Metaxa to deepen red wine with dried-fruit, orange, and warm-spice character.',
      specs:[['1.5 oz','Metaxa 7 Star'],['3 oz','Dry Red Wine'],['0.5 oz','Orange Liqueur'],['1 oz','Fresh Orange Juice'],['0.5 oz','Fresh Lemon Juice'],['0.25 oz','Simple Syrup'],['1 oz','Soda Water']],
      method:'Shake the still ingredients briefly with ice, pour over fresh ice, and top with soda.', glassware:'Wine glass', garnish:'Orange wheel and seasonal fruit',
      vector:[7,2,6,2,4,0,7],
      functions:[['Metaxa','Fortifying Foundation'],['Red Wine','Wine Structure'],['Orange Liqueur + Juice','Citrus Fruit / Sweetness'],['Lemon Juice','Acid Structure'],['Simple Syrup','Balance'],['Soda','Length']],
      progression:[['Aroma',['orange','red fruit','Metaxa spice']],['Attack',['wine','orange','lemon']],['Midpalate',['dried fruit','oak','wine tannin']],['Finish',['citrus','soft spice','dry bubbles']]],
      tags:['house original','sangria','Metaxa','wine','orange']
    },
    {
      name:'Greek Coffee Flip', confidence:'normalized house canon', family:'Flip / coffee dessert cocktail',
      intent:'A Greek coffee flip using cordial rather than loose grounds, with Metaxa, whole egg, and Mastiha for dense after-dinner texture.',
      specs:[['1.5 oz','Metaxa 7 Star'],['0.75 oz','Greek Coffee Cordial'],['0.25 oz','Mastiha'],['0.25 oz','Simple Syrup'],['1','Whole Egg']],
      method:'Dry shake hard, shake again with ice, and double-strain.', glassware:'Coupe', garnish:'Fresh grated nutmeg and a light dusting of finely ground coffee',
      vector:[8,4,0,4,4,0,10],
      functions:[['Metaxa','Foundation'],['Greek Coffee Cordial','Coffee Sweetener / Roast Structure'],['Mastiha','Resinous Bridge'],['Simple Syrup','Balance'],['Whole Egg','Body / Emulsion']],
      progression:[['Aroma',['coffee','nutmeg','mastic resin']],['Attack',['rich coffee','Metaxa fruit']],['Midpalate',['whole-egg texture','Mastiha','sweet roast']],['Finish',['nutmeg','coffee bitterness','oak']]],
      tags:['house original','dessert','flip','Greek coffee','Metaxa']
    },
    {
      name:'Athens at Midnight', confidence:'normalized house canon', family:'Spirit-forward dessert cocktail',
      intent:'A dark after-dinner cocktail built around Metaxa, coffee, Mavrodaphne, cacao, and orange spice.',
      specs:[['1.5 oz','Metaxa 12 Star'],['0.5 oz','Coffee Liqueur'],['0.5 oz','Mavrodaphne'],['0.25 oz','Dark Crème de Cacao'],['2 dashes','Orange Bitters']],
      method:'Stir with ice and strain over a large cube.', glassware:'Double rocks', garnish:'Expressed orange peel',
      vector:[8,4,0,3,5,0,9],
      functions:[['Metaxa 12','Foundation'],['Coffee Liqueur','Roast Sweetener'],['Mavrodaphne','Dark-Fruit Fortified-Wine Depth'],['Dark Crème de Cacao','Chocolate Modifier'],['Orange Bitters','Aromatic Contrast']],
      progression:[['Aroma',['orange oil','coffee','dried fruit']],['Attack',['Metaxa','Mavrodaphne','cacao']],['Midpalate',['coffee roast','raisin','oak']],['Finish',['dark chocolate','orange spice','warm brandy']]],
      tags:['house original','dessert','Metaxa','coffee','Mavrodaphne']
    },
    {
      name:'Berrycello', confidence:'normalized house canon', family:'Berry citrus sour',
      intent:'A bright berry-and-limoncello sour with Greek gin structure and enough fresh lemon to keep the candied citrus lean.',
      specs:[['1.5 oz','Stray Dog Gin'],['0.75 oz','Limoncello'],['0.75 oz','Mixed Berry Purée'],['0.5 oz','Fresh Lemon Juice'],['0.25 oz','Simple Syrup']],
      method:'Shake with ice and fine-strain.', glassware:'Coupe', garnish:'Lemon twist and one fresh berry',
      vector:[7,1,8,4,0,0,6],
      functions:[['Stray Dog Gin','Botanical Foundation'],['Limoncello','Candied Citrus Sweetener'],['Berry Purée','Fruit Body'],['Fresh Lemon Juice','Acid Structure'],['Simple Syrup','Balance']],
      progression:[['Aroma',['lemon oil','berries','juniper']],['Attack',['berry','lemon']],['Midpalate',['limoncello','gin botanicals','fruit']],['Finish',['dry citrus','berry skin','juniper']]],
      tags:['house original','berry','limoncello','Stray Dog','sour']
    },
    {
      name:"The Cyprian's Potion", confidence:'normalized house canon', family:'Floral-fruit gin sour',
      intent:'The quince evolution of the earlier floral grapefruit-gin sour, using quince cordial for autumnal fruit and structure.',
      specs:[['1.5 oz','Malfy Grapefruit Gin'],['0.5 oz','Quince Cordial'],['0.75 oz','Fresh Lemon Juice'],['0.25 oz','Mastiha']],
      method:'Shake with ice and fine-strain.', glassware:'Coupe', garnish:'Grapefruit peel',
      vector:[6,2,8,5,1,0,5],
      functions:[['Grapefruit Gin','Citrus-Botanical Foundation'],['Quince Cordial','Orchard-Fruit Sweetener'],['Fresh Lemon Juice','Acid Structure'],['Mastiha','Greek Resinous Bridge']],
      progression:[['Aroma',['grapefruit oil','quince','mastic resin']],['Attack',['lemon','quince']],['Midpalate',['grapefruit gin','Mastiha','orchard fruit']],['Finish',['bitter grapefruit','resin','dry citrus']]],
      tags:['house original','quince','grapefruit gin','Mastiha','sour']
    },
    {
      name:'The Aphrodisiac', confidence:'normalized house canon', family:'Floral gin sour',
      intent:'The original floral grapefruit-gin sour centered on lavender and lemon.',
      specs:[['1.5 oz','Malfy Grapefruit Gin'],['0.5 oz','Lavender Syrup'],['0.75 oz','Fresh Lemon Juice']],
      method:'Shake with ice and fine-strain.', glassware:'Coupe', garnish:'Grapefruit peel and a small lavender sprig',
      vector:[6,1,8,5,0,0,4],
      functions:[['Grapefruit Gin','Citrus-Botanical Foundation'],['Lavender Syrup','Floral Sweetener'],['Fresh Lemon Juice','Acid Structure']],
      progression:[['Aroma',['lavender','grapefruit peel']],['Attack',['lemon','floral sweetness']],['Midpalate',['grapefruit gin','lavender']],['Finish',['bitter citrus','flowers','juniper']]],
      tags:['house original','lavender','grapefruit gin','floral','sour']
    },
    {
      name:'Filthy Lupin', confidence:'normalized house canon', family:'Dirty soda / boozy highball',
      intent:'A deliberately indulgent boozy dirty soda balancing vanilla, Mastiha, cola, and cream with a small saline edge.',
      specs:[['1.5 oz','Vanilla Vodka'],['0.5 oz','Mastiha'],['3 oz','Cola'],['0.5 oz','Vanilla Syrup'],['1 oz','Light Cream'],['1 drop','Saline']],
      method:'Build vodka, Mastiha, vanilla, and cola over ice. Float or lightly stir in cream at the end.', glassware:'Highball', garnish:'Orange peel',
      vector:[10,2,1,4,1,0,9],
      functions:[['Vanilla Vodka','Foundation'],['Mastiha','Resinous Modifier'],['Cola','Carbonated Length / Spice'],['Vanilla Syrup','Sweetener'],['Light Cream','Dirty-Soda Body'],['Saline','Amplifier']],
      progression:[['Aroma',['vanilla','cola spice','orange oil']],['Attack',['sweet cola','vanilla']],['Midpalate',['cream','Mastiha','vodka']],['Finish',['cola bitterness','resin','saline vanilla']]],
      tags:['house original','dirty soda','highball','Mastiha','vanilla']
    },
    {
      name:'Orchard Oracle', confidence:'normalized house canon', family:'Apple-brandy orchard sour',
      intent:'An orchard-fruit sour using applejack, pear, elderflower, lemon, and dry fortified wine for a fall profile lighter than Hardcore Port.',
      specs:[['1.5 oz','Applejack'],['0.5 oz','Pear Liqueur'],['0.5 oz','Elderflower Liqueur'],['0.75 oz','Fresh Lemon Juice'],['0.5 oz','Chip Dry White Port'],['2 dashes','Peach Bitters']],
      method:'Shake with ice and fine-strain.', glassware:'Coupe', garnish:'Thin apple fan or expressed lemon peel',
      vector:[6,2,8,4,2,0,6],
      functions:[['Applejack','Orchard Foundation'],['Pear Liqueur','Pear Modifier'],['Elderflower','Floral Bridge'],['Fresh Lemon Juice','Acid Structure'],['Dry White Port','Fortified-Wine Structure'],['Peach Bitters','Stone-Fruit Spice']],
      progression:[['Aroma',['apple','pear','flowers']],['Attack',['lemon','pear','elderflower']],['Midpalate',['applejack','dry port','orchard fruit']],['Finish',['peach spice','apple skin','dry citrus']]],
      tags:['house original','applejack','orchard','pear','fall']
    },
    {
      name:'Metaxa Honey Sour', confidence:'normalized house canon', family:'Egg-white brandy sour',
      intent:'A straightforward Greek brandy sour built around Metaxa, lemon, honey, bitters, and a soft egg-white texture.',
      specs:[['2 oz','Metaxa 7 Star'],['0.75 oz','Fresh Lemon Juice'],['0.75 oz','Honey Syrup'],['1','Egg White'],['2 dashes','Orange Bitters'],['1 drop','Saline']],
      method:'Dry shake, shake again with ice, and fine-strain.', glassware:'Coupe', garnish:'Expressed orange peel or three drops bitters on the foam',
      vector:[7,2,8,3,3,0,7],
      functions:[['Metaxa','Foundation'],['Fresh Lemon Juice','Acid Structure'],['Honey Syrup','Sweetener / Floral Bridge'],['Egg White','Texture / Foam'],['Orange Bitters','Aromatic Spice'],['Saline','Amplifier']],
      progression:[['Aroma',['orange oil','honey','Metaxa spice']],['Attack',['lemon','honey']],['Midpalate',['Metaxa dried fruit','silky foam']],['Finish',['orange bitters','honey','oak']]],
      tags:['house original','Metaxa','honey','egg white','sour']
    }
  ];

  RECORDS.forEach(r => {
    const c = DATA.cocktails.find(item => item.name === r.name);
    if (!c) return;
    Object.assign(c, {
      collection:'House Archive', source:'Flavor Atlas working archive',
      recipeProvenance:r.confidence, recipeConfidence:r.confidence,
      analysisSource:'Flavor Atlas', recordStatus:'encoded', family:r.family,
      intent:r.intent, specs:r.specs, method:r.method, glassware:r.glassware,
      garnish:r.garnish, vector:V(r.vector), functions:r.functions,
      progression:P(r.progression), tags:[...new Set([...(c.tags || []), ...r.tags])]
    });
  });

  DATA.houseCanon = {
    ...(DATA.houseCanon || {}), version:'0.5.1',
    encodedBatch3:RECORDS.map(r => r.name),
    completed:true
  };
})();
