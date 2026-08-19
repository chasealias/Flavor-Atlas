window.FLAVOR_ATLAS_DATA = {
  ingredients: [
    {
      id: "ING-0001",
      name: "Veda Mushroom Liqueur",
      category: "Liqueur",
      region: "United States",
      roles: ["Foundation", "Umami Source"],
      flavors: ["mushroom", "earthy", "savory", "umami"],
      aroma: ["forest floor", "dried mushroom"],
      texture: ["round", "silky"],
      vector: { Sweetness: 5, Bitterness: 2, Acidity: 1, Herbal: 3, Earthiness: 10, Umami: 10, Body: 7 },
      notes: "Primary earthy and savory engine of The Philosopher."
    },
    {
      id: "ING-0002",
      name: "Vermouth di Torino",
      category: "Fortified Wine",
      region: "Piedmont, Italy",
      roles: ["Structure", "Modifier"],
      flavors: ["herbal", "spice", "wine", "bittersweet"],
      aroma: ["botanical", "warm spice"],
      texture: ["supple"],
      vector: { Sweetness: 6, Bitterness: 4, Acidity: 3, Herbal: 8, Earthiness: 3, Umami: 2, Body: 5 },
      notes: "Provides botanical architecture and wine-driven structure."
    },
    {
      id: "ING-0003",
      name: "Amaro Nonino",
      category: "Amaro",
      region: "Friuli, Italy",
      roles: ["Bridge", "Modifier"],
      flavors: ["orange", "alpine herbs", "bittersweet", "spice"],
      aroma: ["citrus peel", "herbs"],
      texture: ["silky"],
      vector: { Sweetness: 6, Bitterness: 5, Acidity: 2, Herbal: 7, Earthiness: 3, Umami: 1, Body: 5 },
      notes: "Connects earthy mushroom tones to herbal vermouth while lifting the drink aromatically."
    },
    {
      id: "ING-0004",
      name: "JUJU BEE",
      category: "Tincture",
      region: "Bar Wolf",
      roles: ["Aromatic", "Finish", "Accent"],
      flavors: ["red date", "raw honey", "dried fruit"],
      aroma: ["honey", "jujube"],
      texture: ["negligible dose"],
      vector: { Sweetness: 4, Bitterness: 1, Acidity: 0, Herbal: 1, Earthiness: 4, Umami: 1, Body: 1 },
      notes: "A finishing tincture that extends aroma and dark-fruit complexity without changing the drink's mass."
    },
    {
      id: "ING-0005",
      name: "Feta Brine + Lactic Acid Ice",
      category: "Dynamic Modifier",
      region: "Technique",
      roles: ["Dynamic Modifier", "Dilution Element", "Amplifier"],
      flavors: ["saline", "lactic", "fermented", "umami"],
      aroma: ["fresh dairy", "fermentation"],
      texture: ["cold", "diluting"],
      vector: { Sweetness: 0, Bitterness: 0, Acidity: 5, Herbal: 0, Earthiness: 2, Umami: 8, Body: 2 },
      notes: "An active ice element that changes salinity, acidity, umami and dilution over time."
    },
    {
      id: "ING-0006",
      name: "Mavrodaphne",
      category: "Fortified Wine",
      region: "Greece",
      roles: ["Modifier", "Sweetener", "Finish"],
      flavors: ["raisin", "fig", "dark fruit", "cocoa"],
      aroma: ["dried fruit", "spice"],
      texture: ["rich", "round"],
      vector: { Sweetness: 8, Bitterness: 2, Acidity: 3, Herbal: 1, Earthiness: 4, Umami: 1, Body: 7 },
      notes: "A Greek fortified wine useful for dark-fruit depth, oxidation and dessert-like finish."
    },
    {
      id: "ING-0007",
      name: "Lactic Acid",
      category: "Acid",
      region: "Technique",
      roles: ["Brightener", "Amplifier"],
      flavors: ["tangy", "dairy-like acidity", "fermented"],
      aroma: ["neutral"],
      texture: ["lean"],
      vector: { Sweetness: 0, Bitterness: 0, Acidity: 10, Herbal: 0, Earthiness: 0, Umami: 1, Body: 0 },
      notes: "A softer, fermentation-adjacent acid that can sharpen lactic and cultured flavors."
    },
    {
      id: "ING-0008",
      name: "Honey Syrup",
      category: "Sweetener",
      region: "Culinary",
      roles: ["Sweetener", "Bridge", "Textural Element"],
      flavors: ["honey", "floral", "round sweetness"],
      aroma: ["floral", "beeswax"],
      texture: ["viscous", "soft"],
      vector: { Sweetness: 10, Bitterness: 0, Acidity: 0, Herbal: 1, Earthiness: 2, Umami: 0, Body: 6 },
      notes: "Softens bitterness and creates textural continuity between sharp and earthy components."
    }
  ],
  cocktails: [
    {
      id: "FA-0001",
      name: "The Philosopher",
      subtitle: "Umami cocktail. Earthy, herbal, and mysterious.",
      intent: "A contemplative, savory, umami-driven cocktail designed to evolve gradually in the glass.",
      specs: [
        ["2 oz", "Veda Mushroom Liqueur"],
        ["3/4 oz", "Vermouth di Torino"],
        ["1/4 oz", "Amaro Nonino"],
        ["2 dashes", "JUJU BEE tincture"],
        ["1 large cube", "Feta brine + lactic acid ice"]
      ],
      method: "Stir the liquid ingredients with ice until chilled and appropriately diluted. Strain over the prepared feta-brine/lactic-acid cube.",
      glassware: "Double rocks",
      garnish: "None; the cube is the visual and sensory event.",
      vector: { Sweetness: 4, Bitterness: 5, Acidity: 2, Herbal: 8, Earthiness: 10, Umami: 10, Body: 7 },
      functions: [
        ["Veda Mushroom Liqueur", "Foundation"],
        ["Vermouth di Torino", "Structure"],
        ["Amaro Nonino", "Bridge"],
        ["JUJU BEE", "Aromatic Accent / Finish"],
        ["Feta Brine + Lactic Acid Ice", "Dynamic Modifier"]
      ],
      progression: [
        { stage: "First Sip", salinity: 1, notes: ["earth", "mushroom", "herbal complexity", "gentle bitterness"] },
        { stage: "Middle", salinity: 3, notes: ["orange", "alpine herbs", "aromatic lift", "growing salinity"] },
        { stage: "Final Sips", salinity: 5, notes: ["salinity", "lactic character", "deep umami", "fermented complexity"] }
      ]
    }
  ],
  relationships: [
    { from: "Amaro Nonino", verb: "bridges", to: "Mushroom + Vermouth", why: "Citrus, alpine herbs and bittersweet structure overlap both sides." },
    { from: "Feta Brine Ice", verb: "increases", to: "Salinity over time", why: "Melting converts the cooling element into a timed seasoning system." },
    { from: "Lactic Acid", verb: "sharpens", to: "Fermented Character", why: "Its cultured acidity reinforces feta-brine and savory associations." },
    { from: "Honey", verb: "softens", to: "Bitterness", why: "Sweetness and viscosity reduce perceived angularity." },
    { from: "Dilution", verb: "changes", to: "Flavor Perception", why: "Lower proof and changing temperature alter aroma, sweetness and bitterness perception." },
    { from: "Mushroom", verb: "pairs with", to: "Walnut", why: "Shared earthy, roasted and savory aromatic families create continuity." }
  ],
  roles: ["Foundation", "Structure", "Bridge", "Modifier", "Accent", "Brightener", "Bittering Agent", "Sweetener", "Aromatic", "Textural Element", "Dilution Element", "Finish", "Contrast", "Amplifier", "Dynamic Modifier"]
};
