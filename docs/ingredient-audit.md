# Recipe-to-ingredient audit — September 30, 2026

Audited the recorded recipe specifications on main after PR #3 was merged
(`4c5930dca9fd7a65acfbe3345dc8029df5f3f5ac`). This is a recipe coverage audit,
not a claim about current bar inventory or independently verified product specifications.

## Findings and implemented coverage

| Measure | Before | After |
| --- | ---: | ---: |
| Recorded cocktail recipes | 150 | 150 |
| Ingredient catalog records | 24 | 247 |
| Recipe ingredient rows | 696 | 696 |
| Rows matching a catalog display name, ignoring case/spacing/apostrophe style | 150 | — |
| Recipe rows with explicit ingredient ID links | 0 | 696 |
| Missing or invalid recipe links | Not modeled | 0 |

The recipes contain 277 distinct ingredient labels (267 after conservative text
normalization). The change adds 223 recipe-reference records, explicit aliases,
alternative/combined-row bindings, clickable ingredient links in recipes, and
reverse cocktail links on ingredient profiles. Existing recipes, measurements,
garnishes, and the original 24 sensory profiles are preserved.

## Identity rules

- Brand-specific records remain distinct from generic ingredients: Cointreau vs
  Triple Sec, Starlight Applejack vs Applejack, and Skinos vs Antica vs generic Mastiha.
- Metaxa 7 Star and 12 Star are separate; unspecified Metaxa stays unspecified.
- Cream, heavy cream, and light cream are not silently merged.
- Umeshu bitters and Umeshu Tincture remain separate.
- Feta-brine ice, feta/lactic-acid ice, and the feta-piece cube remain separate preparations.
- Spelling aliases include Stray Dog Greek Gin / Stray Dog Gin and curly/straight
  apostrophes in Peychaud's. Optional and chilled wording stays visible in the recipe.
- Simple Syrup / Sugar Syrup share a reference, without assuming a syrup ratio.
  Fresh and unqualified lemon, lime, orange, and pineapple juice labels resolve to
  the corresponding juice entry; this is a naming decision, not a freshness check.
- “Bourbon or Rye,” “Metaxa 7 or 12 Star,” and similar alternatives link to each option.
  The Bloody Mary's combined seasoning row links to its three separate ingredients.

## What a reference means

New entries are supported by their appearances in the recorded recipes. They are
searchable and navigable, with source cocktail IDs and any individually recorded
functional roles. Their category is a catalog grouping, not a verified product specification.
They have **no numerical flavor vector** or invented pairings/substitutions. The
Ingredient Graph suppresses scored recommendations for these entries and excludes
them as candidates for encoded ingredients.

The existing 24 profiles keep their authored data. Adding a recipe reference does
not verify a bottle's formula, origin, proof, concentration, or availability.

## Details still needing confirmation

| Recipe label | Detail needed |
| --- | --- |
| White Bitter Rouge | Exact product identity |
| Elixir Liqueur | Exact product identity |
| Cadilla Açaí Liqueur | Product spelling and identity |
| Prickly Pear | Juice, purée, syrup, or other preparation |
| Saline | House concentration |
| Generic Mastiha / Metaxa | Brand or expression where recipes leave it open |
| Falernum | Product/style, including whether alcoholic |
| Cream Cheese Tincture and other house tinctures | Preparation formulas and concentrations |
| Carrot Purée with Blanco Vermouth | Preparation ratio |
| Specialty feta/brine ice | Preparation ratios and distinct formulations |

These gaps do not prevent linking the recorded labels. The labels remain visible
and explicitly unverified; no decision has been made on the user's behalf.

## Scope and validation

- Audit scope: the `specs` rows of the current 150 recipes. Free-text garnishes,
  technique instructions, and standalone function descriptions are not exhaustively
  parsed into ingredient records.
- Suze is not in the current recipe specs, so it was not added as a presumed recipe gap.
- `node scripts/audit-ingredients.js`: 696/696 rows linked, zero unresolved rows,
  zero duplicate IDs, zero invalid links.
- `node --test tests/*.test.js`: 16 tests covering catalog integrity, aliases,
  alternatives, recipe preservation, ingredient/cocktail navigation, search,
  missing sensory data, and the earlier Family Graph regressions.
- All 247 ingredient profiles and 150 cocktail builds render in the DOM harness.
- All JavaScript syntax checks and `git diff --check` pass.
- DOM-harness checks are not visual browser verification; a browser smoke check
  remains recommended before merging.
