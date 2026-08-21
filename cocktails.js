window.FLAVOR_ATLAS_DATA.cocktails = [
  {
    id: 'FA-0001',
    name: 'The Philosopher',
    style: 'Savory',
    subtitle: 'Umami cocktail. Earthy, herbal, and mysterious.',
    intent: 'A contemplative, savory, umami-driven cocktail designed to evolve gradually in the glass.',
    tags: ['umami', 'earthy', 'herbal', 'spirit-forward', 'evolving'],
    specs: [
      ['2 oz', 'Veda Mushroom Liqueur'],
      ['3/4 oz', 'Vermouth di Torino'],
      ['1/4 oz', 'Amaro Nonino'],
      ['2 dashes', 'JUJU BEE tincture'],
      ['1 large cube', 'Feta brine + lactic acid ice']
    ],
    method: 'Stir the liquid ingredients with ice until chilled and appropriately diluted. Strain over the prepared feta-brine/lactic-acid cube.',
    glassware: 'Double rocks',
    garnish: 'None; the cube is the visual and sensory event.',
    vector: { Sweetness: 4, Bitterness: 5, Acidity: 2, Herbal: 8, Earthiness: 10, Umami: 10, Body: 7 },
    functions: [
      ['Veda Mushroom Liqueur', 'Foundation'],
      ['Vermouth di Torino', 'Structure'],
      ['Amaro Nonino', 'Bridge'],
      ['JUJU BEE', 'Aromatic Accent / Finish'],
      ['Feta Brine + Lactic Acid Ice', 'Dynamic Modifier']
    ],
    progression: [
      { stage: 'First Sip', notes: ['earth', 'mushroom', 'herbal complexity', 'gentle bitterness'], signal: 'Salinity 1/10' },
      { stage: 'Middle', notes: ['orange', 'alpine herbs', 'aromatic lift', 'growing salinity'], signal: 'Salinity 3/10' },
      { stage: 'Final Sips', notes: ['salinity', 'lactic character', 'deep umami', 'fermented complexity'], signal: 'Salinity 5/10' }
    ]
  },
  {
    id: 'FA-0002',
    name: 'Greek Blonde',
    style: 'Floral',
    subtitle: 'Bright gin, bergamot, flowers, and grapefruit.',
    intent: 'A long, aromatic sour that layers Mediterranean botanicals with white wine, bergamot, elderflower and pink grapefruit.',
    tags: ['gin', 'floral', 'bergamot', 'grapefruit', 'citrus'],
    specs: [
      ['1 1/2 oz', 'Stray Dog Greek Gin'],
      ['2 oz', 'Lillet Blanc'],
      ['1/2 oz', 'Italicus'],
      ['3/4 oz', 'Elderflower liqueur'],
      ['1 oz', 'Pink grapefruit juice'],
      ['1/2 oz', 'Fresh lemon juice'],
      ['1-2 dashes', 'Umeshu bitters'],
      ['1 drop', 'Saline']
    ],
    method: 'Shake with ice and fine-strain.',
    glassware: 'Coupe',
    garnish: 'Long grapefruit twist.',
    vector: { Sweetness: 6, Bitterness: 3, Acidity: 7, Herbal: 6, Earthiness: 1, Umami: 0, Body: 5 },
    functions: [
      ['Stray Dog Greek Gin', 'Foundation'],
      ['Lillet Blanc', 'Wine Structure'],
      ['Italicus', 'Bergamot Bridge'],
      ['Elderflower liqueur', 'Floral Modifier / Sweetener'],
      ['Pink grapefruit juice', 'Acid + Bitter Structure'],
      ['Fresh lemon juice', 'Brightener'],
      ['Umeshu bitters + saline', 'Finish / Seasoning']
    ],
    progression: [
      { stage: 'Aroma', notes: ['grapefruit oil', 'white flowers', 'bergamot'] },
      { stage: 'Midpalate', notes: ['gin botanicals', 'Lillet', 'elderflower', 'juicy grapefruit'] },
      { stage: 'Finish', notes: ['citrus bitterness', 'plum-like bitters', 'saline lift'] }
    ]
  },
  {
    id: 'FA-0003',
    name: 'Aegean Mist',
    style: 'Fresh',
    subtitle: 'Cool cucumber, Greek gin, elderflower, and lime.',
    intent: 'A lean, cooling gin sour built around cucumber freshness, floral lift, and a precise saline finish.',
    tags: ['gin', 'cucumber', 'elderflower', 'lime', 'fresh'],
    specs: [
      ['1 1/2 oz', 'Stray Dog Greek Gin'],
      ['1 oz', 'Cucumber juice'],
      ['1/2 oz', 'Elderflower liqueur'],
      ['3/4 oz', 'Fresh lime juice'],
      ['1/4 oz', 'Simple syrup'],
      ['1 drop', 'Saline']
    ],
    method: 'Shake hard with ice and fine-strain.',
    glassware: 'Coupe or martini glass',
    garnish: 'None specified.',
    vector: { Sweetness: 4, Bitterness: 1, Acidity: 8, Herbal: 5, Earthiness: 1, Umami: 0, Body: 3 },
    functions: [
      ['Stray Dog Greek Gin', 'Foundation'],
      ['Cucumber juice', 'Freshness / Texture'],
      ['Elderflower liqueur', 'Aromatic Bridge'],
      ['Fresh lime juice', 'Acid Structure'],
      ['Simple syrup', 'Balance'],
      ['Saline', 'Amplifier']
    ],
    progression: [
      { stage: 'Aroma', notes: ['cucumber', 'juniper', 'white flowers'] },
      { stage: 'Midpalate', notes: ['cool green freshness', 'lime', 'soft sweetness'] },
      { stage: 'Finish', notes: ['dry gin botanicals', 'saline snap'] }
    ]
  },
  {
    id: 'FA-0004',
    name: "Cupid's Cloud",
    style: 'Citrus',
    subtitle: 'A white-cosmo architecture with berry vodka and bergamot.',
    intent: 'A polished, aromatic Cosmo riff that replaces cranberry weight with berry vodka, bergamot and bright lime.',
    tags: ['vodka', 'bergamot', 'lime', 'berry', 'cosmo'],
    specs: [
      ['1 1/2 oz', 'Grey Goose Berry Rouge'],
      ['1 oz', 'Italicus'],
      ['3/4 oz', 'Triple sec'],
      ['3/4 oz', 'Fresh lime juice'],
      ['1 drop', 'Saline']
    ],
    method: 'Shake hard with ice and fine-strain.',
    glassware: 'Coupe',
    garnish: 'Flamed short lime twist and cranberry pick.',
    vector: { Sweetness: 6, Bitterness: 2, Acidity: 8, Herbal: 3, Earthiness: 0, Umami: 0, Body: 4 },
    functions: [
      ['Grey Goose Berry Rouge', 'Foundation / Fruit Aroma'],
      ['Italicus', 'Bergamot Modifier'],
      ['Triple sec', 'Orange Bridge / Sweetener'],
      ['Fresh lime juice', 'Acid Structure'],
      ['Saline', 'Amplifier']
    ],
    progression: [
      { stage: 'Aroma', notes: ['lime oil', 'bergamot', 'red berry'] },
      { stage: 'Midpalate', notes: ['orange', 'berry', 'bright citrus'] },
      { stage: 'Finish', notes: ['clean acidity', 'light floral bitterness'] }
    ]
  },
  {
    id: 'FA-0005',
    name: 'Capuchin',
    style: 'Citrus',
    subtitle: 'An off-white Cosmo with Monkey 47, bergamot, and amaro.',
    intent: 'A drier, more botanical Cosmo riff where gin, aromatized wine and amaro create complexity beneath the citrus.',
    tags: ['gin', 'bergamot', 'amaro', 'lemon', 'cosmo'],
    specs: [
      ['1 1/2 oz', 'Monkey 47 Gin'],
      ['3/4 oz', 'Italicus'],
      ['1/2 oz', 'Cocchi Americano'],
      ['1/4 oz', 'Amaro Montenegro'],
      ['1/4 oz', 'Triple sec'],
      ['3/4 oz', 'Fresh lemon juice'],
      ['1 dash', 'Orange bitters'],
      ['optional', 'Saline']
    ],
    method: 'Shake with ice and fine-strain.',
    glassware: 'Coupe',
    garnish: 'None specified.',
    vector: { Sweetness: 5, Bitterness: 4, Acidity: 8, Herbal: 7, Earthiness: 2, Umami: 0, Body: 4 },
    functions: [
      ['Monkey 47 Gin', 'Foundation'],
      ['Italicus', 'Bergamot Bridge'],
      ['Cocchi Americano', 'Wine Structure / Bitter Lift'],
      ['Amaro Montenegro', 'Herbal Depth'],
      ['Triple sec', 'Orange Sweetener'],
      ['Fresh lemon juice', 'Acid Structure'],
      ['Orange bitters + saline', 'Finish / Seasoning']
    ],
    progression: [
      { stage: 'Aroma', notes: ['juniper', 'bergamot', 'orange peel'] },
      { stage: 'Midpalate', notes: ['lemon', 'white wine', 'herbal amaro'] },
      { stage: 'Finish', notes: ['dry botanicals', 'gentle quinine-like bitterness'] }
    ]
  },
  {
    id: 'FA-0006',
    name: 'Metaxerac',
    style: 'Spirit-Forward',
    subtitle: 'A Greek Sazerac built on Metaxa, honey, Peychaud’s, and ouzo.',
    intent: 'A compact, aromatic nightcap that translates Sazerac structure into Greek grape spirit, honey and anise.',
    tags: ['Metaxa', 'Sazerac', 'anise', 'honey', 'spirit-forward'],
    specs: [
      ['2 oz', 'Metaxa 7 or 12 Star'],
      ['1/4 oz', 'Honey syrup'],
      ['2 dashes', "Peychaud's bitters"],
      ['1 dash', 'Mandarin orange bitters'],
      ['rinse', 'Ouzo']
    ],
    method: 'Rinse a chilled rocks glass with ouzo. Stir the remaining ingredients with ice and strain into the prepared glass.',
    glassware: 'Rocks glass, served neat',
    garnish: 'Express lemon peel and discard.',
    vector: { Sweetness: 4, Bitterness: 4, Acidity: 0, Herbal: 6, Earthiness: 3, Umami: 0, Body: 7 },
    functions: [
      ['Metaxa', 'Foundation'],
      ['Honey syrup', 'Sweetener / Texture'],
      ["Peychaud's bitters", 'Bittering / Spice'],
      ['Mandarin orange bitters', 'Citrus Lift'],
      ['Ouzo rinse', 'Aromatic Frame']
    ],
    progression: [
      { stage: 'Aroma', notes: ['anise', 'lemon oil', 'orange spice'] },
      { stage: 'Midpalate', notes: ['dried fruit', 'grape spirit', 'honey'] },
      { stage: 'Finish', notes: ['Peychaud’s spice', 'dry anise', 'oak'] }
    ]
  },
  {
    id: 'FA-0007',
    name: 'White Boulevardier',
    style: 'Spirit-Forward',
    subtitle: 'Toki, Cocchi Americano, and Italicus in equal parts.',
    intent: 'A bright, bitter-aromatic whiskey drink that trades red vermouth and Campari weight for bergamot, quinine and grapefruit.',
    tags: ['whisky', 'bergamot', 'grapefruit', 'bitter', 'stirred'],
    specs: [
      ['1 oz', 'Suntory Toki'],
      ['1 oz', 'Cocchi Americano'],
      ['1 oz', 'Italicus'],
      ['2 dashes', 'Grapefruit bitters'],
      ['1 dash', 'JUJU BEE tincture']
    ],
    method: 'Stir with ice until chilled and appropriately diluted. Strain.',
    glassware: 'Nick & Nora or coupe',
    garnish: 'None specified.',
    vector: { Sweetness: 5, Bitterness: 6, Acidity: 2, Herbal: 5, Earthiness: 2, Umami: 0, Body: 5 },
    functions: [
      ['Suntory Toki', 'Foundation'],
      ['Cocchi Americano', 'Bitter Wine Structure'],
      ['Italicus', 'Bergamot Modifier'],
      ['Grapefruit bitters', 'Bitter Citrus Accent'],
      ['JUJU BEE', 'Aromatic Finish']
    ],
    progression: [
      { stage: 'Aroma', notes: ['bergamot', 'grapefruit peel', 'honeyed dried fruit'] },
      { stage: 'Midpalate', notes: ['light whisky', 'white wine', 'bittersweet citrus'] },
      { stage: 'Finish', notes: ['quinine', 'grapefruit bitterness', 'dry grain'] }
    ]
  }
];
