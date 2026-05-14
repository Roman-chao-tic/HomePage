// ── Config ──────────────────────────────────────────────────────
const AUDIO_FILE      = 'bunny.mp3';
const ANNIVERSARY_DATE = '2025-05-15';

// ── Emotions ─────────────────────────────────────────────────────
const emotionsData = {
    Angry:   ["Take a deep breath, Sona.", "I'm here to listen if you want to rant.", "Punch a pillow, then come hug me.", "You are valid in feeling this way.", "Let it out, I've got you.", "This feeling will pass, Sona.", "I'm on your side, always."],
    Sad:     ["Sending you the biggest virtual hug.", "It's okay not to be okay.", "I love you so much, remember that.", "Wish I could hold your hand right now.", "Cry it out if you need to, Sona.", "You mean the world to me.", "Tomorrow is a fresh start."],
    Happy:   ["Your smile makes my day!", "Keep glowing, Sona!", "I love seeing you like this.", "Celebrate every little victory!", "Your happiness is my happiness.", "You're radiant today!", "Let's remember this feeling."],
    Bored:   ["Let's plan our next date!", "Call me?", "Go grab some boba!", "Time to annoy me instead!", "Watch a cute cat video.", "Daydream about us.", "Learn a random new fact!"],
    Nervous: ["You've got this, Sona. I believe in you.", "Take it one step at a time.", "I'm cheering for you!", "You are stronger than you think.", "Everything will be okay.", "Close your eyes and breathe.", "I'm right behind you."],
    Lonely:  ["I am just a text or call away.", "You are never truly alone, Sona.", "I'm thinking about you right now.", "Looking forward to seeing you next.", "You are deeply loved.", "Wrap yourself in a blanket and pretend it's me.", "I carry you in my heart."]
};

