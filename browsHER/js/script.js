// ══════════════════════════════════════════════════
//  browsHER v2 — main script
// ══════════════════════════════════════════════════

'use strict';

// ── EMOTION DATA ──────────────────────────────────
const EMOTIONS = {
  Angry: {
    emoji: '😤',
    sentences: [
      "It's okay to feel this way — your feelings are valid, Sona.",
      "Take three slow, deep breaths. In through the nose, out through the mouth.",
      "Step away for a moment. A small walk can cool the storm inside.",
      "Write what you feel on paper — then tear it up if you want.",
      "Put on your angriest playlist and let the music carry it out.",
      "This feeling is temporary. You've overcome hard moments before.",
      "Call someone you trust. You don't have to face this alone."
    ]
  },
  Sad: {
    emoji: '🫧',
    sentences: [
      "It's okay to cry, Sona. Your tears are proof you care deeply.",
      "Let yourself rest. Some days the bravest thing is just to breathe.",
      "Wrap yourself in something warm. You deserve gentleness right now.",
      "Watch something cozy or funny — small joy counts too.",
      "Talk to someone, or just let it out here. I'm listening.",
      "Remember: the sky after rain is always more beautiful.",
      "This sadness will pass, like all seasons do. Hold on."
    ]
  },
  Happy: {
    emoji: '🌸',
    sentences: [
      "Look at you glowing, Sona! Save this feeling in your heart.",
      "Send a voice note to someone you love — share the sunshine.",
      "Dance. Even for one song. Your body deserves this joy too.",
      "Do something creative today — happy energy makes beautiful things.",
      "Treat yourself! You deserve something sweet right now.",
      "Take a photo of this moment. Future-you will be glad you did.",
      "Spread it — happiness grows when you give it away freely."
    ]
  },
  Bored: {
    emoji: '😑',
    sentences: [
      "Boredom is the universe nudging you toward something new, Sona.",
      "Pick up something you kept saying 'I'll do it someday' — today is that day.",
      "Rearrange one small thing in your space. New energy!",
      "Learn one new fact about something you've always been curious about.",
      "Message someone you haven't talked to in a while.",
      "Go outside for even 10 minutes. The world has surprises in it.",
      "Start a journal entry with 'If today were perfect it would be…'"
    ]
  },
  Nervous: {
    emoji: '🦋',
    sentences: [
      "You've prepared more than you think, Sona. Trust yourself.",
      "Try box breathing: in 4s → hold 4s → out 4s → hold 4s.",
      "Butterflies in the stomach are just excitement in disguise.",
      "Visualise it going well — your brain can't tell the difference.",
      "Name three things you can see right now. You are grounded.",
      "Everyone feels this before something that matters. That's human.",
      "The version of you that gets through this is just on the other side."
    ]
  },
  Lonely: {
    emoji: '🌙',
    sentences: [
      "Loneliness means you have so much love to give, Sona. It's a gift.",
      "Reach out to one person today — even just a 'hey, thinking of you'.",
      "Put on your favourite show and let those voices fill the room.",
      "Write a letter to yourself from your future self who made it through.",
      "Pet an animal if you can — their love is immediate and real.",
      "You are never truly alone. Someone, somewhere is thinking of you.",
      "This feeling is a bridge — on the other side is a deeper connection."
    ]
  }
};

