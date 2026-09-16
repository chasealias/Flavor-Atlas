const FLAVOR_KEYS = ["sweet","bitter","acidic","savory","smoky","woody","earthy","nutty","spicy","floral","herbal","fruity","creamy","roasted","mineral"];

const profileSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "kind","id","brand","name","style","base","wrapper","binder","filler","origin","vitola",
    "strength","body","intensity","recipe","note","flavor","confidence"
  ],
  properties: {
    kind: { type: "string", enum: ["cigar","cocktail"] },
    id: { type: "string" },
    brand: { type: ["string","null"] },
    name: { type: "string" },
    style: { type: ["string","null"] },
    base: { type: ["string","null"] },
    wrapper: { type: ["string","null"] },
    binder: { type: ["string","null"] },
    filler: { type: ["string","null"] },
    origin: { type: ["string","null"] },
    vitola: { type: ["string","null"] },
    strength: { type: ["integer","null"], minimum: 1, maximum: 5 },
    body: { type: "integer", minimum: 1, maximum: 5 },
    intensity: { type: ["integer","null"], minimum: 1, maximum: 5 },
    recipe: { type: "array", items: { type: "string" } },
    note: { type: "string" },
    flavor: {
      type: "object",
      additionalProperties: false,
      required: FLAVOR_KEYS,
      properties: Object.fromEntries(FLAVOR_KEYS.map(k => [k,{type:"integer",minimum:0,maximum:5}]))
    },
    confidence: { type: "string", enum: ["high","medium","low"] }
  }
};

function extractText(response) {
  if (response.output_text) return response.output_text;
  for (const item of response.output || []) {
    if (item.type !== "message") continue;
    for (const part of item.content || []) {
      if (part.type === "output_text" && part.text) return part.text;
    }
  }
  return "";
}

function collectSources(response) {
  const seen = new Set();
  const sources = [];

  function add(url,title) {
    if (!url || seen.has(url)) return;
    seen.add(url);
    sources.push({ url, label: title || url });
  }

  for (const item of response.output || []) {
    if (item.type === "web_search_call") {
      const actionSources = item.action && Array.isArray(item.action.sources) ? item.action.sources : [];
      for (const source of actionSources) add(source.url, source.title);
    }
    if (item.type === "message") {
      for (const part of item.content || []) {
        for (const ann of part.annotations || []) {
          if (ann.type === "url_citation") add(ann.url, ann.title);
        }
      }
    }
  }

  return sources.slice(0,8);
}

module.exports = async function handler(req,res) {
  if (req.method !== "POST") {
    res.setHeader("Allow","POST");
    return res.status(405).json({error:"POST required"});
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({error:"AI research is not configured on this deployment."});
  }

  const query = String(req.body && req.body.query || "").trim();
  const requestedKind = String(req.body && req.body.kind || "").trim();

  if (!query || !["cigar","cocktail"].includes(requestedKind)) {
    return res.status(400).json({error:"Provide query and kind ('cigar' or 'cocktail')."});
  }

  const instructions = requestedKind === "cigar"
    ? `Research the cigar named by the user. Prefer the cigar maker's official site for blend, origin and vitola. Use reputable cigar publications only to supplement tasting notes or when the manufacturer does not publish a detail. Distinguish factual tobacco construction from sensory interpretation. If several products share the name, choose the most likely exact match from the user's wording. Encode the documented tasting profile into the requested 0–5 flavor vector. strength and body are model estimates unless a source explicitly states them. Do not invent unavailable blend facts; use null when unknown.`
    : `Resolve the cocktail or cocktail recipe named by the user. If the user supplied a recipe, treat that recipe as authoritative. For a named classic without a recipe, research a conventional build using reputable cocktail references. Encode its expected sensory profile into the requested 0–5 flavor vector. intensity means overall alcoholic/flavor intensity from 1–5. Do not invent a branded ingredient when the user did not specify one.`;

  const payload = {
    model: "gpt-5.6-luna",
    tools: [{type:"web_search",search_context_size:"low"}],
    include: ["web_search_call.action.sources"],
    input: [
      {
        role:"system",
        content:`You are the research and normalization layer for Puff ’n Pour, a cigar-and-cocktail pairing app. ${instructions}
Return concise neutral tasting language. IDs must be lowercase URL-safe slugs. Flavor values are integers 0–5 for: ${FLAVOR_KEYS.join(", ")}.`
      },
      {role:"user",content:query}
    ],
    text: {
      format: {
        type:"json_schema",
        name:"puff_n_pour_profile",
        strict:true,
        schema:profileSchema
      }
    },
    max_output_tokens:1200
  };

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + process.env.OPENAI_API_KEY
      },
      body:JSON.stringify(payload)
    });

    const response = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error:"Research request failed.",
        detail:response && response.error ? response.error.message : "Unknown upstream error"
      });
    }

    const text = extractText(response);
    if (!text) return res.status(502).json({error:"AI returned no structured profile."});

    const profile = JSON.parse(text);
    profile.sources = collectSources(response);
    profile.researchedByAI = true;
    profile.verified = false;

    return res.status(200).json({profile});
  } catch (error) {
    return res.status(500).json({error:"Could not research that item.",detail:error.message});
  }
};