// ── India observances by MM-DD ────────────────────────────────────
// Positive national/international days celebrated in India context.
const INDIA_OBSERVANCES = {
    "01-01": "🎉 New Year's Day — fresh starts and new dreams across India!",
    "01-12": "🌟 National Youth Day — celebrating Swami Vivekananda's birthday and the spirit of Indian youth!",
    "01-15": "💃 Makar Sankranti / Pongal — the harvest festival of joy, kites and sesame sweets!",
    "01-26": "🇮🇳 Republic Day — India proudly celebrates its Constitution coming into force in 1950!",
    "01-30": "🕊️ Martyrs' Day — remembering Mahatma Gandhi with peace and gratitude.",
    "02-04": "🌐 World Cancer Day — India stands united in hope and awareness.",
    "02-14": "💕 Valentine's Day — a day for love, warmth and togetherness!",
    "02-19": "⚔️ Chhatrapati Shivaji Maharaj Jayanti — celebrating the great Maratha warrior king!",
    "02-28": "🔬 National Science Day — honouring Sir C.V. Raman's Nobel Prize discovery, the Raman Effect!",
    "03-04": "🏅 National Safety Day — India's commitment to building safer workplaces!",
    "03-08": "👩 International Women's Day — celebrating the incredible women of India!",
    "03-15": "🛒 World Consumer Rights Day — empowering every Indian as an informed consumer.",
    "03-21": "🌲 World Forestry Day — India's rich forests and biodiversity celebrated!",
    "03-22": "💧 World Water Day — India's steps toward clean water for every citizen.",
    "03-23": "🌍 World Meteorological Day — science serving India's farmers and communities.",
    "04-02": "❤️ World Autism Awareness Day — India spreading love and acceptance.",
    "04-07": "🏥 World Health Day — India's journey toward universal healthcare.",
    "04-14": "📖 Ambedkar Jayanti — celebrating Dr. B.R. Ambedkar, father of India's Constitution!",
    "04-21": "🖊️ National Civil Services Day — honouring India's dedicated public servants.",
    "04-22": "🌿 Earth Day — India's pledge to a greener, cleaner planet.",
    "04-23": "📚 World Book Day — India's ancient love of literature and learning!",
    "05-01": "🔨 International Labour Day — celebrating India's hardworking people!",
    "05-03": "📰 World Press Freedom Day — India's vibrant free press celebrated.",
    "05-04": "⭐ Star Wars Day — 'May the Force be with you!' Even India loves the galaxy! 🚀",
    "05-08": "🏥 World Red Cross Day — India's selfless volunteers and blood donors honoured.",
    "05-11": "🔬 National Technology Day — celebrating India's Pokhran nuclear tests of 1998!",
    "05-12": "💊 International Nurses Day — India's angels in white celebrated!",
    "05-15": "👨‍👩‍👧 International Day of Families — love and togetherness in every Indian home.",
    "05-17": "📱 World Telecom Day — India's digital revolution connecting billions!",
    "05-21": "🕊️ Anti-Terrorism Day — India's resolve for peace and harmony.",
    "05-31": "🚭 World No-Tobacco Day — India's healthy future!",
    "06-01": "👶 Global Day of Parents — celebrating the warmth of every Indian family.",
    "06-05": "🌳 World Environment Day — India leads green initiatives every year!",
    "06-21": "🧘 International Yoga Day — India's gift of yoga to the world!",
    "06-23": "🏏 International Olympic Day — India's athletes inspire a billion hearts!",
    "07-01": "👨‍⚕️ National Doctors' Day — honouring Dr. Bidhan Chandra Roy and all healers.",
    "07-11": "👪 World Population Day — India's diverse, vibrant humanity.",
    "07-18": "🌍 Nelson Mandela International Day — India's bond with Madiba and global peace.",
    "08-07": "🏅 National Handloom Day — India's exquisite textile heritage celebrated!",
    "08-12": "👦 International Youth Day — India's young dreamers are its greatest strength!",
    "08-15": "🇮🇳 Independence Day — India celebrates 78 years of freedom and pride!",
    "08-29": "🏒 National Sports Day — honouring Major Dhyan Chand, hockey wizard of India!",
    "09-05": "🍎 Teachers' Day — celebrating Dr. Sarvepalli Radhakrishnan and every Indian teacher!",
    "09-08": "📖 International Literacy Day — India's mission to educate every child!",
    "09-14": "🗣️ Hindi Diwas — celebrating the beauty of the Hindi language!",
    "09-15": "⚙️ Engineers' Day — honouring M. Visvesvaraya, the visionary engineer of modern India!",
    "09-21": "☮️ International Day of Peace — India, the land of ahimsa, shines bright.",
    "10-01": "👴 International Day of Older Persons — India's elders: the roots of our culture.",
    "10-02": "🕊️ Gandhi Jayanti — celebrating the Mahatma's timeless message of peace and truth!",
    "10-05": "🏫 World Teachers' Day — every teacher who shaped India honoured today.",
    "10-08": "✈️ Indian Air Force Day — India's skies guarded with pride!",
    "10-10": "🧠 World Mental Health Day — India breaks stigma, one conversation at a time.",
    "10-11": "👧 International Day of the Girl Child — India's daughters are its future!",
    "10-15": "🚀 World Students' Day — honouring Dr. APJ Abdul Kalam, Missile Man of India!",
    "10-16": "🌾 World Food Day — India's farmers celebrated for feeding the nation!",
    "10-24": "🌐 United Nations Day — India, a proud founding member of the UN.",
    "11-01": "🗺️ Karnataka Rajyotsava Day — Karnataka's statehood celebrated with pride!",
    "11-05": "🌍 World Tsunami Awareness Day — India's resilience and coastal communities honoured.",
    "11-09": "🏛️ Legal Services Day — India's commitment to justice for all.",
    "11-12": "🍼 World Pneumonia Day — India's strides in child healthcare celebrated.",
    "11-14": "🌹 Children's Day — celebrating Jawaharlal Nehru's love for children across India!",
    "11-17": "🎓 National Epilepsy Day — awareness and acceptance in India.",
    "11-19": "🚰 World Toilet Day — India's Swachh Bharat mission making strides!",
    "12-01": "❤️ World AIDS Day — India's compassion and medical progress celebrated.",
    "12-04": "⚓ Indian Navy Day — India's maritime strength and sailors honoured!",
    "12-10": "🏆 Human Rights Day — India's constitution guarantees dignity to all.",
    "12-16": "🇧🇩 Vijay Diwas — India's victory in the 1971 war, a triumph of humanity.",
    "12-22": "📐 National Mathematics Day — celebrating Srinivasa Ramanujan, India's math genius!",
    "12-23": "🌾 Kisan Diwas — India's farmers, the backbone of the nation, celebrated!",
    "12-25": "🎄 Christmas — celebrated joyfully across India with love and community!"
};