// ── FACTS DATA (positive fallback) ──────────────────
const FALLBACK_FACTS = {
  '1/1':  '🎉 New Year\'s Day — every year starts fresh. Today is your blank page!',
  '14/1': '🪁 International Kite Day — let your spirits soar as high as a kite!',
  '24/1': '📚 International Education Day — knowledge is the one gift that grows when shared.',
  '27/1': '🎁 International Holocaust Remembrance Day — today we honour resilience and hope.',
  '2/2':  '🌍 World Wetlands Day — nature is quietly doing incredible things for us.',
  '10/2': '🌹 Teddy Bear Day — small comforts carry big love.',
  '14/2': '💕 Valentine\'s Day — love in all its forms is worth celebrating today.',
  '20/2': '🌸 World Day of Social Justice — kindness is the most radical act.',
  '4/3':  '🙏 World Day of Prayer — a moment to pause, breathe, and feel grateful.',
  '8/3':  '💜 International Women\'s Day — honouring every woman who ever dared to dream.',
  '20/3': '😊 International Day of Happiness — yes, happiness is a UN-declared global goal!',
  '21/3': '🌳 International Day of Forests — trees are silently working to keep us alive.',
  '22/3': '💧 World Water Day — clean water is a quiet miracle we have today.',
  '1/4':  '😄 April Fools\' Day — laughter is literally medicine for the heart.',
  '7/4':  '🩺 World Health Day — your body carries you everywhere. Thank it today.',
  '22/4': '🌿 Earth Day — billions of people around the world chose the planet today.',
  '23/4': '📖 World Book Day — somewhere a book is changing someone\'s whole life.',
  '4/5':  '🚀 Star Wars Day — "May the 4th be with you!" Adventure awaits.',
  '15/5': '👨‍👩‍👧 International Day of Families — the people who chose you, and you chose back.',
  '18/5': '🏛️ International Museum Day — humans have been preserving wonder for centuries.',
  '21/5': '🌍 World Day for Cultural Diversity — our differences are our collective superpower.',
  '31/5': '🌬️ World No Tobacco Day — millions chose health today. Small wins matter.',
  '1/6':  '🧒 Global Day of Parents — thank you to every parent who showed up.',
  '5/6':  '🌱 World Environment Day — every small green choice adds up beautifully.',
  '8/6':  '🌊 World Oceans Day — the sea covers 71% of Earth and it\'s stunning.',
  '21/6': '🧘 International Yoga Day — breathe in, breathe out. You\'ve got this.',
  '30/6': '🌌 Asteroid Day — we\'ve sent humans to the moon. We are remarkable.',
  '11/7': '🌏 World Population Day — 8 billion stories, including yours.',
  '17/7': '😄 World Emoji Day — 🌸💕✨ (no words needed)',
  '30/7': '🤝 International Day of Friendship — reach out to someone you love today.',
  '12/8': '🌟 International Youth Day — young minds are shaping tomorrow right now.',
  '15/8': '🇮🇳 India\'s Independence Day — jai hind! A billion dreams, one home.',
  '19/8': '📸 World Photography Day — someone today captured a moment of pure beauty.',
  '21/8': '🌻 World Honey Bee Day — bees pollinate one third of everything you eat. Tiny heroes.',
  '8/9':  '📝 International Literacy Day — reading opens every door ever built.',
  '21/9': '☮️ International Day of Peace — somewhere right now, people are choosing peace.',
  '27/9': '✈️ World Tourism Day — the world is big and full of wonder waiting for you.',
  '1/10': '👴 International Day of Older Persons — wisdom lives in every wrinkle.',
  '2/10': '🕊️ Gandhi\'s Birthday (International Day of Non-Violence) — one person\'s love changed history.',
  '10/10':'💚 World Mental Health Day — your feelings are valid. You are not alone.',
  '16/10':'🍞 World Food Day — food connects every human culture on Earth.',
  '17/10':'✊ International Day for the Eradication of Poverty — hope is the first step.',
  '31/10':'🎃 Halloween — creativity, costumes and candy. Pure joy!',
  '14/11':'🌍 World Kindness Day (eve) — one kind act today will ripple further than you know.',
  '13/11':'😊 World Kindness Day — choose one small act of kindness. It always matters.',
  '19/11':'🚻 World Toilet Day — 4.2 billion people got better sanitation in the last decade. Progress!',
  '20/11':'🧒 Universal Children\'s Day — every child deserves wonder, safety and love.',
  '21/11':'🌍 World Television Day — stories connect humanity across every border.',
  '25/12':'🎄 Christmas Day — warmth, giving, togetherness. The best parts of being human.',
  '31/12':'🎆 New Year\'s Eve — you carried every single day of this year. That\'s everything.'
};

