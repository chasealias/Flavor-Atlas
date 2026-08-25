// Flavor Atlas V0.5.1 — House Canon encoding batch 1.
// House recipes are reconstructed from the user's working archive.
// Flavor vectors, functions, family classification, and progression are Flavor Atlas analysis.
(() => {
  const DATA = window.FLAVOR_ATLAS_DATA;
  if (!DATA?.cocktails) return;

  const METRICS = ['Sweetness','Bitterness','Acidity','Herbal','Earthiness','Umami','Body'];
  const V = values => Object.fromEntries(METRICS.map((key, i) => [key, values[i]]));
  const P = rows => rows.map(([stage, notes]) => ({ stage, notes }));

  const RECORDS = [
    {
      name: 'Prickly Poet',
      family: 'Egg-white sour / fruit sour',
      intent: 'A lush Greek-gin sour balancing prickly pear, citrus, vanilla-herbal Galliano, and a cheesecake-like aromatic accent.',
      specs: [
        ['1.75 oz','Stray Dog Greek Gin'],
        ['0.5 oz','Galliano'],
        ['0.75 oz','Lillet Blanc'],
        ['1 oz','Fresh Lemon Juice'],
        ['0.75 oz','Prickly Pear'],
        ['1 oz','Orange Juice'],
        ['1','Egg White'],
        ['0.5 bar spoon','Cream Cheese Tincture'],
        ['3–4 drops','Black Cherry Tincture']
      ],
      method: 'Dry shake, shake again with ice, then double-strain over a large cube.',
      glassware: 'Double rocks',
      garnish: 'Orange slice inside the glass',
      vector: [7,1,8,4,1,0,7],
      functions: [
        ['Stray Dog Greek Gin','Botanical Foundation'],
        ['Galliano','Vanilla-Herbal Modifier'],
        ['Lillet Blanc','Aromatized-Wine Bridge'],
        ['Fresh Lemon Juice','Acid Structure'],
        ['Prickly Pear + Orange Juice','Fruit Body / Sweet-Tart Structure'],
        ['Egg White','Texture / Foam'],
        ['Cream Cheese Tincture','Lactic Dessert Accent'],
        ['Black Cherry Tincture','Dark-Fruit Aromatic Accent']
      ],
      progression: [
        ['Aroma',['orange','black cherry','vanilla herbs','Greek gin botanicals']],
        ['Attack',['prickly pear','lemon brightness','soft orange']],
        ['Midpalate',['gin botanicals','Galliano','silky egg-white texture','Lillet']],
        ['Finish',['cream-cheese tang','dark cherry','dry citrus','herbal vanilla']]
      ],
      tags: ['house original','Greek gin','prickly pear','egg white','fruit sour']
    },
    {
      name: "Pandora's Box",
      family: 'Lychee fruit sour',
      intent: 'A vivid lychee and prickly-pear sour with vanilla, saline lift, ume aromatics, and a controlled grenadine finish.',
      specs: [
        ['2 oz','Vanilla Vodka'],
        ['1 oz','Soho Lychee Liqueur'],
        ['0.5 oz','Fresh Lemon Juice'],
        ['1 oz','Prickly Pear'],
        ['1 drop','Saline'],
        ['2 drops','Umeshu Tincture'],
        ['small float','Grenadine']
      ],
      method: 'Shake everything except grenadine with ice, strain, then add a small grenadine float.',
      glassware: 'Coupe',
      garnish: 'Cherry',
      vector: [8,0,6,1,0,0,5],
      functions: [
        ['Vanilla Vodka','Foundation / Vanilla Frame'],
        ['Soho Lychee Liqueur','Floral-Fruit Modifier / Sweetener'],
        ['Fresh Lemon Juice','Acid Structure'],
        ['Prickly Pear','Fruit Body / Color'],
        ['Saline','Flavor Amplifier'],
        ['Umeshu Tincture','Stone-Fruit Aromatic Accent'],
        ['Grenadine','Red-Fruit Finish / Visual Layer']
      ],
      progression: [
        ['Aroma',['lychee','vanilla','ume']],
        ['Attack',['prickly pear','sweet lychee','lemon']],
        ['Midpalate',['vanilla vodka','floral fruit','saline lift']],
        ['Finish',['grenadine','stone fruit','soft citrus']]
      ],
      tags: ['house original','lychee','prickly pear','vanilla','fruit sour']
    },
    {
      name: 'Salted Watermelon Smash',
      family: 'Fruit smash / sour',
      intent: 'A juicy Tsipouro-driven watermelon drink sharpened by lemon, peach, pineapple, bitters, and deliberate salinity.',
      specs: [
        ['1.5 oz','Tsipouro'],
        ['0.75 oz','Peach Schnapps'],
        ['0.75 oz','Pineapple Syrup'],
        ['0.5 oz','Fresh Lemon Juice'],
        ['1 oz','Watermelon'],
        ['2 drops','Cherry Bitters'],
        ['2 drops','Saline']
      ],
      method: 'Shake with ice and strain over fresh ice.',
      glassware: 'Rocks',
      garnish: 'Salt-sugar rim; no additional garnish locked in the working archive',
      vector: [8,1,6,1,0,0,6],
      functions: [
        ['Tsipouro','Grape-Spirit Foundation'],
        ['Peach Schnapps','Stone-Fruit Sweetener'],
        ['Pineapple Syrup','Tropical Sweetener / Acid Bridge'],
        ['Fresh Lemon Juice','Acid Structure'],
        ['Watermelon','Fresh Fruit Body'],
        ['Cherry Bitters','Fruit-Spice Accent'],
        ['Saline + Salt-Sugar Rim','Amplifier / Contrast']
      ],
      progression: [
        ['Aroma',['watermelon','peach','grape spirit']],
        ['Attack',['salted watermelon','pineapple sweetness','lemon']],
        ['Midpalate',['Tsipouro','peach','juicy fruit']],
        ['Finish',['saline contrast','cherry spice','dry grape spirit']]
      ],
      tags: ['house original','Tsipouro','watermelon','saline','fruit smash']
    },
    {
      name: 'Stray Dog Greek Gin Fizz',
      family: 'Ramos-style cream fizz',
      intent: 'A Greek-gin Ramos riff using Mastiha, orange blossom, cream, citrus, and slow soda for a resinous Mediterranean lift.',
      specs: [
        ['1.5 oz','Stray Dog Greek Gin'],
        ['0.5 oz','Mastiha'],
        ['0.5 oz','Fresh Lemon Juice'],
        ['0.5 oz','Fresh Lime Juice'],
        ['0.75 oz','Simple Syrup'],
        ['1 oz','Heavy Cream'],
        ['1','Egg White'],
        ['3–4 drops','Orange Blossom Water'],
        ['1 drop','Saline'],
        ['top','Soda Water']
      ],
      method: 'Dry shake, shake hard with ice, strain into a highball, then slowly add soda to raise the foam.',
      glassware: 'Highball',
      garnish: 'None recorded',
      vector: [7,0,7,6,1,0,9],
      functions: [
        ['Stray Dog Greek Gin','Botanical Foundation'],
        ['Mastiha','Resinous Herbal Modifier'],
        ['Lemon + Lime','Acid Structure'],
        ['Simple Syrup','Sweetener / Balance'],
        ['Heavy Cream + Egg White','Body / Emulsion / Foam'],
        ['Orange Blossom Water','Floral Aromatic Signature'],
        ['Saline','Flavor Amplifier'],
        ['Soda Water','Lift / Length / Foam Rise']
      ],
      progression: [
        ['Aroma',['orange blossom','mastic resin','gin botanicals']],
        ['Attack',['silky citrus','sweet cream','floral lift']],
        ['Midpalate',['Mastiha','Greek gin','dense foam']],
        ['Finish',['lemon-lime','resin','saline snap','effervescence']]
      ],
      tags: ['house original','Greek gin','Mastiha','Ramos fizz','cream fizz']
    },
    {
      name: 'Glazed Carrot Crusta',
      family: 'Crusta / savory-sweet brandy sour',
      intent: 'A carrot-forward Cognac build using amaro and white amaretto to turn glazed-carrot flavors into a structured cocktail.',
      specs: [
        ['0.75 oz','Carrot Purée with Blanco Vermouth'],
        ['0.75 oz','Cognac'],
        ['0.75 oz','Montenegro'],
        ['0.75 oz','Opera White Amaretto'],
        ['optional 2 drops','Browned Butter Tincture']
      ],
      method: 'Shake with ice and fine-strain. Final service ritual remains house-archive rather than source-verified.',
      glassware: 'Stemmed cocktail glass',
      garnish: 'Not locked in the working archive',
      vector: [7,4,2,6,5,2,8],
      functions: [
        ['Carrot Purée + Blanco Vermouth','Vegetal Body / Wine Structure'],
        ['Cognac','Fruit-and-Oak Foundation'],
        ['Montenegro','Bittersweet Herbal Bridge'],
        ['Opera White Amaretto','Nutty Sweetener'],
        ['Browned Butter Tincture','Optional Maillard / Savory Accent']
      ],
      progression: [
        ['Aroma',['carrot','orange herbs','almond','optional browned butter']],
        ['Attack',['sweet carrot','Cognac fruit','amaretto']],
        ['Midpalate',['Montenegro herbs','vermouth','vegetal body']],
        ['Finish',['oak','almond','bitter orange','savory browned-butter echo']]
      ],
      tags: ['house original','carrot','Cognac','Montenegro','savory-sweet']
    }
  ];

  RECORDS.forEach(r => {
    const c = DATA.cocktails.find(item => item.name === r.name);
    if (!c) return;
    Object.assign(c, {
      collection: 'House Archive',
      source: 'Flavor Atlas working archive',
      recipeProvenance: 'House recipe reconstructed from prior working spec',
      analysisSource: 'Flavor Atlas',
      recordStatus: 'encoded',
      family: r.family,
      intent: r.intent,
      specs: r.specs,
      method: r.method,
      glassware: r.glassware,
      garnish: r.garnish,
      vector: V(r.vector),
      functions: r.functions,
      progression: P(r.progression),
      tags: [...new Set([...(c.tags || []), ...r.tags])]
    });
  });

  DATA.houseCanon = {
    ...(DATA.houseCanon || {}),
    version: '0.5.1',
    encodedBatch1: RECORDS.map(r => r.name)
  };
})();
