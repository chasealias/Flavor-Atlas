window.PNP_DATA = {
  flavors: ["sweet","bitter","acidic","savory","smoky","woody","earthy","nutty","spicy","floral","herbal","fruity","creamy","roasted","mineral"],
  cocktails: [
    {
      id:"toki-umamier", name:"Toki Umamier", style:"Bitter / savory stirred", base:"Japanese whisky",
      recipe:["1 oz Toki Black","1.25 oz sweet vermouth","0.75 oz Campari","3 dashes ponzu"],
      body:4, intensity:4,
      flavor:{sweet:2,bitter:4,acidic:1,savory:4,smoky:0,woody:3,earthy:1,nutty:1,spicy:1,floral:0,herbal:4,fruity:2,creamy:0,roasted:1,mineral:1},
      note:"Bitter orange, oak, herbs and a savory ponzu edge."
    },
    {
      id:"negroni", name:"Negroni", style:"Bitter stirred", base:"Gin",
      recipe:["1 oz gin","1 oz sweet vermouth","1 oz Campari"],
      body:4, intensity:4,
      flavor:{sweet:3,bitter:5,acidic:0,savory:0,smoky:0,woody:0,earthy:1,nutty:0,spicy:2,floral:1,herbal:5,fruity:3,creamy:0,roasted:0,mineral:0},
      note:"Bittersweet citrus and botanical density."
    },
    {
      id:"old-fashioned", name:"Old Fashioned", style:"Spirit-forward stirred", base:"Whiskey",
      recipe:["2 oz bourbon or rye","0.25 oz demerara syrup","2 dashes aromatic bitters"],
      body:5, intensity:5,
      flavor:{sweet:3,bitter:2,acidic:0,savory:0,smoky:1,woody:5,earthy:1,nutty:2,spicy:4,floral:0,herbal:2,fruity:2,creamy:0,roasted:3,mineral:0},
      note:"Oak, baking spice, caramel and bitters."
    },
    {
      id:"new-york-sour", name:"New York Sour", style:"Citrus sour", base:"Whiskey",
      recipe:["2 oz rye or bourbon","0.75 oz lemon","0.75 oz simple","red wine float"],
      body:4, intensity:4,
      flavor:{sweet:3,bitter:1,acidic:5,savory:0,smoky:0,woody:3,earthy:1,nutty:1,spicy:3,floral:1,herbal:0,fruity:5,creamy:1,roasted:1,mineral:1},
      note:"Bright citrus over whiskey, dark fruit and tannin."
    },
    {
      id:"martini", name:"Martini", style:"Dry stirred", base:"Gin",
      recipe:["2.5 oz gin","0.5 oz dry vermouth","orange bitters optional"],
      body:3, intensity:4,
      flavor:{sweet:0,bitter:2,acidic:0,savory:1,smoky:0,woody:0,earthy:0,nutty:0,spicy:1,floral:2,herbal:5,fruity:1,creamy:0,roasted:0,mineral:4},
      note:"Dry, botanical, crisp and mineral."
    }
  ],
  cigars: [
    {
      id:"adventura-explorer-robusto-grande",
      brand:"ADVentura",
      name:"The Explorer Robusto Grande",
      wrapper:"Mexican",
      binder:"Ecuador Sumatra",
      filler:"Dominican Republic + Ecuador",
      origin:"Dominican Republic",
      vitola:"Robusto Grande · 5 × 54",
      strength:3,
      body:3,
      verified:true,
      flavor:{sweet:2,bitter:2,acidic:0,savory:2,smoky:1,woody:4,earthy:3,nutty:4,spicy:3,floral:0,herbal:0,fruity:0,creamy:1,roasted:4,mineral:0},
      note:"Medium-bodied with dark chocolate, spice, nuts, leather, earth and woody sweetness.",
      sources:[
        {label:"ADVentura — The Explorer Core Line",url:"https://www.adventuracigars.com/post/the-explorer-core-line"},
        {label:"ADVentura — The Explorer",url:"https://www.adventuracigars.com/theexplorer"}
      ]
    },
    {
      id:"zino-nicaragua-robusto",
      brand:"Zino",
      name:"Zino Nicaragua Robusto",
      wrapper:"Ecuador Connecticut",
      binder:"Nicaragua",
      filler:"Honduras + Nicaragua + Dominican Republic",
      origin:"Honduras",
      vitola:"Robusto · 5 × 54",
      strength:3,
      body:3,
      verified:true,
      flavor:{sweet:2,bitter:1,acidic:0,savory:1,smoky:1,woody:4,earthy:3,nutty:4,spicy:3,floral:0,herbal:0,fruity:0,creamy:4,roasted:4,mineral:1},
      note:"Medium-bodied profile with cedar, coffee, dark chocolate, cream, spice, earth and natural sweetness.",
      sources:[
        {label:"Davidoff — Zino Nicaragua",url:"https://us.davidoffgeneva.com/discover/zino"},
        {label:"Cigars International — Zino Nicaragua",url:"https://www.cigarsinternational.com/product/ZND-PM.html"}
      ]
    },
    {
      id:"aroma-connecticut-robusto",
      brand:"La Aroma de Cuba",
      name:"Connecticut Robusto",
      wrapper:"Ecuador Connecticut",
      binder:"Nicaragua",
      filler:"Nicaragua",
      origin:"Nicaragua",
      vitola:"Robusto · 5.25 × 54",
      strength:2,
      body:3,
      verified:true,
      flavor:{sweet:3,bitter:1,acidic:0,savory:1,smoky:0,woody:4,earthy:1,nutty:5,spicy:1,floral:0,herbal:0,fruity:0,creamy:5,roasted:4,mineral:0},
      note:"Mild-medium with almond, cashew, cedar, coffee bean and buttercream before a soft finish.",
      sources:[
        {label:"La Aroma de Cuba — Connecticut",url:"https://www.laaromadecuba.com/cigars/la-aroma-de-cuba-cigars/la-aroma-de-cuba-connecticut"}
      ]
    },
    {
      id:"aganorsa-signature-corojo-robusto",
      brand:"Aganorsa Leaf",
      name:"Signature Corojo Robusto",
      wrapper:"Aganorsa Corojo · Nicaragua",
      binder:"Aganorsa · Nicaragua",
      filler:"Aganorsa Nicaragua + medio tiempo",
      origin:"Nicaragua",
      vitola:"Robusto · 5 × 52",
      strength:4,
      body:4,
      verified:true,
      flavor:{sweet:2,bitter:2,acidic:1,savory:2,smoky:1,woody:4,earthy:4,nutty:4,spicy:5,floral:0,herbal:1,fruity:1,creamy:2,roasted:4,mineral:1},
      note:"Medium-full model profile: white pepper, baking spice, cocoa, nuts, cedar, earth, toast and leather.",
      sources:[
        {label:"Aganorsa Leaf — Signature Corojo",url:"https://aganorsaleaf.com/cigars/aganorsa-leaf-signature-corojo/"},
        {label:"Cigar Advisor — Aganorsa Guide",url:"https://www.famous-smoke.com/cigaradvisor/buying-guides/cigar-advisor-guide-aganorsa-cigars"}
      ]
    }
  ],
  dataNote:"Wrapper, blend, size and tasting-note facts are sourced from manufacturer or established cigar references. The 0–5 flavor vectors are Puff ’n Pour model encodings of those documented notes, not manufacturer ratings."
};