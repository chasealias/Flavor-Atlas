# Puff ’n Pour

Mobile-first cigar and cocktail pairing app built on the Flavor Atlas model.

## Current architecture

Puff ’n Pour no longer depends on a giant manually maintained catalog.

The app now uses a hybrid model:

1. **Cached profiles first** for speed.
2. **AI + web research** when the user enters a cigar or cocktail that is not already cached.
3. The researched result is normalized into the shared Flavor Atlas 0–5 flavor vector.
4. The profile is cached locally on the user's device.
5. The pairing engine ranks matches using flavor, intensity, contrast, palate structure, and saved preference feedback.

The existing curated profiles remain useful as instant examples and fallback data, but they are no longer the boundary of what the app can pair.

## AI research flow

From either the Cigar or Cocktail screen, users can enter any name or recipe into **Research any cigar/cocktail**.

The browser calls:

`POST /api/resolve`

with:

```json
{
  "kind": "cigar",
  "query": "Padron 1964 Anniversary Maduro Torpedo"
}
```

The server-side resolver:

- calls the OpenAI Responses API;
- enables the built-in web search tool;
- asks for a strict structured profile;
- prioritizes manufacturer sources for cigar construction;
- converts tasting descriptions into the Puff ’n Pour flavor vector;
- returns clickable source URLs;
- never exposes the OpenAI API key to browser JavaScript.

## Environment

Create a server-side environment variable:

```
OPENAI_API_KEY=...
```

Do **not** put the key in `app.js`, `data.js`, GitHub Pages configuration, or any client-visible file.

## Deployment

The `puff-n-pour` folder is set up so it can be used as the project root on a serverless host that supports Node API routes. A Vercel configuration is included.

GitHub Pages can still serve the static interface, but GitHub Pages alone cannot execute `api/resolve.js`. The AI research feature therefore needs a serverless deployment (or an equivalent backend) with `OPENAI_API_KEY` configured.

## Pairing model

The prototype score uses:

- 30% intensity compatibility
- 30% flavor bridge / complementary overlap
- 20% useful contrast
- 10% palate-cleansing structure
- 10% user preference

Previously rated exact pairings can move up or down in later rankings.

## Cached seed profiles

The repo still ships with sourced cigar profiles and a small cocktail set so the app works immediately even if AI research is temporarily unavailable.

## Security

The OpenAI key stays server-side. The frontend only talks to `/api/resolve`.

Research results are cached in browser localStorage for the MVP. A shared server-side cache/database can replace that later so one user's research benefits everyone.
