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
      id:"adventura-demo", brand:"Adventura", name:"Adventura — Demo Profile", wrapper:"Nicaraguan-style demo", vitola:"Robusto", strength:3, body:4, demo:true,
      flavor:{sweet:1,bitter:1,acidic:0,savory:2,smoky:2,woody:5,earthy:4,nutty:4,spicy:3,floral:0,herbal:1,fruity:1,creamy:2,roasted:4,mineral:1},
      note:"Sample profile: cedar, roasted nuts, earth, cocoa-like roast and pepper."
    },
    {
      id:"zino-nicaragua", brand:"Zino", name:"Zino Nicaragua", wrapper:"Nicaragua", vitola:"Robusto", strength:3, body:3, demo:true,
      flavor:{sweet:2,bitter:1,acidic:0,savory:1,smoky:1,woody:4,earthy:3,nutty:4,spicy:3,floral:1,herbal:1,fruity:2,creamy:3,roasted:3,mineral:0},
      note:"Sample profile: cedar, nuts, warm spice, cream and light fruit."
    },
    {
      id:"aroma-ct", brand:"La Aroma de Cuba", name:"La Aroma de Cuba Connecticut", wrapper:"Connecticut", vitola:"Robusto", strength:2, body:3, demo:true,
      flavor:{sweet:3,bitter:0,acidic:0,savory:1,smoky:1,woody:3,earthy:2,nutty:4,spicy:2,floral:1,herbal:0,fruity:1,creamy:5,roasted:2,mineral:0},
      note:"Sample profile: cream, toasted nuts, cedar and gentle baking spice."
    },
    {
      id:"aganorsa-demo", brand:"Aganorsa Leaf", name:"Aganorsa Leaf — Demo Profile", wrapper:"Nicaraguan-style demo", vitola:"Toro", strength:4, body:4, demo:true,
      flavor:{sweet:1,bitter:2,acidic:0,savory:2,smoky:2,woody:4,earthy:5,nutty:3,spicy:5,floral:0,herbal:1,fruity:1,creamy:1,roasted:4,mineral:2},
      note:"Sample profile: earth, pepper, cedar, roast and mineral depth."
    }
  ]
};