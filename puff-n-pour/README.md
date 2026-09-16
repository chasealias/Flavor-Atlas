# Puff ’n Pour

Mobile-first cigar and cocktail pairing MVP built inside Flavor Atlas.

## Current MVP

- Start with either a cigar or a cocktail
- Automatic ranked recommendations after the first selection
- Search cigar and cocktail libraries
- Deterministic pairing score
- Flavor bridge, intensity, useful contrast, palate structure, and preference components
- Plain-language explanation of why each pairing works
- Save ratings and tasting notes in localStorage
- Saved ratings influence previously rated pairings
- Mobile bottom navigation
- PWA-ready metadata
- Verified cigar blend / size / tasting-note source links displayed in the app

## Pairing model

The prototype score uses:

- 30% intensity compatibility
- 30% flavor bridge / complementary overlap
- 20% useful contrast
- 10% palate-cleansing structure
- 10% user preference

For unrated combinations, the preference term begins from a neutral prior. Previously rated exact pairings can move up or down in later rankings.

## Current cigar profiles

- ADVentura The Explorer Robusto Grande
- Zino Nicaragua Robusto
- La Aroma de Cuba Connecticut Robusto
- Aganorsa Leaf Signature Corojo Robusto

Blend, wrapper, format, strength/body context, and tasting-note facts are sourced from manufacturer pages or established cigar references. The 0–5 flavor vectors are Puff ’n Pour model encodings of those documented notes rather than manufacturer ratings.

## Current cocktails

- Toki Umamier
- Negroni
- Old Fashioned
- New York Sour
- Martini

## Run

Serve this folder with any static web server and open index.html.

No build step or framework is required.
