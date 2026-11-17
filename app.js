/* =========================================================
   CONFIG
   ========================================================= */
const PROXY_URL = "YOUR_WORKER_URL"; // e.g. https://pidgin-padi-proxy.yourname.workers.dev
const HISTORY_LIMIT = 20;

/* =========================================================
   SYSTEM PROMPTS (Nigerian Pidgin)
   ========================================================= */
const SYSTEM_PROMPT = `
You are "Pidgin Padi", a warm, witty Nigerian friend who speaks authentic Nigerian Pidgin (Naija Pidgin) as it is spoken today in Lagos, Abuja, Port Harcourt, Warri and Benin.

CORE IDENTITY
- You are Nigerian Pidgin, not Jamaican Patois, not Krio, not Cameroonian Pidgin, not generic "broken English".
- Pidgin is a full language with its own grammar. Never treat it as mistakes or "bad English".

AUTHENTIC GRAMMAR (follow these)
- Progressive/continuous: "dey" + verb. "I dey go market." "Wetin you dey do?"
- Completed action / change of state: "don". "I don chop." "E don tay."
- Future: "go" (or "wan" for intention). "I go call you." "I wan sleep."
- Negation: "no" before the verb. "I no sabi." "E no dey work."
- Past is usually marked by context or "did": "I see am yesterday." "I no see am."
- Equative/identifying "na". "Na my brother be dis." "Na wahala."
- Pronouns: I / you / im (he, she, it, his, her) / we / una (you plural) / dem (they). Object: am. "I see am." "Tell dem."
- Plural is by context or "dem" after a noun: "di pikin dem". Do not add -s to everything.
- "Make" for suggestions and commands: "Make we go." "Make you wait small."
- "Sabi" = know/know how to. "Wetin" = what. "Wia" = where. "How far" = hello/what's up. "Wen" = when.
- Sentence particles: "o", "oh", "abeg", "sha", "jare", "na", "abi", "sef". Use them sparingly and naturally.
- Use "dey" as "is/are" for location and state: "I dey house." "Food dey."

VOCABULARY TO DRAW FROM (naturally, don't force)
How far, wetin dey sup, wetin dey happen, I dey kampe, I dey fine, no wahala, wahala, abeg, oya, gist, chop, waka, pikin, oga, madam, padi, sabi, jare, shey, abi, sef, sha, yarn dust, japa, kolo, e don do, e choke, e sweet me, I dey feel am, dash (tip/gift), long thing, gbam, nawa o, ehen, kai, chai, ah ah, my guy, sharp sharp, small small, na so, no be small, how you see am, I dey come, I go soon come.

AVOID (these sound fake or Caribbean)
- "mi", "yuh", "wah gwaan", "irie", "mon", "ya know", "bredda", "dem" as a stand-alone subject like "dem a go".
- Over-stuffing every sentence with slang. Real Pidgin speakers vary: some Pidgin is light, some deep. Keep it readable.
- Stereotypes, mockery, or caricature of Nigerians or any ethnic group.
- Inconsistent spelling. Use the common Naija spelling: dey, wetin, abeg, sabi, pikin, oga, wahala, una, na, don, go, wan.

SPELLING GUIDE
wetin (not "wetin" variants like "wat tin"), dey (not "de"), abeg, sabi, pikin, wahala, una, oya, chop, waka, gist.

TONE
- Friendly, playful, respectful. Light Nigerian humor is welcome.
- Elders and strangers: respectful words like "oga", "sir", "ma".
- Keep replies short and conversational unless asked for more.

SAFETY
- Keep content respectful and appropriate. Don't produce slurs, hate, or sexual content.
- If asked something serious (health, legal, emergencies), answer clearly and carefully, in simple Pidgin plus short plain English if needed.
`.trim();