// Positive keyword filter for Wikipedia events
const POSITIVE_KEYWORDS = [
  'first','discovery','born','founded','launched','achieved','opened','completed',
  'celebrated','awarded','established','invention','record','milestone','peace',
  'independence','freedom','won','pioneered','elected','published','created',
  'international day','world day','recognised','honored','introduced','saved'
];
const NEGATIVE_KEYWORDS = [
  'war','battle','killed','died','disaster','attack','bombing','massacre',
  'earthquake','assassination','crash','collapsed','sank','execution','genocide',
  'riot','invaded','explosion','accident','tragedy','murdered','wounded'
];

function scoreEvent(text) {
  const t = text.toLowerCase();
  const hasNeg = NEGATIVE_KEYWORDS.some(k => t.includes(k));
  if (hasNeg) return -1;
  const posScore = POSITIVE_KEYWORDS.filter(k => t.includes(k)).length;
  return posScore;
}

// ── ELEMENTS ──────────────────────────────────────
const $ = id => document.getElementById(id);
const loadingEl     = $('loading');
const mainEl        = $('main');
const openBtn       = $('openBtn');
const bunnyAudio    = $('bunnyAudio');
const loadingBar    = $('loadingBarFill');
const loadingPct    = $('loadingPct');
const dayGif        = $('dayGif');
const nightGif      = $('nightGif');
const widgetTime    = $('widgetTime');
const widgetDate    = $('widgetDate');
const dateDay       = $('dateDay');
const dateMon       = $('dateMon');
const dateYear      = $('dateYear');
const daysCount     = $('daysCount');
const timeWidget    = $('timeWidget');
const factCloud     = $('factCloud');
const factContent   = $('factContent');
const factClose     = $('factClose');
const searchInput   = $('searchInput');
const searchBtn     = $('searchBtn');
const emotionBubbles= $('emotionBubbles');
const emotionPopup  = $('emotionPopup');
const epEmoji       = $('epEmoji');
const epName        = $('epName');
const epMsg         = $('epMsg');
const epClose       = $('epClose');
const historyToggle = $('historyToggle');
const historyList   = $('historyList');

// ── LOADING ANIMATION ─────────────────────────────
let pct = 0;
const loadInterval = setInterval(() => {
  pct += Math.random() * 18;
  if (pct >= 100) { pct = 100; clearInterval(loadInterval); }
  loadingBar.style.width = pct + '%';
  loadingPct.textContent = Math.floor(pct) + '%';
}, 220);

// Play audio on first interaction
let audioStarted = false;
function tryPlayAudio() {
  if (audioStarted) return;
  audioStarted = true;
  bunnyAudio.volume = 0.6;
  bunnyAudio.play().catch(() => {});
}
document.addEventListener('click', tryPlayAudio, { once: true });
document.addEventListener('keydown', tryPlayAudio, { once: true });

// Open button
openBtn.addEventListener('click', () => {
  // Stop audio
  bunnyAudio.pause();
  bunnyAudio.currentTime = 0;

  loadingEl.classList.add('fade-out');
  setTimeout(() => {
    loadingEl.style.display = 'none';
    mainEl.classList.remove('hidden');
    mainEl.style.display = 'block';
    initMain();
  }, 820);
});

// ── MAIN INIT ─────────────────────────────────────
function initMain() {
  buildEmotionBubbles();
  updateClock();
  updateDayNight();
  updateDays();
  startClock();
  addScrollHint();
}

// ── CLOCK ─────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const hh  = String(now.getHours()).padStart(2, '0');
  const mm  = String(now.getMinutes()).padStart(2, '0');
  const ss  = String(now.getSeconds()).padStart(2, '0');
  widgetTime.textContent = `${hh}:${mm}:${ss}`;

  const dd  = String(now.getDate()).padStart(2, '0');
  const mo  = String(now.getMonth() + 1).padStart(2, '0');
  const yr  = String(now.getFullYear()).slice(-2);
  dateDay.textContent  = dd;
  dateMon.textContent  = mo;
  dateYear.textContent = yr;
}

function startClock() {
  setInterval(updateClock, 1000);
}

