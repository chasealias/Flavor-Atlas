// Flavor Atlas V0.5.1 — House Canon encoding batch 2.
// Some records are locked working specs; others are normalized reconstructions from the working archive.
(() => {
  const DATA = window.FLAVOR_ATLAS_DATA;
  if (!DATA?.cocktails) return;
  const METRICS = ['Sweetness','Bitterness','Acidity','Herbal','Earthiness','Umami','Body'];
  const V = values => Object.fromEntries(METRICS.map((key, i) => [key, values[i]]));
  const P = rows => rows.map(([stage, notes]) => ({ stage, notes }));

  const RECORDS = [
    {
      name:'White Cosmopolis', confidence:'locked working spec', family:'Cosmopolitan / citrus sour',
      intent:'A white, Mediterranean-leaning Cosmopolitan built around citrus vodka, bergamot, orange liqueur, and Mastiha.',
      specs:[['1.5 oz','Stoli Citrus'],['0.75 oz','Italicus'],['0.5 oz','Cointreau'],['0.25 oz','Mastiha'],['0.75 oz','Fresh Lime Juice'],['1–2 drops','Saline']],
      method:'Shake with ice and fine-strain into a chilled coupe.', glassware:'Coupe', garnish:'Three fresh cranberries on a pick',
      vector:[6,1,8,5,1,0,5],
      functions:[['Stoli Citrus','Foundation'],['Italicus','Bergamot Modifier / Bridge'],['Cointreau','Orange Sweetener'],['Mastiha','Resinous Greek Accent'],['Fresh Lime Juice','Acid Structure'],['Saline','Amplifier']],
      progression:[['Aroma',['bergamot','lime','mastic resin']],['Attack',['bright lime','orange','citrus vodka']],['Midpalate',['Italicus florals','Mastiha','soft orange sweetness']],['Finish',['dry citrus','resin','saline lift']]],
      tags:['house original','Ilios','white cosmo','Mastiha','bergamot']
    },
    {
      name:'Mediterranean Sunset Spritz', confidence:'normalized reconstruction', family:'Spritz',
      intent:'A layered Mediterranean spritz using resin, elderflower, bittersweet red aperitivo, lemon, and sparkling wine to create a sunset effect.',
      specs:[['0.25 oz','Mastiha'],['0.5 oz','Elderflower Liqueur'],['1 oz','Sarti'],['0.5 oz','Aperol'],['0.25 oz','Limoncello'],['3 oz','Prosecco'],['1 oz','Soda Water'],['1 drop','Thyme Blossom Tincture']],
      method:'Build over ice in a stemless wine glass. Place limoncello low in the drink, add sparkling components gently, and finish with Sarti toward the top to preserve the sunset gradient.',
      glassware:'Stemless wine glass', garnish:'Dehydrated candied gold-leaf lemon or orange wheel and mint sprig',
      vector:[7,4,3,6,1,0,4],
      functions:[['Mastiha','Resinous Bridge'],['Elderflower Liqueur','Floral Sweetener'],['Sarti + Aperol','Bittersweet Fruit Structure'],['Limoncello','Candied Citrus Modifier'],['Prosecco + Soda','Length / Acidity / Carbonation'],['Thyme Blossom Tincture','Herbal Finish']],
      progression:[['Aroma',['mint','thyme','citrus peel']],['Attack',['sparkling citrus','elderflower','Aperol']],['Midpalate',['Sarti fruit','Mastiha resin','limoncello']],['Finish',['bitter orange','thyme','dry bubbles']]],
      tags:['house original','Ilios','spritz','layered','Mediterranean']
    },
    {
      name:'Greek Jungle Bird', confidence:'normalized reconstruction', family:'Jungle Bird / tropical bitter sour',
      intent:'A Greek-leaning Jungle Bird that replaces the usual rum-and-Campari architecture with grape spirit, amaro, and Mastiha.',
      specs:[['0.75 oz','Tsipouro'],['0.75 oz','Foro Amaro'],['0.75 oz','Mastiha'],['1.5 oz','Pineapple Juice'],['0.5 oz','Fresh Lime Juice'],['0.25 oz','Simple Syrup']],
      method:'Shake with ice and strain over fresh ice.', glassware:'Double rocks', garnish:'Pineapple frond or citrus peel',
      vector:[7,6,7,8,3,0,6],
      functions:[['Tsipouro','Dry Grape-Spirit Foundation'],['Foro Amaro','Bitter Herbal Structure'],['Mastiha','Resinous Sweet Modifier'],['Pineapple Juice','Tropical Body'],['Fresh Lime Juice','Acid Structure'],['Simple Syrup','Balance']],
      progression:[['Aroma',['pineapple','mastic resin','grape spirit']],['Attack',['pineapple','lime','sweet herbs']],['Midpalate',['Tsipouro','Foro bitterness','Mastiha']],['Finish',['bitter herbs','resin','dry tropical fruit']]],
      tags:['house riff','Greek','Jungle Bird','Tsipouro','Mastiha']
    },
    {
      name:'Mati Sour', confidence:'normalized reconstruction', family:'Egg-white mezcal sour',
      intent:'A smoky electric-blue sour balancing mezcal, citrus, blue-raspberry lemonade, herbal liqueur, and an absinthe-marked blueberry.',
      specs:[['1.75 oz','Del Maguey Vida'],['0.75 oz','Triple Sec'],['0.75 oz','Fresh Lemon Juice'],['0.75 oz','Fruitful Blue Raspberry Lemonade'],['0.25 oz','Yellow Chartreuse'],['1','Egg White'],['2 dashes','Grapefruit Bitters']],
      method:'Dry shake, shake again with ice, and fine-strain.', glassware:'Coupe', garnish:'Floating lemon wheel with one blueberry; add a few drops of absinthe to the blueberry',
      vector:[6,4,9,7,3,0,7],
      functions:[['Mezcal','Smoky Foundation'],['Triple Sec','Orange Sweetener'],['Fresh Lemon Juice','Acid Structure'],['Blue Raspberry Lemonade','Fruit / Color / Sweet-Tart Modifier'],['Yellow Chartreuse','Herbal Bridge'],['Egg White','Texture / Foam'],['Grapefruit Bitters + Absinthe','Bitter-Aromatic Finish']],
      progression:[['Aroma',['absinthe','grapefruit','smoke']],['Attack',['lemon','blue raspberry','orange']],['Midpalate',['mezcal smoke','Chartreuse herbs','silky foam']],['Finish',['grapefruit bitterness','anise','smoke']]],
      tags:['house original','mezcal','blue raspberry','egg white','Mati']
    },
    {
      name:'Vieux Lýkos', confidence:'normalized reconstruction', family:'Vieux Carré riff',
      intent:'A Greek Vieux Carré built around Metaxa and bourbon with vermouth, herbal sweetness, aromatic bitters, and an ouzo-scented finish.',
      specs:[['0.75 oz','Metaxa 12 Star'],['0.75 oz','Knob Creek Bourbon'],['0.75 oz','Vermouth di Torino'],['0.25 oz','Foro Amaro'],['2 dashes','Peychaud’s Bitters'],['1 dash','Angostura Bitters']],
      method:'Stir with ice and strain over a large cube.', glassware:'Double rocks', garnish:'Express lemon peel, add a couple drops of ouzo to the peel, and rest it on the cube',
      vector:[5,5,0,7,4,0,8],
      functions:[['Metaxa 12 Star','Dried-Fruit / Oak Foundation'],['Knob Creek Bourbon','Whiskey Structure'],['Vermouth di Torino','Wine Structure'],['Foro Amaro','Herbal Bridge / Benedictine Role'],['Peychaud’s + Angostura','Aromatic Spice'],['Ouzo','Anise Aromatic Finish']],
      progression:[['Aroma',['lemon oil','ouzo','oak']],['Attack',['Metaxa fruit','bourbon','vermouth sweetness']],['Midpalate',['herbs','spice','dried fruit']],['Finish',['anise','bitters','oak']]],
      tags:['house riff','Vieux Carré','Metaxa','bourbon','ouzo']
    },
    {
      name:'Hardcore Port', confidence:'normalized reconstruction', family:'Apple-brandy fortified-wine cocktail',
      intent:'A muscular applejack build pairing orchard fruit with orange liqueur, bittersweet aperitivo, fortified wine, and peach spice.',
      specs:[['2 oz','Starlight Applejack'],['0.5 oz','Bauchant'],['0.5 oz','Sarti'],['0.5 oz','Mavrodaphne'],['0.25 oz','Grand Marnier'],['2 dashes','Peach Bitters']],
      method:'Stir with ice and strain over a large cube.', glassware:'Double rocks', garnish:'Orange peel',
      vector:[7,5,1,4,5,0,8],
      functions:[['Applejack','Orchard Foundation'],['Bauchant + Grand Marnier','Orange / Cognac Bridge'],['Sarti','Bittersweet Fruit Modifier'],['Mavrodaphne','Fortified-Wine Depth'],['Peach Bitters','Stone-Fruit Spice']],
      progression:[['Aroma',['apple skin','orange oil','peach']],['Attack',['applejack','orange sweetness','dark fruit']],['Midpalate',['Mavrodaphne raisin','Sarti bitterness','Cognac-orange']],['Finish',['oak','peach spice','fortified-wine richness']]],
      tags:['house original','applejack','Mavrodaphne','Sarti','fortified wine']
    },
    {
      name:"Siren's Call", confidence:'normalized reconstruction', family:'Lychee tropical sour',
      intent:'A restrained lychee cocktail where soursop and lemon keep vanilla and floral sweetness from turning candy-like.',
      specs:[['1.5 oz','Vanilla Vodka'],['0.75 oz','Lychee Liqueur'],['1 oz','Soursop Nectar'],['0.5 oz','Lychee Syrup'],['0.5 oz','Fresh Lemon Juice'],['tiny float','Grenadine']],
      method:'Shake everything except grenadine with ice, fine-strain, and finish with a tiny grenadine float.', glassware:'Coupe', garnish:'Lychee',
      vector:[8,0,6,0,0,0,7],
      functions:[['Vanilla Vodka','Foundation'],['Lychee Liqueur','Floral-Fruit Modifier'],['Soursop Nectar','Tropical Body / Acid Bridge'],['Lychee Syrup','Sweetener'],['Fresh Lemon Juice','Acid Structure'],['Grenadine','Color / Red-Fruit Accent']],
      progression:[['Aroma',['lychee','vanilla','soft tropical fruit']],['Attack',['lychee','lemon','soursop']],['Midpalate',['creamy tropical fruit','vanilla','floral sweetness']],['Finish',['grenadine','pear-like lychee','citrus']]],
      tags:['house original','lychee','soursop','vanilla','Siren']
    },
    {
      name:'The Papyrus', confidence:'normalized reconstruction', family:'Paper Plane riff',
      intent:'A Mediterranean Paper Plane riff using Metaxa and limoncello to add dried-fruit and candied-lemon character without abandoning sour balance.',
      specs:[['0.75 oz','Metaxa'],['0.75 oz','Aperol'],['0.75 oz','Amaro Nonino'],['0.5 oz','Limoncello'],['0.5 oz','Fresh Lemon Juice']],
      method:'Shake with ice and fine-strain.', glassware:'Coupe', garnish:'Lemon peel',
      vector:[6,6,7,5,2,0,5],
      functions:[['Metaxa','Greek Brandy Foundation'],['Aperol','Bittersweet Citrus Structure'],['Amaro Nonino','Amaro Bridge'],['Limoncello','Candied Lemon Sweetener'],['Fresh Lemon Juice','Acid Structure']],
      progression:[['Aroma',['lemon oil','orange','Metaxa fruit']],['Attack',['lemon','Aperol orange','limoncello']],['Midpalate',['Nonino herbs','dried fruit','bittersweet citrus']],['Finish',['candied lemon','amaro bitterness','warm grape spirit']]],
      tags:['house riff','Paper Plane','Metaxa','limoncello','amaro']
    },
    {
      name:'Dirty Frappe', confidence:'normalized reconstruction', family:'Coffee dessert cocktail',
      intent:'A Greek-café-inspired dessert martini built around Nescafé frappé texture rather than espresso-machine crema.',
      specs:[['1.5 oz','Vanilla Vodka'],['0.75 oz','Coffee Liqueur'],['1.5 oz','Concentrated Nescafé Frappé'],['0.25 oz','Simple Syrup'],['2 dashes','Chocolate Bitters'],['1 drop','Saline']],
      method:'Wand-whip the concentrated Nescafé to develop foam. Combine with the remaining ingredients and chill thoroughly; strain while preserving the frappé head.', glassware:'Coupe', garnish:'Coffee beans or light cocoa dust',
      vector:[8,4,0,0,4,1,8],
      functions:[['Vanilla Vodka','Foundation'],['Coffee Liqueur','Coffee Sweetener'],['Nescafé Frappé','Coffee Structure / Foam'],['Simple Syrup','Balance'],['Chocolate Bitters','Roasted Accent'],['Saline','Amplifier']],
      progression:[['Aroma',['coffee foam','vanilla','cocoa']],['Attack',['sweet coffee','vanilla']],['Midpalate',['roast','coffee liqueur','dense foam']],['Finish',['chocolate bitterness','saline coffee','vanilla']]],
      tags:['house original','dessert','Nescafé','frappé','coffee']
    },
    {
      name:'Aegean Velvet', confidence:'normalized reconstruction', family:'Spirit-forward dessert cocktail',
      intent:'A dark-fruit Greek after-dinner cocktail built around Metaxa, Nonino, açaí, vermouth, bitters, and a slowly seasoning feta-brine cube.',
      specs:[['1.5 oz','Metaxa'],['0.5 oz','Amaro Nonino'],['0.5 oz','Cadilla Açaí Liqueur'],['0.75 oz','Vermouth di Torino'],['1 dash','JUJU BEE Tincture'],['1 dash','Orange Bitters'],['1 large cube','Feta-Brine Ice']],
      method:'Stir the liquid ingredients with ice and strain over the feta-brine cube.', glassware:'Double rocks', garnish:'None; the cube is the dynamic garnish',
      vector:[7,5,1,6,4,4,8],
      functions:[['Metaxa','Foundation'],['Amaro Nonino','Bittersweet Herbal Bridge'],['Açaí Liqueur','Dark-Fruit Modifier'],['Vermouth di Torino','Wine Structure'],['JUJU BEE + Orange Bitters','Aromatic Finish'],['Feta-Brine Ice','Dynamic Saline Modifier']],
      progression:[['Aroma',['orange','dark berry','dried fruit']],['Attack',['Metaxa','açaí','vermouth']],['Midpalate',['Nonino herbs','dark fruit','honey-date accent']],['Finish',['increasing salinity','orange bitters','dried fruit','lactic umami']]],
      tags:['house original','dessert','Metaxa','açaí','feta brine']
    },
    {
      name:'Baklava Alexander', confidence:'normalized reconstruction', family:'Alexander / cream cocktail',
      intent:'A Greek dessert Alexander translating baklava into brandy, cacao, Mastiha, pistachio, honey, cream, and warm spice.',
      specs:[['1.5 oz','Metaxa 7 Star'],['0.5 oz','Dark Crème de Cacao'],['0.5 oz','Mastiha Antica'],['0.5 oz','Pistachio Orgeat'],['0.75 oz','Heavy Cream'],['0.25 oz','Thyme Blossom Honey Syrup'],['1 dash','Orange Bitters'],['1 drop','Saline']],
      method:'Shake hard with ice and double-strain.', glassware:'Coupe', garnish:'Ground pistachio and grated cinnamon; optional light honey drizzle',
      vector:[9,2,0,5,3,0,10],
      functions:[['Metaxa','Brandy Foundation'],['Crème de Cacao','Chocolate Modifier'],['Mastiha','Resinous Greek Bridge'],['Pistachio Orgeat','Nut Sweetener / Texture'],['Heavy Cream','Body'],['Thyme-Honey Syrup','Baklava Sweetener / Herbal Bridge'],['Orange Bitters + Saline','Contrast']],
      progression:[['Aroma',['cinnamon','pistachio','honey','cacao']],['Attack',['cream','pistachio','Metaxa fruit']],['Midpalate',['cacao','Mastiha','thyme honey']],['Finish',['warm spice','orange','nutty sweetness']]],
      tags:['house original','dessert','Alexander','baklava','Metaxa']
    },
    {
      name:'Mastiha Affogato', confidence:'locked working spec', family:'Affogato / dessert service',
      intent:'A tableside Greek affogato where Mastiha replaces the usual spirit accent and resinous sweetness meets hot espresso and vanilla gelato.',
      specs:[['1 oz','Mastiha Antica'],['double shot','Fresh Espresso'],['2 scoops','Vanilla Gelato']],
      method:'Place gelato in the serving glass and pour Mastiha over it. Serve the espresso alongside or pour tableside.', glassware:'Rocks glass or dessert coupe', garnish:'Crushed pistachio, orange zest, and a few flakes of sea salt',
      vector:[8,4,1,6,2,0,10],
      functions:[['Mastiha','Resinous Sweet Modifier'],['Espresso','Roasted Bitter Structure / Heat'],['Vanilla Gelato','Sweetness / Dairy Body / Temperature Contrast'],['Pistachio + Orange + Salt','Aromatic and Textural Finish']],
      progression:[['Aroma',['espresso','orange zest','mastic resin']],['Attack',['hot coffee','cold vanilla','Mastiha']],['Midpalate',['melting gelato','roast','resinous sweetness']],['Finish',['pistachio','sea salt','coffee bitterness']]],
      tags:['house original','dessert','affogato','Mastiha','espresso']
    },
    {
      name:"Father's Fig", confidence:'locked working spec', family:'Old Fashioned / spirit-forward fruit cocktail',
      intent:'A fig-and-feta Greek Old Fashioned combining Metaxa, Tsipouro, Mavrodaphne, fig, walnut spice, and a slowly seasoning feta-brine cube.',
      specs:[['1.5 oz','Metaxa 7 Star'],['0.5 oz','Tsipouro'],['0.5 oz','Mavrodaphne'],['0.25 oz','Fig Syrup or Fruitful Mission Fig'],['2 dashes','Black Walnut Bitters'],['1 drop','Saline'],['1 large cube','Clear ice with pea-sized feta piece and a few drops feta brine']],
      method:'Stir liquid ingredients with ice and strain over the prepared cube.', glassware:'Double rocks', garnish:'Expressed orange peel and dried fig on a pick; tiny rosemary sprig optional',
      vector:[7,4,1,3,5,5,9],
      functions:[['Metaxa','Aged Grape-Spirit Foundation'],['Tsipouro','Dry Grape-Spirit Lift'],['Mavrodaphne','Dark-Fruit Fortified-Wine Depth'],['Fig Syrup','Fruit Sweetener'],['Black Walnut Bitters','Nutty Bitter Spice'],['Saline + Feta-Brine Cube','Dynamic Saline / Umami Modifier']],
      progression:[['Aroma',['orange oil','fig','walnut','grape spirit']],['Attack',['Metaxa','fig','Mavrodaphne']],['Midpalate',['Tsipouro dryness','walnut spice','dark fruit']],['Finish',['growing feta salinity','fig','oak','umami']]],
      tags:['house original','fig','feta brine','Metaxa','Old Fashioned']
    },
    {
      name:'Awakening Minotaur', confidence:'normalized reconstruction', family:'Smoky tropical sour',
      intent:'A smoky, tropical Scotch cocktail where Islay peat meets Mastiha, falernum, pineapple, citrus, and a dark-fruit float.',
      specs:[['1.5 oz','Lagavulin 8'],['0.5 oz','Mastiha'],['0.5 oz','Velvet Falernum'],['1.5 oz','Pineapple Juice'],['0.5 oz','Fresh Lemon Juice'],['0.25 oz','Cherry Heering'],['0.25 oz','Mavrodaphne']],
      method:'Shake the first five ingredients with ice, strain over fresh ice, and float Cherry Heering and Mavrodaphne.', glassware:'Double rocks', garnish:'Smoked dehydrated pineapple',
      vector:[7,4,6,6,8,1,8],
      functions:[['Lagavulin 8','Smoky Foundation'],['Mastiha','Resinous Bridge'],['Velvet Falernum','Spiced Sweetener'],['Pineapple + Lemon','Tropical Body / Acid Structure'],['Cherry Heering + Mavrodaphne','Dark-Fruit Float / Finish']],
      progression:[['Aroma',['peat smoke','pineapple','mastic resin']],['Attack',['pineapple','falernum spice','lemon']],['Midpalate',['Lagavulin smoke','Mastiha','tropical fruit']],['Finish',['cherry','Mavrodaphne raisin','peat']]],
      tags:['house original','Lagavulin','smoky','pineapple','Mavrodaphne']
    },
    {
      name:"Athena's Bloom", confidence:'normalized reconstruction', family:'Egg-white floral sour',
      intent:'A floral pink-gin sour combining Lillet, lavender, lemon, and egg white with Peychaud’s as the final aromatic mark.',
      specs:[['1.5 oz','Pink Gin'],['0.75 oz','Lillet Blanc'],['0.5 oz','Lavender Syrup'],['0.75 oz','Fresh Lemon Juice'],['1','Egg White']],
      method:'Dry shake, shake again with ice, and fine-strain.', glassware:'Coupe', garnish:'Lavender sprig with a few Peychaud’s drops on the foam',
      vector:[6,2,8,6,0,0,7],
      functions:[['Pink Gin','Botanical Foundation'],['Lillet Blanc','Wine Structure'],['Lavender Syrup','Floral Sweetener'],['Fresh Lemon Juice','Acid Structure'],['Egg White','Texture / Foam'],['Peychaud’s','Aromatic Accent']],
      progression:[['Aroma',['lavender','Peychaud’s spice','gin botanicals']],['Attack',['lemon','floral sweetness']],['Midpalate',['pink gin','Lillet','silky foam']],['Finish',['lavender','anise-spice','dry citrus']]],
      tags:['house original','floral','pink gin','egg white','lavender']
    },
    {
      name:'Para-harma', confidence:'locked working spec', family:'Herbal Greek sour',
      intent:'A Hellenic high-aroma sour balancing dry Tsipouro with Yellow Chartreuse, bergamot, limoncello, falernum, honey-date tincture, and saline.',
      specs:[['1.5 oz','Tsipouro'],['0.75 oz','Yellow Chartreuse'],['0.5 oz','Italicus'],['0.75 oz','Limoncello'],['0.25 oz','Velvet Falernum'],['2 drops','JUJU BEE Tincture'],['1 drop','Saline']],
      method:'Shake hard with ice and double-strain.', glassware:'Nick & Nora or coupe', garnish:'Expressed lemon peel; flame rosemary beside the glass; optional cinnamon',
      vector:[7,4,3,10,3,0,7],
      functions:[['Tsipouro','Dry Grape-Spirit Foundation'],['Yellow Chartreuse','Herbal Engine'],['Italicus','Bergamot Bridge'],['Limoncello','Lemon Sweetener'],['Velvet Falernum','Spice Modifier'],['JUJU BEE','Honey-Date Aromatic Accent'],['Saline','Amplifier']],
      progression:[['Aroma',['rosemary','bergamot','alpine herbs']],['Attack',['limoncello','Chartreuse herbs','Tsipouro']],['Midpalate',['Italicus','falernum spice','grape spirit']],['Finish',['honey-date accent','saline','herbal persistence']]],
      tags:['house original','Tsipouro','Chartreuse','Italicus','Hellenic']
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
    encodedBatch2:RECORDS.map(r => r.name)
  };
})();