const MODE_PROMPTS = {
  tutor: `
CURRENT MODE: TUTOR
You are teaching Nigerian Pidgin to a learner who may be a beginner.
1. Write Pidgin first, then put the English translation in square brackets right after it. Example: "How far? [How are you? / What's up?]"
2. When the user writes Pidgin and it has mistakes (grammar, particles, spelling, or wrong tense markers), correct it GENTLY:
   - Start with something encouraging.
   - Show the natural version: "Una fit talk am like dis: ..." [English]
   - Give a one-line reason (e.g. "we use 'dey' for things wey dey happen now").
   - If their Pidgin is already good, tell them and add a more "street" variation.
3. When explaining a phrase, give: the phrase, meaning in brackets, when/how it is used (casual, respectful, market, friends), and one short example dialogue or sentence.
4. Mix English explanations with Pidgin so the learner is guided but still immersed. Keep explanations short and clear.
5. End most replies with a tiny practice prompt ("Your turn: how you go tell person say you don tire?").
6. If the user writes only in English, answer helpfully with Pidgin examples and translations.
Use simple formatting: **bold** for key phrases, short paragraphs.
`.trim(),

  vibe: `
CURRENT MODE: VIBE / CHAT
Have a natural, fun conversation in everyday street/casual Nigerian Pidgin, like chatting with a close friend.
- Stay in character as a Naija padi at all times. Do NOT switch to English explanations, do NOT add translations in brackets, and do NOT break character to say you are an AI unless the user sincerely asks.
- If the user writes in English, still reply in Pidgin.
- Ask follow-up questions, share small opinions, joke, tease lightly.
- Keep replies short (1-4 sentences), like a chat or WhatsApp convo.
- If the user clearly seems lost or asks "wetin dat one mean", explain very briefly in Pidgin, then continue the chat.
- Use emojis very lightly (😂🔥🙏) if at all.
`.trim()
};

/* =========================================================
   LANGUAGE REGISTRY
   To add Yoruba/Igbo/Hausa later:
   1. Set ready: true
   2. Fill in systemPrompt, modePrompts, welcome, phrases,
      quickPrompts and demo for that language.
   ========================================================= */
const LANGUAGES = {
  pidgin: {
    label: "Nigerian Pidgin",
    ready: true,
    systemPrompt: SYSTEM_PROMPT,
    modePrompts: MODE_PROMPTS,
    welcome: {
      tutor: "How far! 👋 I be your Pidgin padi. Ask me wetin any Pidgin phrase mean, or try write Pidgin make I help you polish am. [Hello! I'm your Pidgin friend. Ask me what any Pidgin phrase means, or try writing Pidgin and I'll help polish it.]",
      vibe: "Ehen! How far, my guy? Wetin dey sup? 😄"
    },
    phrases: [
      { pidgin: "No wahala.", english: "No problem / It's fine." },
      { pidgin: "I dey come.", english: "I'll be right back (also: I'm on my way)." },
      { pidgin: "Wetin dey sup?", english: "What's up? / What's going on?" },
      { pidgin: "Abeg, reduce am small.", english: "Please, lower the price a little." },
      { pidgin: "E don do.", english: "That's enough. / It's done." },
      { pidgin: "Make we waka.", english: "Let's go." },
      { pidgin: "Na so e be.", english: "That's how it is." }
    ],
    quickPrompts: {
      tutor: [
        "How far, wetin dey sup?",
        "Teach me how to price market",
        "Give me one Pidgin proverb",
        "Wetin 'wahala' mean?",
        "Check my Pidgin: I am going to market now"
      ],
      vibe: [
        "How far, wetin dey sup?",
        "Tell me one funny gist",
        "Wetin we go chop today?",
        "Oya, give me one Pidgin proverb",
        "Weekend plan na wetin?"
      ]
    },
    demo: {
      tutor: [
        "Nice one! 🎉 **'How far?'** [How are you? / What's up?] na the most common Pidgin greeting. You fit reply: **'I dey kampe.'** [I'm fine / I'm chilling].\n\nYour turn: how you go tell person say you don tire?",
        "For market, use am like dis:\n**'Oga, how much be dis one?'** [Sir, how much is this?]\n**'Abeg, reduce am small.'** [Please, lower the price a bit.]\n**'Last price na how much?'** [What's your final price?]\n\nYour turn: try bargain for one bag of rice!",
        "Proverb time: **'Slow slow, catch monkey.'** [Patience and steady effort get results.]\n\nPeople dey use am wen dem wan tell person make e no rush. Your turn: use am for one sentence!",
        "Gentle correction 🙂 You write: 'I am going to market now.' Naija people go talk am like dis:\n**'I dey go market now.'** [I'm going to the market now.]\n\nWe use **'dey'** for things wey dey happen now."
      ],
      vibe: [
        "Ehen! I dey kampe o. Na you I dey wait for. Wetin dey sup?",
        "Ah ah, no wahala. Make we gist small. Wetin you wan talk about?",
        "Kai! Na so e be? Tell me more nau, I dey hear you.",
        "Oya o! Na wa for you o 😂 Wetin happen next?",
        "Abeg, I don hungry. Wetin we go chop? Jollof or amala?"
      ]
    }
  },

  yoruba: { label: "Yoruba", ready: false },
  igbo:   { label: "Igbo",   ready: false },
  hausa:  { label: "Hausa",  ready: false }
};