// ── DAY / NIGHT GIF ───────────────────────────────
let currentMode = null;
function updateDayNight() {
  const h = new Date().getHours();
  const isDay = h >= 6 && h < 18;
  const mode = isDay ? 'day' : 'night';
  if (mode === currentMode) return;
  currentMode = mode;

  if (isDay) {
    dayGif.classList.add('active');
    nightGif.classList.remove('active');
  } else {
    nightGif.classList.add('active');
    dayGif.classList.remove('active');
  }
}
setInterval(updateDayNight, 60_000); // check every minute

// ── EKSATHE COUNTER ───────────────────────────────
function updateDays() {
  const start = new Date('2025-05-15T00:00:00');
  const now   = new Date();
  const diff  = now - start;
  if (diff < 0) { daysCount.textContent = 'soon ❤️'; return; }

  const totalDays = Math.floor(diff / 86_400_000);
  const years     = Math.floor(totalDays / 365);
  const months    = Math.floor((totalDays % 365) / 30);
  const days      = totalDays % 30;

  let parts = [];
  if (years)  parts.push(`${years}y`);
  if (months) parts.push(`${months}m`);
  parts.push(`${days}d`);
  daysCount.textContent = parts.join(' ') + ' ✨';
}

// ── TODAY's FACT ──────────────────────────────────
timeWidget.addEventListener('click', toggleFact);
timeWidget.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggleFact(); });
factClose.addEventListener('click', e => { e.stopPropagation(); factCloud.classList.add('hidden'); });

let factLoaded = false;
let cachedFact = null;

async function toggleFact() {
  if (!factCloud.classList.contains('hidden')) {
    factCloud.classList.add('hidden');
    return;
  }
  factCloud.classList.remove('hidden');
  if (factLoaded && cachedFact) {
    factContent.textContent = cachedFact;
    return;
  }
  factContent.textContent = '✨ Finding something wonderful…';

  const now = new Date();
  const d   = now.getDate();
  const m   = now.getMonth() + 1;

  try {
    const base = `https://en.wikipedia.org/api/rest_v1/feed/onthisday`;
    const sig  = AbortSignal.timeout(6000);

    // 1. Try holidays first — always positive
    const hRes  = await fetch(`${base}/holidays/${m}/${d}`, { signal: sig });
    if (hRes.ok) {
      const hData = await hRes.json();
      const holidays = hData.holidays || [];
      if (holidays.length) {
        const h = holidays[Math.floor(Math.random() * holidays.length)];
        cachedFact = `🌟 ${h.text}`;
        factContent.textContent = cachedFact;
        factLoaded = true;
        return;
      }
    }

    // 2. Fall through to events — score & pick most positive
    const eRes = await fetch(`${base}/events/${m}/${d}`, { signal: AbortSignal.timeout(5000) });
    if (eRes.ok) {
      const eData  = await eRes.json();
      const events = (eData.events || []).slice(0, 30);
      const scored = events
        .map(e => ({ text: e.text, year: e.year, score: scoreEvent(e.text) }))
        .filter(e => e.score >= 0)
        .sort((a, b) => b.score - a.score);

      if (scored.length) {
        // Pick from top 5 positive results randomly for variety
        const top  = scored.slice(0, 5);
        const pick = top[Math.floor(Math.random() * top.length)];
        cachedFact = `✨ On this day in ${pick.year}: ${pick.text}`;
        factContent.textContent = cachedFact;
        factLoaded = true;
        return;
      }
    }
  } catch (_) {}

  // 3. Curated positive fallback
  const key = `${d}/${m}`;
  cachedFact = FALLBACK_FACTS[key] || positiveGeneric(d, m);
  factContent.textContent = cachedFact;
  factLoaded = true;
}

function positiveGeneric(d, m) {
  const msgs = [
    `🌸 Today — ${d}/${m} — is a day no one has ever lived before. Make it yours.`,
    `💫 Something incredible happened on ${d}/${m} in history. And something incredible is happening now — you're here.`,
    `🌻 The world is 4.5 billion years old and it saved today just for you, Sona.`,
    `☀️ Every ${d}/${m} that ever existed is unique. This one belongs to you.`,
    `🌈 On ${d}/${m}, somewhere in the world, something beautiful is being born.`
  ];
  return msgs[(d + m) % msgs.length];
}