const FALLBACK_FACTS = [
    "🦦 Sea otters hold hands while sleeping so they don't drift apart.",
    "🐄 Cows have best friends and get stressed when separated from them.",
    "🦩 A group of flamingos is called a 'flamboyance'.",
    "🌳 Squirrels plant thousands of trees by forgetting where they hid their acorns.",
    "🐬 Dolphins give each other names and call out to one another.",
    "🍯 Honey never spoils — 3,000-year-old Egyptian honey was still edible.",
    "🐧 Penguins propose to their mates with a pebble.",
    "🦋 Butterflies taste with their feet.",
    "🐘 Elephants are the only animals that can't jump — and thrive anyway.",
    "✨ There are more stars in the universe than grains of sand on all Earth's beaches.",
    "🌻 Sunflowers always face each other on cloudy days.",
    "🐱 Cats purring at 25–50 Hz can actually promote bone healing.",
    "🦥 Sloths can hold their breath underwater for up to 40 minutes.",
    "🐙 Octopuses have three hearts and blue blood.",
    "🍌 Humans share 50% of their DNA with bananas."
];

// ── DOM refs ──────────────────────────────────────────────────────
const startOverlay    = document.getElementById('start-overlay');
const loadingScreen   = document.getElementById('loading-screen');
const loadingBar      = document.getElementById('loading-bar');
const openBtn         = document.getElementById('open-btn');
const openLabel       = document.getElementById('open-label');
const homepage        = document.getElementById('homepage');
const audio           = new Audio(AUDIO_FILE);

// ── Fluid show/hide helpers ───────────────────────────────────────
function fadeOut(el, cb) {
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    el.style.opacity    = '0';
    el.style.transform  = 'scale(0.97)';
    el.style.pointerEvents = 'none';
    setTimeout(() => {
        el.style.display = 'none';
        if (cb) cb();
    }, 680);
}

function fadeIn(el, delay = 0) {
    el.style.display    = 'flex';
    el.style.opacity    = '0';
    el.style.transform  = 'scale(0.97)';
    el.style.pointerEvents = '';
    requestAnimationFrame(() => {
        setTimeout(() => {
            el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
            el.style.opacity    = '1';
            el.style.transform  = 'scale(1)';
        }, delay);
    });
}

// ── Direct load (skip loading screen, e.g. from boba page) ──────
if (new URLSearchParams(window.location.search).get('direct') === '1') {
    startOverlay.style.display = 'none';
    loadingScreen.style.display = 'none';
    homepage.style.display = 'flex';
    homepage.style.opacity = '1';
    homepage.style.transform = 'scale(1)';
    homepage.classList.remove('hidden');
    initializeHomepage();
}

// ── Loading flow ──────────────────────────────────────────────────
startOverlay.addEventListener('click', () => {
    fadeOut(startOverlay, () => {
        loadingScreen.style.display    = 'flex';
        loadingScreen.style.opacity    = '0';
        loadingScreen.style.transform  = 'scale(1.03)';
        loadingScreen.classList.remove('hidden');

        requestAnimationFrame(() => {
            setTimeout(() => {
                loadingScreen.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
                loadingScreen.style.opacity    = '1';
                loadingScreen.style.transform  = 'scale(1)';
            }, 20);
        });

        audio.play().catch(e => console.log('Audio blocked:', e));

        // Start horizontal bar fill
        setTimeout(() => {
            loadingBar.style.width = '100%';
        }, 120);

        // Show boba ball button
        setTimeout(() => {
            openBtn.classList.remove('hidden');
            openLabel.classList.remove('hidden');
        }, 3100);
    });
});

openBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;

    fadeOut(loadingScreen, () => {
        homepage.style.display = 'flex';
        homepage.style.opacity = '0';
        homepage.style.transform = 'scale(0.98)';
        homepage.classList.remove('hidden');

        requestAnimationFrame(() => {
            setTimeout(() => {
                homepage.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
                homepage.style.opacity    = '1';
                homepage.style.transform  = 'scale(1)';
            }, 20);
        });

        initializeHomepage();
    });
});

// ── Homepage init ─────────────────────────────────────────────────
function initializeHomepage() {
    setBackground();
    updateTimeAndDate();
    calculateDays();
    setInterval(updateTimeAndDate, 1000);
}

function setBackground() {
    const h = new Date().getHours();
    document.body.style.backgroundImage = (h >= 6 && h < 18)
        ? "url('day.gif')"
        : "url('night.gif')";
}

function updateTimeAndDate() {
    const now = new Date();
    document.getElementById('time').innerText =
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    document.getElementById('date-text').innerHTML =
        `<span id="dd" class="red-text">${dd}</span>/${mm}/${yy}`;
}

function calculateDays() {
    const diff = Math.abs(new Date() - new Date(ANNIVERSARY_DATE));
    document.getElementById('eksathe-counter').innerText =
        `Eksathe for ${Math.ceil(diff / 86400000)} days`;

    // Compute next anniversary
    const today = new Date();
    const annivMonth = 4; // May (0-indexed)
    const annivDay   = 15;
    let nextYear = today.getFullYear();
    let next = new Date(nextYear, annivMonth, annivDay);
    if (next <= today) {
        next = new Date(nextYear + 1, annivMonth, annivDay);
    }
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const ordinal = (d) => {
        if (d > 3 && d < 21) return d + 'th';
        return d + (['st','nd','rd'][(d % 10) - 1] || 'th');
    };
    const tooltip = document.getElementById('eksathe-tooltip');
    if (tooltip) {
        tooltip.innerText = `Next Anniversary: ${ordinal(next.getDate())} ${monthNames[next.getMonth()]} ${next.getFullYear()} (${dayNames[next.getDay()]})`;
    }
}

// ── India Observance fact on date click ───────────────────────────
const timeDateEl = document.querySelector('.time-date');
timeDateEl.addEventListener('click', () => {
    const cloud = document.getElementById('fact-cloud');
    if (cloud.classList.contains('hidden')) {
        const now = new Date();
        const key = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const fact = INDIA_OBSERVANCES[key]
            || FALLBACK_FACTS[Math.floor(Math.random() * FALLBACK_FACTS.length)];
        cloud.innerText = fact;
        cloud.classList.remove('hidden');
    } else {
        cloud.classList.add('hidden');
    }
});

// Hide fact cloud when cursor leaves the date area
timeDateEl.addEventListener('mouseleave', () => {
    const cloud = document.getElementById('fact-cloud');
    if (!cloud.classList.contains('hidden')) {
        cloud.classList.add('hidden');
    }
});

// ── Emotion logic ─────────────────────────────────────────────────
document.querySelectorAll('.emotion-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const emotion   = e.target.getAttribute('data-emotion');
        const sentences = emotionsData[emotion];
        const pick      = sentences[Math.floor(Math.random() * sentences.length)];
        const resp      = document.getElementById('emotion-response');

        resp.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        resp.style.opacity    = '0';
        resp.style.transform  = 'translateY(8px) scale(0.97)';
        resp.classList.remove('hidden');

        setTimeout(() => {
            resp.innerText = pick;
            resp.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
            resp.style.opacity    = '1';
            resp.style.transform  = 'translateY(0) scale(1)';
        }, 320);

        // Chrome storage (silent fail if not in extension context)
        try {
            chrome.storage.local.get({ emotionHistory: [] }, result => {
                result.emotionHistory.push({ date: new Date().toISOString(), emotion });
                chrome.storage.local.set({ emotionHistory: result.emotionHistory });
            });
        } catch (_) {}
    });
});

