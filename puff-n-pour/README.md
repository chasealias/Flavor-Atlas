# Puff ’n Pour

Mobile-first cigar and cocktail pairing MVP built inside Flavor Atlas.

## Current MVP

- Start with either a cigar or a cocktail
- Search the cigar and cocktail libraries
- Deterministic pairing score
- Flavor bridge, intensity, useful contrast, and palate-structure breakdown
- Plain-language explanation of why the pairing works
- Save ratings and tasting notes in localStorage
- Mobile bottom navigation
- PWA-ready metadata

## Pairing model

The prototype score uses:

- 30% intensity compatibility
- 30% flavor bridge / complementary overlap
- 20% useful contrast
- 10% palate-cleansing structure
- 10% neutral user-preference prior

The preference portion is deliberately simple in V0.1. Saved ratings provide the foundation for a learned preference modifier later.

## Sample data

The cocktail specs include Negroni, Old Fashioned, New York Sour, Martini, and Toki Umamier.

Cigar flavor profiles are labeled as sample/demo data until they are verified against manufacturer information and tasting records.

## Run

Serve this folder with any static web server and open index.html.

No build step or framework is required.