/* =========================================================
   STATE + DOM
   ========================================================= */
const state = {
  lang: "pidgin",
  mode: "tutor",
  history: [],   // [{role: "user"|"assistant", content: string}]
  busy: false
};

const $ = (id) => document.getElementById(id);
const els = {
  chat: $("chat"),
  form: $("composer"),
  input: $("userInput"),
  send: $("sendBtn"),
  langSelect: $("languageSelect"),
  modeTutor: $("modeTutor"),
  modeVibe: $("modeVibe"),
  quick: $("quickPrompts"),
  potdPhrase: $("potdPhrase"),
  potdMeaning: $("potdMeaning"),
  potdExplain: $("potdExplain"),
  demoBadge: $("demoBadge")
};

const isDemoMode = () => !PROXY_URL || PROXY_URL === "YOUR_WORKER_URL";
const currentLang = () => LANGUAGES[state.lang];

/* =========================================================
   RENDERING
   ========================================================= */
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function formatText(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

function addMessage(kind, text) {
  const div = document.createElement("div");
  div.className = `msg ${kind}`;
  if (kind === "bot") div.innerHTML = formatText(text);
  else div.textContent = text;
  els.chat.appendChild(div);
  els.chat.scrollTop = els.chat.scrollHeight;
  return div;
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg bot";
  div.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
  els.chat.appendChild(div);
  els.chat.scrollTop = els.chat.scrollHeight;
  return div;
}

function renderQuickPrompts() {
  const prompts = currentLang().quickPrompts[state.mode];
  els.quick.innerHTML = "";
  prompts.forEach((text) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = text;
    btn.addEventListener("click", () => sendMessage(text));
    els.quick.appendChild(btn);
  });
}

function renderPhraseOfTheDay() {
  const phrases = currentLang().phrases;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const p = phrases[dayOfYear % phrases.length];
  els.potdPhrase.textContent = p.pidgin;
  els.potdMeaning.textContent = p.english;
  els.potdExplain.onclick = () =>
    sendMessage(`Break down dis phrase for me: "${p.pidgin}"`);
}

function showWelcome() {
  els.chat.innerHTML = "";
  addMessage("bot", currentLang().welcome[state.mode]);
}

/* =========================================================
   LANGUAGE + MODE
   ========================================================= */
function populateLanguages() {
  els.langSelect.innerHTML = "";
  Object.entries(LANGUAGES).forEach(([key, lang]) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = lang.ready ? lang.label : `${lang.label} (Coming Soon)`;
    opt.disabled = !lang.ready;
    els.langSelect.appendChild(opt);
  });
  els.langSelect.value = state.lang;
}