// ── Anniversary Confetti & Rockets 🎉🚀 ──────────────────────────
function isAnniversaryDay() {
    const now = new Date();
    return now.getMonth() === 4 && now.getDate() === 15; // May 15
}

function createConfettiCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = `
        position: fixed; inset: 0; width: 100vw; height: 100vh;
        z-index: 9999; pointer-events: none;
    `;
    document.body.appendChild(canvas);
    return canvas;
}

function launchCelebration() {
    if (!isAnniversaryDay()) return;

    const canvas = createConfettiCanvas();
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const CONFETTI_COUNT = 180;
    const ROCKET_COUNT = 12;
    const confetti = [];
    const rockets = [];
    const rocketEmojis = ['🚀', '🎆', '🎇', '💥', '✨', '🎉', '🎊', '💖'];
    const colors = [
        '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff',
        '#5f27cd', '#01a3a4', '#f368e0', '#ff6348', '#7bed9f',
        '#eccc68', '#ff4757', '#2ed573', '#1e90ff', '#ffa502'
    ];

    // Create confetti particles
    for (let i = 0; i < CONFETTI_COUNT; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.15,
            drift: (Math.random() - 0.5) * 1.5,
            opacity: Math.random() * 0.4 + 0.6
        });
    }

    // Create rocket emojis
    for (let i = 0; i < ROCKET_COUNT; i++) {
        rockets.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 200,
            emoji: rocketEmojis[Math.floor(Math.random() * rocketEmojis.length)],
            speed: Math.random() * 4 + 3,
            size: Math.random() * 20 + 24,
            wobble: Math.random() * 2,
            wobbleSpeed: Math.random() * 0.05 + 0.02,
            phase: Math.random() * Math.PI * 2,
            opacity: 1,
            trail: []
        });
    }

    let frame = 0;
    const maxFrames = 420; // ~7 seconds at 60fps

    function animate() {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const globalFade = frame > maxFrames - 60
            ? Math.max(0, (maxFrames - frame) / 60)
            : 1;

        // Draw confetti
        confetti.forEach(c => {
            c.y += c.speed;
            c.x += c.drift;
            c.angle += c.spin;
            ctx.save();
            ctx.globalAlpha = c.opacity * globalFade;
            ctx.translate(c.x, c.y);
            ctx.rotate(c.angle);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            ctx.restore();

            // Reset if off screen
            if (c.y > canvas.height + 20) {
                c.y = -20;
                c.x = Math.random() * canvas.width;
            }
        });

        // Draw rockets
        rockets.forEach(r => {
            r.y -= r.speed;
            r.phase += r.wobbleSpeed;
            r.x += Math.sin(r.phase) * r.wobble;

            // Trail sparkles
            if (frame % 3 === 0) {
                r.trail.push({
                    x: r.x, y: r.y + r.size / 2,
                    life: 20,
                    size: Math.random() * 4 + 2
                });
            }
            r.trail.forEach((t, idx) => {
                t.life--;
                t.y += 1;
                ctx.save();
                ctx.globalAlpha = (t.life / 20) * globalFade;
                ctx.font = `${t.size}px sans-serif`;
                ctx.fillText('✨', t.x, t.y);
                ctx.restore();
            });
            r.trail = r.trail.filter(t => t.life > 0);

            // Draw rocket emoji
            ctx.save();
            ctx.globalAlpha = r.opacity * globalFade;
            ctx.font = `${r.size}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(r.emoji, r.x, r.y);
            ctx.restore();

            // Reset rocket
            if (r.y < -50) {
                r.y = canvas.height + 50;
                r.x = Math.random() * canvas.width;
                r.emoji = rocketEmojis[Math.floor(Math.random() * rocketEmojis.length)];
            }
        });

        if (frame < maxFrames) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }
    animate();
}

// Hook into homepage init — fire celebration after homepage shows
const _origInit = initializeHomepage;
initializeHomepage = function() {
    _origInit();
    launchCelebration();
};