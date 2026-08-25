// Flavor Atlas V0.6 — structural cocktail families and curated lineage edges.
// Families are Flavor Atlas analytical classifications, not claims of historical authorship.
(() => {
  const DATA = window.FLAVOR_ATLAS_DATA;
  if (!DATA?.cocktails) return;

  const FAMILIES = [
    { id:'sour', name:'Sour', formula:'spirit + acid + sweetener', principle:'Balance proof, acidity, and sweetness around a clear base-spirit identity.' },
    { id:'daisy', name:'Daisy', formula:'spirit + citrus + liqueur or flavored sweetener', principle:'A sour whose sweetening element also contributes a distinct flavor bridge.' },
    { id:'equal-parts-sour', name:'Equal-Parts Sour', formula:'base + herbal/bitter modifier + sweet modifier + citrus', principle:'Tension comes from equal structural weight rather than one dominant modifier.' },
    { id:'old-fashioned', name:'Old Fashioned / Cocktail', formula:'spirit + sugar + bitters + dilution', principle:'Season the base spirit instead of disguising it.' },
    { id:'aromatized-wine', name:'Spirit + Aromatized Wine', formula:'spirit + vermouth/aromatized wine + optional bitters/liqueur', principle:'Use fortified wine to stretch, season, and reshape a spirit-forward core.' },
    { id:'bitter-aperitivo', name:'Bitter Aperitivo', formula:'spirit or wine + bitter aperitivo + aromatized wine', principle:'Bitterness is structural, not decorative.' },
    { id:'spirit-liqueur', name:'Spirit + Liqueur', formula:'spirit + one or more liqueur modifiers', principle:'Minimal builds depend on precise modifier intensity and dilution.' },
    { id:'highball', name:'Highball / Buck / Mule', formula:'spirit + lengthener, often citrus and carbonation', principle:'Lengthen without losing the identity of the base.' },
    { id:'fizz-collins', name:'Fizz / Collins', formula:'sour structure + soda, sometimes egg or cream', principle:'Carbonation converts sour balance into vertical lift and texture.' },
    { id:'spritz-sparkling', name:'Spritz / Sparkling', formula:'wine or aperitivo + sparkling component + optional soda/fruit', principle:'Keep sweetness and bitterness light enough for carbonation to stay expressive.' },
    { id:'julep-smash', name:'Julep / Smash', formula:'spirit + sweetener + fresh herb/fruit + crushed ice', principle:'Temperature, dilution, and fresh aromatics are part of the recipe.' },
    { id:'punch-tiki', name:'Punch / Tiki', formula:'multi-element spirit, citrus, sweet, spice, fruit, and dilution system', principle:'Complexity works when every modifier has a distinct job.' },
    { id:'flip-cream', name:'Flip / Cream', formula:'spirit or wine + rich sweetener + egg and/or dairy', principle:'Texture is a primary flavor dimension, not merely mouthfeel.' },
    { id:'cobbler', name:'Cobbler', formula:'wine or fortified wine + sugar + fruit over crushed ice', principle:'Fruit aroma, cold dilution, and low-proof structure define the experience.' },
    { id:'sling', name:'Sling', formula:'spirit + sweet + water/lengthener + aromatic modifiers', principle:'A broad historical family where length and aromatic layering matter more than rigid ratios.' },
    { id:'savory', name:'Savory', formula:'spirit + savory/umami body + acid + seasoning', principle:'Salt, umami, vegetal notes, and heat function as structural modifiers.' },
    { id:'dessert', name:'Coffee / Dessert', formula:'spirit + dessert flavor system and/or coffee + rich texture', principle:'Control sugar and body so dessert flavors remain drinkable rather than merely edible.' },
    { id:'other', name:'Other / Hybrid', formula:'cross-family or intentionally nonstandard architecture', principle:'Use when the drink combines families strongly enough that one template would mislead.' }
  ];

  const RULES = [
    ['bitter-aperitivo', /negroni|boulevardier|americano|cardinale|bitter aperitivo|aperitivo/],
    ['equal-parts-sour', /equal-parts|last word|paper plane|naked and famous|naked & famous/],
    ['daisy', /daisy|margarita|sidecar|white lady|crusta|between the sheets|cosmopolitan|lemon drop/],
    ['old-fashioned', /old fashioned|sazerac|spirit-sugar-bitters|cocktail \/ spirit-sugar-bitters/],
    ['aromatized-wine', /manhattan|martinez|martini|vesper|vieux carr|tuxedo|hanky panky|tipperary|remember the maine|aromatized wine|vermouth/],
    ['spirit-liqueur', /two-part spirit|spirit liqueur|spirit-forward dessert cocktail|rusty nail|stinger|black russian|french connection|apple-brandy fortified-wine/],
    ['fizz-collins', /fizz|collins|ramos/],
    ['highball', /highball|mule|buck|horse.?s neck|cuba libre|paloma|dark .*stormy|fernandito|long island|sea breeze|tequila sunrise/],
    ['spritz-sparkling', /spritz|sparkling|bellini|mimosa|champagne|french 75|kir|old cuban/],
    ['julep-smash', /julep|smash/],
    ['cobbler', /cobbler/],
    ['flip-cream', /flip|cream cocktail|cream fizz|alexander|grasshopper|egg-white|egg white/],
    ['savory', /savory|bloody|tomato|carrot/],
    ['dessert', /dessert|coffee|espresso|affogato|frappe|frappé/],
    ['punch-tiki', /tiki|punch|mai-tai|zombie|jungle bird|missionary|three dots|planters|singapore sling|suffering bastard|tropical/],
    ['sling', /sling/],
    ['sour', /sour|daiquiri|aviation|bee.?s knees|bramble|south side|penicillin|pisco|clover club|casino|monkey gland|paradise|mary pickford|porn star|spicy fifty|illegal|trinidad|gin basil smash|canchanchara/]
  ];

  function familyFor(c) {
    const haystack = `${c.family || ''} ${c.style || ''} ${c.name || ''} ${(c.tags || []).join(' ')}`.toLowerCase();
    const hit = RULES.find(([, re]) => re.test(haystack));
    return hit?.[0] || 'other';
  }

  const familyById = Object.fromEntries(FAMILIES.map(f => [f.id, f]));
  DATA.cocktails.forEach(c => {
    const id = familyFor(c);
    c.structuralFamilyId = id;
    c.structuralFamily = familyById[id].name;
    c.familyFormula = familyById[id].formula;
  });

  const E = (from, to, relation, why, confidence='high') => ({ from, to, relation, why, confidence, claimType:'Flavor Atlas structural lineage' });
  const EDGES = [
    E('Americano','Negroni','spirit-added variation','Gin replaces soda to convert a low-proof bitter aperitivo into a spirit-forward equal-parts structure.'),
    E('Negroni','Boulevardier','base-spirit variation','Whiskey replaces gin while Campari and sweet vermouth retain the bitter-aperitivo chassis.'),
    E('Negroni','Cardinale','dry variation','Dry vermouth replaces sweet vermouth and the ratio shifts toward gin.'),
    E('Negroni','Hellenic Negroni','house riff','Stray Dog Gin, White Bitter Rouge, and Lillet Blanc translate the Negroni template into a pale Greek register.'),
    E('Boulevardier','Hellenic Boulevardier','house riff','Metaxa, White Bitter Rouge, and Lillet Blanc preserve the bitter spirit-wine logic while changing every major flavor source.'),
    E('Boulevardier','White Boulevardier','house riff','Toki, Cocchi Americano, and Italicus reinterpret the Boulevardier as a pale whiskey-and-bergamot build.'),

    E('Daiquiri','Hemingway Special','documented-style variation','Grapefruit and maraschino expand the rum-lime sour while retaining the Daiquiri core.'),
    E('Daiquiri',"Don's Special Daiquiri",'tiki variation','The Daiquiri chassis expands through passion fruit and honey while staying rum-citrus driven.'),
    E('Margarita',"Tommy's Margarita",'modern variation','Orange liqueur is removed and agave syrup becomes the sweetener, simplifying the daisy around tequila and lime.'),
    E('Margarita','Grand Margarita','premium variation','The Margarita template is retained while the orange modifier and tequila presentation are amplified.'),
    E('Sidecar','Margarita','template relative','Both are spirit-citrus-orange-liqueur daisies; the relationship here is structural rather than a claim of direct historical descent.','medium'),
    E('Sidecar','White Lady','template relative','Gin replaces brandy while the orange-liqueur and lemon daisy structure remains.'),
    E('Whiskey Sour','New York Sour','wine-float variation','A red-wine float adds tannin, fruit, and a second aromatic phase to the whiskey sour.'),
    E('Whiskey Sour','Metaxa Honey Sour','house riff','Metaxa replaces whiskey and honey replaces simple syrup while the egg-white sour architecture remains.'),
    E('Brandy Crusta','Glazed Carrot Crusta','house riff','The crusta idea is reworked through carrot, Cognac, amaro, and white amaretto.'),
    E('Cosmopolitan','White Cosmopolis','house riff','The cranberry-driven Cosmo becomes a pale bergamot-and-Mastiha citrus sour.'),

    E('Last Word','Naked and Famous','modern equal-parts riff','Mezcal, Yellow Chartreuse, Aperol, and lime preserve the four-part equal-parts tension.'),
    E('Last Word','Paper Plane','modern equal-parts riff','Bourbon, Nonino, Aperol, and lemon preserve equal structural weight with a different bitter-herbal profile.'),
    E('Last Word','Greek Last Word','house riff','Mastiha replaces maraschino to turn the equal-parts herbal sour toward resin and Mediterranean aromatics.'),
    E('Naked and Famous','Greek Naked & Famous','house riff','Elixir and Mastiha replace the original smoky-herbal core while Aperol and lime preserve the modern equal-parts shape.'),
    E('Paper Plane','The Papyrus','house riff','Metaxa and limoncello recast the Paper Plane around dried fruit and candied lemon.'),

    E('Old Fashioned',"Father's Fig",'house structural riff','Metaxa, Tsipouro, fig, fortified wine, bitters, and a feta-brine cube elaborate the spirit-sweet-bitter template.'),
    E('Sazerac','Metaxerac','house riff','Metaxa replaces the base while Peychaud’s, sugar, anise, and lemon preserve the Sazerac logic.'),
    E('Manhattan','Remember the Maine','variation','Cherry brandy and absinthe elaborate the rye-and-sweet-vermouth Manhattan architecture.'),
    E('Dry Martini','Tuxedo','variation','Old Tom, dry vermouth, maraschino, absinthe, and orange bitters elaborate the Martini template.'),
    E('Dry Martini','Vesper','variation','Gin, vodka, and aromatized wine create a split-base Martini-relative structure.'),
    E('Vesper','Greek Vesper','house riff','Metaxa replaces vodka while Stray Dog Gin and Lillet maintain the Vesper’s split-base spirit-forward logic.'),
    E('Vieux Carré','Vieux Lýkos','house riff','Metaxa and bourbon reinterpret the dual-spirit, vermouth, herbal-modifier architecture with an ouzo finish.'),

    E('Gin Fizz','Ramos Fizz','rich fizz variation','Cream, egg white, flower water, and vanilla turn a simple fizz into a textural aromatic system.'),
    E('Ramos Fizz','Stray Dog Greek Gin Fizz','house riff','Stray Dog Gin and Mastiha give the Ramos-style cream fizz a Greek botanical and resinous identity.'),
    E('Mojito','Old Cuban','sparkling variation','Aged rum, bitters, and sparkling wine transform mint-lime-rum highball logic into a celebratory sparkling sour.'),
    E('Mimosa','Blood Orange Mimosa','house riff','Blood orange deepens the fruit component while the sparkling-wine structure remains.'),
    E('Bellini','Santorini Bellini','house riff','Mastiha adds a resinous Greek modifier to the peach-and-Prosecco Bellini template.'),
    E('Spritz','Mediterranean Sunset Spritz','house riff','Mastiha, elderflower, Sarti, Aperol, limoncello, and thyme expand the spritz into a layered Mediterranean build.'),

    E('Bloody Mary','Bloody Mama Mia','house riff','Tsipouro, olive brine, and oregano recast the savory tomato highball through Greek flavors.'),
    E('Jungle Bird','Greek Jungle Bird','house riff','Tsipouro, Foro, and Mastiha replace the usual rum-and-bitter system while pineapple and lime retain the tropical bitter-sour chassis.'),
    E('Corpse Reviver #2','Grecian Corpse Reviver','house riff','Stray Dog Gin, Lillet, Cointreau, and lemon preserve the equal-weight reviver structure in a Greek house version.'),
    E('Alexander','Baklava Alexander','house riff','Metaxa, cacao, Mastiha, pistachio, honey, and cream translate the Alexander into baklava flavor architecture.'),
    E('Espresso Martini','Dirty Frappe','structural relative','Coffee, spirit, sweetness, and foam remain central, but Nescafé frappé texture replaces espresso crema.','medium'),

    E('Whiskey Sour','Mati Sour','template relative','Mezcal, blue-raspberry lemonade, Chartreuse, and egg white use the sour template as a platform for smoke, color, and aroma.','medium'),
    E('Daiquiri','Tiki of Troy','template relative','The rum-citrus-sweet logic expands into a Greek tiki system with Tsipouro, bergamot, falernum, pineapple, and orgeat.','medium'),
    E('Sidecar',"The Cyprian's Potion",'template relative','A spirit-citrus-flavored-sweetener daisy logic is translated through grapefruit gin, quince, lemon, and Mastiha.','medium'),
    E('Whiskey Sour',"Athena's Bloom",'template relative','The sour template becomes floral and textural through pink gin, Lillet, lavender, lemon, and egg white.','medium'),
    E('Old Fashioned','Hardcore Port','template relative','Applejack, fortified wine, orange liqueurs, aperitivo, and bitters build a stirred orchard-fruit variation around spirit-forward seasoning.','medium'),
    E('Espresso Martini','Greek Coffee Flip','template relative','Coffee and spirit move into the Flip family through whole egg and Greek coffee cordial.','medium')
  ];

  DATA.cocktailFamilyTaxonomy = FAMILIES;
  DATA.cocktailLineage = EDGES;
  DATA.cocktailFamilySummary = {
    version:'0.6',
    cocktailCount:DATA.cocktails.length,
    familyCount:FAMILIES.length,
    edgeCount:EDGES.length,
    counts:Object.fromEntries(FAMILIES.map(f => [f.id, DATA.cocktails.filter(c => c.structuralFamilyId === f.id).length]))
  };
})();