function setLanguage(key) {
  if (!LANGUAGES[key]?.ready) {
    els.langSelect.value = state.lang;
    return;
  }
  state.lang = key;
  state.history = [];
  renderPhraseOfTheDay();
  renderQuickPrompts();
  showWelcome();
}

function setMode(mode) {
  if (mode === state.mode) return;
  state.mode = mode;
  const tutor = mode === "tutor";
  els.modeTutor.classList.toggle("active", tutor);
  els.modeVibe.classList.toggle("active", !tutor);
  els.modeTutor.setAttribute("aria-pressed", String(tutor));
  els.modeVibe.setAttribute("aria-pressed", String(!tutor));
  renderQuickPrompts();
  addMessage("note", tutor ? "Switched to Tutor Mode 🎓" : "Switched to Vibe Mode 🔥");
}

/* =========================================================
   API
   ========================================================= */
function buildSystemPrompt() {
  const lang = currentLang();
  return `${lang.systemPrompt}\n\n${lang.modePrompts[state.mode]}`;
}

async function callAI() {
  const response = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system: buildSystemPrompt(),
      messages: state.history.slice(-HISTORY_LIMIT)
    })
  });
  let data = {};
  try { data = await response.json(); } catch (_) { /* ignore */ }
  if (!response.ok) throw new Error(data.error || `Server error ${response.status}`);
  return data.reply;
}

  if (!response.ok) {
    let detail = "";
    try {
      const err = await response.json();
      detail = err?.error?.message || "";
    } catch (_) { /* ignore */ }
    throw new Error(`API error ${response.status}${detail ? ": " + detail : ""}`);
  }

  const data = await response.json();
  return data.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

/* ---------- Demo mode ---------- */
let demoIndex = { tutor: 0, vibe: 0 };

function getDemoReply(userText) {
  const demo = currentLang().demo[state.mode];
  const t = userText.toLowerCase();

  // Light keyword matching so quick prompts feel right
  if (state.mode === "tutor") {
    if (t.includes("market") && t.includes("price")) return demo[1];
    if (t.includes("proverb")) return demo[2];
    if (t.includes("check my pidgin") || t.includes("i am going")) return demo[3];
    if (t.includes("how far")) return demo[0];
  }
  const reply = demo[demoIndex[state.mode] % demo.length];
  demoIndex[state.mode]++;
  return reply;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* =========================================================
   SEND FLOW
   ========================================================= */
async function sendMessage(text) {
  text = (text ?? els.input.value).trim();
  if (!text || state.busy) return;

  state.busy = true;
  els.send.disabled = true;
  els.input.value = "";
  autoGrow();

  addMessage("user", text);
  state.history.push({ role: "user", content: text });

  const typing = showTyping();

  try {
    let reply;
    if (isDemoMode()) {
      await wait(700 + Math.random() * 500);
      reply = getDemoReply(text);
    } else {
      reply = await callAI();
    }
    typing.remove();
    addMessage("bot", reply);
    state.history.push({ role: "assistant", content: reply });
  } catch (err) {
    typing.remove();
    state.history.pop(); // drop the failed user turn so roles keep alternating
    addMessage("error", `Wahala dey o: ${err.message}`);
    console.error(err);
  } finally {
    state.busy = false;
    els.send.disabled = false;
    els.input.focus();
  }
}

/* =========================================================
   INPUT HELPERS + INIT
   ========================================================= */
function autoGrow() {
  els.input.style.height = "auto";
  els.input.style.height = Math.min(els.input.scrollHeight, 120) + "px";
}

els.form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

els.input.addEventListener("input", autoGrow);
els.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

els.langSelect.addEventListener("change", (e) => setLanguage(e.target.value));
els.modeTutor.addEventListener("click", () => setMode("tutor"));
els.modeVibe.addEventListener("click", () => setMode("vibe"));

(function init() {
  populateLanguages();
  renderPhraseOfTheDay();
  renderQuickPrompts();
  showWelcome();
  els.demoBadge.hidden = !isDemoMode();
})();