export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || "*";
    const cors = {
      "Access-Control-Allow-Origin": allowed,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    const json = (obj, status = 200) =>
      new Response(JSON.stringify(obj), {
        status,
        headers: { "Content-Type": "application/json", ...cors }
      });

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: "POST only" }, 405);

    const origin = request.headers.get("Origin") || "";
    if (allowed !== "*" && origin !== allowed) {
      return json({ error: "Origin not allowed" }, 403);
    }

    // ---- Validate input ----
    let body;
    try { body = await request.json(); } catch { return json({ error: "Bad JSON" }, 400); }
    const { system, messages } = body || {};
    if (typeof system !== "string" || system.length > 12000 ||
        !Array.isArray(messages) || messages.length === 0 || messages.length > 24) {
      return json({ error: "Bad request" }, 400);
    }
    const contents = [];
    for (const m of messages) {
      if (!m || typeof m.content !== "string" || m.content.length > 3000 ||
          (m.role !== "user" && m.role !== "assistant")) {
        return json({ error: "Bad message" }, 400);
      }
      contents.push({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      });
    }

    // ---- Optional daily limit per visitor (needs a KV binding named RATE_KV) ----
    if (env.RATE_KV) {
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const key = `rl:${ip}:${day}`;
      const used = parseInt((await env.RATE_KV.get(key)) || "0", 10);
      const limit = parseInt(env.DAILY_LIMIT || "30", 10);
      if (used >= limit) {
        return json({ error: `Daily limit of ${limit} messages don reach. Come back tomorrow!` }, 429);
      }
      await env.RATE_KV.put(key, String(used + 1), { expirationTtl: 90000 });
    }

    // ---- Call Gemini ----
    const model = env.GEMINI_MODEL || "gemini-flash-latest";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: { maxOutputTokens: 1200, temperature: 0.9 }
      })
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) return json({ error: data?.error?.message || "Gemini error" }, r.status);

    const text = (data.candidates?.[0]?.content?.parts || [])
      .map((p) => p.text || "").join("").trim();
    if (!text) return json({ error: "Empty reply. Try rephrasing." }, 502);

    return json({ reply: text });
  }
};