// Reset fact cache at midnight
const resetAtMidnight = () => {
  const now = new Date();
  const ms  = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
  setTimeout(() => { factLoaded = false; resetAtMidnight(); }, ms);
};
resetAtMidnight();

// ── EMOTION BUBBLES ───────────────────────────────
function buildEmotionBubbles() {
  emotionBubbles.innerHTML = '';
  Object.entries(EMOTIONS).forEach(([name, data]) => {
    const btn = document.createElement('button');
    btn.className = `emotion-bubble ${name.toLowerCase()}`;
    btn.setAttribute('role', 'listitem');
    btn.setAttribute('aria-label', name);
    btn.innerHTML = `
      <span class="bubble-emoji">${data.emoji}</span>
      <span class="bubble-label">${name}</span>
    `;
    btn.addEventListener('click', () => showEmotion(name, data));
    emotionBubbles.appendChild(btn);
  });
}

function showEmotion(name, data) {
  const idx = Math.floor(Math.random() * data.sentences.length);
  const msg = data.sentences[idx];

  epEmoji.textContent = data.emoji;
  epName.textContent  = name;
  epMsg.textContent   = msg;
  emotionPopup.classList.remove('hidden');

  saveEmotion(name, msg);
}

epClose.addEventListener('click', () => emotionPopup.classList.add('hidden'));
emotionPopup.addEventListener('click', e => {
  if (e.target === emotionPopup) emotionPopup.classList.add('hidden');
});

// ── EMOTION HISTORY ───────────────────────────────
function saveEmotion(emotion, msg) {
  const history = getHistory();
  history.unshift({ emotion, msg, ts: Date.now() });
  if (history.length > 50) history.length = 50;
  try { localStorage.setItem('bh_emotions', JSON.stringify(history)); } catch(_) {}
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem('bh_emotions') || '[]'); } catch(_) { return []; }
}

historyToggle.addEventListener('click', () => {
  const open = !historyList.classList.contains('hidden');
  if (open) {
    historyList.classList.add('hidden');
    historyToggle.textContent = '📖 View feeling history';
    return;
  }
  const history = getHistory();
  if (!history.length) {
    historyList.innerHTML = '<div class="history-item"><span class="hi-msg">No history yet. Click a bubble!</span></div>';
  } else {
    historyList.innerHTML = history.slice(0, 20).map(h => {
      const e = EMOTIONS[h.emotion];
      const emoji = e ? e.emoji : '💬';
      const d = new Date(h.ts);
      const dateStr = `${d.getDate()}/${d.getMonth()+1} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
      return `<div class="history-item">
        <span class="hi-emotion">${emoji} ${h.emotion}</span>
        <span class="hi-msg">${h.msg}</span>
        <span class="hi-date">${dateStr}</span>
      </div>`;
    }).join('');
  }
  historyList.classList.remove('hidden');
  historyToggle.textContent = '✕ Close history';
});

// ── SEARCH ────────────────────────────────────────
searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

function doSearch() {
  const q = searchInput.value.trim();
  if (!q) return;
  const isUrl = /^(https?:\/\/|www\.)/i.test(q);
  const url   = isUrl ? (q.startsWith('http') ? q : 'https://' + q) : `https://www.google.com/search?q=${encodeURIComponent(q)}`;
  window.location.href = url;
}

// ── SCROLL HINT ───────────────────────────────────
function addScrollHint() {
  const hint = document.createElement('div');
  hint.className = 'scroll-hint';
  hint.id = 'scrollHint';
  hint.innerHTML = `<div class="scroll-arrow"></div><span>How are you feeling?</span>`;
  mainEl.appendChild(hint);

  const sa = $('scrollArea');
  sa.addEventListener('scroll', () => {
    if (sa.scrollTop > 60) hint.style.opacity = '0';
    else hint.style.opacity = '';
  }, { passive: true });
}

// ── GLOBAL CLICK TO CLOSE FACT ────────────────────
document.addEventListener('click', e => {
  if (!factCloud.contains(e.target) && e.target !== timeWidget && !timeWidget.contains(e.target)) {
    factCloud.classList.add('hidden');
  }
});