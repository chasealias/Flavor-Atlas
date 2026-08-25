// Flavor Atlas V0.5 cocktail canon.
// Reference records are intentionally lightweight: they make the broader canon
// searchable now without pretending every drink has a finished Atlas analysis.

(() => {
  const DATA = window.FLAVOR_ATLAS_DATA;
  if (!DATA || !Array.isArray(DATA.cocktails)) return;

  const normalize = value => String(value || '').trim().toLocaleLowerCase();
  const known = new Set(DATA.cocktails.map(c => normalize(c.name)));

  const enrich = (name, patch) => {
    const record = DATA.cocktails.find(c => normalize(c.name) === normalize(name));
    if (record) Object.assign(record, patch);
  };

  [
    ['The Philosopher', { collection: 'Flavor Atlas Originals', recordStatus: 'encoded' }],
    ['Greek Blonde', { collection: 'Flavor Atlas Originals', recordStatus: 'encoded' }],
    ['Aegean Mist', { collection: 'Flavor Atlas Originals', recordStatus: 'encoded' }],
    ["Cupid's Cloud", { collection: 'Flavor Atlas Originals', recordStatus: 'encoded', aliases: ['White Cosmo'] }],
    ['Capuchin', { collection: 'Flavor Atlas Originals', recordStatus: 'encoded' }],
    ['Metaxerac', { collection: 'Flavor Atlas Originals', recordStatus: 'encoded' }],
    ['White Boulevardier', { collection: 'Flavor Atlas Originals', recordStatus: 'encoded', aliases: ['Tokicocchitalicus'] }]
  ].forEach(([name, patch]) => enrich(name, patch));

  const ibaGroups = {
    'The Unforgettables': ["Alexander", "Americano", "Angel Face", "Aviation", "Between the Sheets", "Boulevardier", "Brandy Crusta", "Casino", "Clover Club", "Daiquiri", "Dry Martini", "Gin Fizz", "Hanky Panky", "John Collins", "Last Word", "Manhattan", "Martinez", "Mary Pickford", "Monkey Gland", "Negroni", "Old Fashioned", "Paradise", "Planters Punch", "Porto Flip", "Ramos Fizz", "Remember the Maine", "Rusty Nail", "Sazerac", "Sidecar", "Stinger", "Tuxedo", "Vieux Carré", "Whiskey Sour", "White Lady"],
    'Contemporary Classics': ["Bellini", "Black Russian", "Bloody Mary", "Caipirinha", "Cardinale", "Champagne Cocktail", "Corpse Reviver #2", "Cosmopolitan", "Cuba Libre", "French 75", "French Connection", "Garibaldi", "Grasshopper", "Hemingway Special", "Horse’s Neck", "Irish Coffee", "Kir", "Lemon Drop Martini", "Long Island Iced Tea", "Mai-Tai", "Margarita", "Mimosa", "Mint Julep", "Mojito", "Moscow Mule", "Pina Colada", "Pisco Sour", "Rabo de Galo", "Sea Breeze", "Sex on the Beach", "Singapore Sling", "Tequila Sunrise", "Vesper", "Zombie"],
    'New Era': ["Bee’s Knees", "Bramble", "Canchanchara", "Chartreuse Swizzle", "Dark ‘N’ Stormy", "Don's Special Daiquiri", "Espresso Martini", "Fernandito", "French Martini", "Gin Basil Smash", "Grand Margarita", "IBA Tiki", "Illegal", "Jungle Bird", "Missionary's Downfall", "Naked and Famous", "New York Sour", "Old Cuban", "Paloma", "Paper Plane", "Penicillin", "Pisco Punch", "Porn Star Martini", "Russian Spring Punch", "Sherry Cobbler", "South Side", "Spicy Fifty", "Spritz", "Suffering Bastard", "Three Dots and a Dash", "Tipperary", "Tommy's Margarita", "Trinidad Sour", "Ve.N.To"]
  };

  let ibaIndex = 1;
  Object.entries(ibaGroups).forEach(([canonCategory, names]) => {
    names.forEach(name => {
      if (known.has(normalize(name))) return;
      DATA.cocktails.push({
        id: `IBA-${String(ibaIndex++).padStart(3, '0')}`,
        name,
        style: 'Classic',
        subtitle: `${canonCategory} · IBA official cocktail`,
        intent: 'Canonical reference record. Full Flavor Atlas architecture has not yet been encoded.',
        tags: ['IBA', canonCategory, 'canonical'],
        aliases: [],
        collection: 'IBA Canon',
        source: 'International Bartenders Association',
        canonCategory,
        recordStatus: 'reference',
        specs: [],
        method: '',
        glassware: '',
        garnish: '',
        functions: [],
        progression: []
      });
      known.add(normalize(name));
    });
  });

  const house = [["Santorini Bellini", "Sparkling", "Ilios house Bellini riff", []], ["Blood Orange Mimosa", "Sparkling", "Ilios blood-orange Mimosa", []], ["White Cosmopolis", "Citrus", "Ilios white Cosmo riff", []], ["Bloody Mama Mia", "Savory", "Ilios Bloody Mary riff", []], ["Hellenic Negroni", "Spirit-Forward", "Greek Negroni riff", []], ["Hellenic Boulevardier", "Spirit-Forward", "Greek Boulevardier riff", []], ["Mediterranean Sunset Spritz", "Spritz", "Layered Mediterranean spritz", ["Mediterranean Spritz", "Greek Hugo"]], ["Greek Jungle Bird", "Tropical", "Greek Jungle Bird riff", []], ["Wings of Icarus", "House Original", "Greek-inspired house cocktail", []], ["Tiki of Troy", "Tropical", "Greek-inspired tiki cocktail", []], ["Grecian Corpse Reviver", "Sour", "Greek Corpse Reviver riff", []], ["Greek Last Word", "Herbal", "Greek Last Word riff", []], ["Greek Naked & Famous", "Sour", "Greek Naked & Famous riff", []], ["Greek Vesper", "Spirit-Forward", "Greek Vesper riff", []], ["Mati Sour", "Sour", "Blue-raspberry mezcal sour", []], ["Vieux Lýkos", "Spirit-Forward", "Greek Vieux Carré riff", []], ["Hardcore Port", "Spirit-Forward", "Applejack, fortified-wine and amaro build", ["Hard Core", "Hardcore"]], ["Siren's Call", "Tropical", "Lychee and soursop cocktail", ["Lychee Siren"]], ["The Papyrus", "Sour", "Mediterranean Paper Plane riff", ["Greek Paper Plane", "Parchment Plane"]], ["Dirty Frappe", "Dessert", "Nescafé frappé martini", ["Frappe Martini"]], ["Aegean Velvet", "Dessert", "Greek after-dinner cocktail", []], ["Baklava Alexander", "Dessert", "Baklava-inspired Alexander", []], ["Mastiha Affogato", "Dessert", "Mastiha-spiked affogato", ["Vythisméno", "To Pnigméno"]], ["Prickly Poet", "Sour", "Prickly pear gin sour", []], ["Pandora's Box", "Tropical", "Vanilla vodka, lychee and prickly pear", []], ["Salted Watermelon Smash", "Fruit", "Tsipouro watermelon cocktail", []], ["Stray Dog Greek Gin Fizz", "Fizz", "Ramos-style Greek gin fizz", []], ["Glazed Carrot Crusta", "Savory", "Carrot-forward crusta", []], ["Metaxa Sangria", "Punch", "Metaxa-based sangria", []], ["Father's Fig", "Spirit-Forward", "Fig and feta-brine concept", []], ["Awakening Minotaur", "Smoky", "Lagavulin and Nonino cocktail", []], ["Athena's Bloom", "Floral", "Lillet and egg-white floral sour", []], ["Greek Coffee Flip", "Dessert", "Greek coffee flip", []], ["Athens at Midnight", "Dessert", "Greek dessert cocktail", []], ["Berrycello", "Fruit", "Berry and limoncello cocktail", []], ["The Cyprian's Potion", "Sour", "Mediterranean sour", []], ["The Aphrodisiac", "Floral", "Gin and fruit/floral cocktail", []], ["Para-harma", "Sour", "Greek-leaning sidecar-inspired cocktail", []], ["Filthy Lupin", "Highball", "Drunken dirty soda concept", []], ["Orchard Oracle", "Fruit", "Orchard-fruit cocktail", []], ["Metaxa Honey Sour", "Sour", "Metaxa and honey sour", []]];
  let houseId = 8;
  house.forEach(([name, style, note, aliases]) => {
    if (known.has(normalize(name))) return;
    DATA.cocktails.push({
      id: `FA-${String(houseId++).padStart(4, '0')}`,
      name,
      style,
      subtitle: note,
      intent: 'House archive reference. Recipe details and flavor architecture will be promoted as the record is verified.',
      tags: ['house archive', 'Flavor Atlas', style.toLowerCase()],
      aliases,
      collection: 'House Archive',
      source: 'Flavor Atlas working archive',
      recordStatus: 'reference',
      specs: [],
      method: '',
      glassware: '',
      garnish: '',
      functions: [],
      progression: []
    });
    known.add(normalize(name));
  });

  DATA.cocktailCanon = {
    version: '0.5',
    ibaCount: Object.values(ibaGroups).reduce((sum, names) => sum + names.length, 0),
    houseReferenceCount: house.length,
    encodedCount: DATA.cocktails.filter(c => c.recordStatus === 'encoded').length,
    totalCount: DATA.cocktails.length
  };
})();
