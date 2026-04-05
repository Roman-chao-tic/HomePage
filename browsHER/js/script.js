// browsHER JS - Optimized, Vanilla, Perf-focused

// Elements
const loading = document.getElementById('loading');
const main = document.getElementById('main');
const openBtn = document.getElementById('openBtn');
const bunnyAudio = document.getElementById('bunnyAudio');
const dayGif = document.getElementById('dayGif');
const nightGif = document.getElementById('nightGif');
const daysCount = document.getElementById('daysCount');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const emotionBubbles = document.getElementById('emotionBubbles');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const factCloud = document.getElementById('factCloud');
const emotionPopup = document.getElementById('emotionPopup');

// Emotions data (placeholder - update with emotions.txt)
const emotions = {
  Angry: [
    'Take deep breaths, it will pass.',
    'Go for a walk to cool down.',
    'Listen to loud music.',
    'Punch a pillow.',
    'Write down what angers you.',
    'Call a friend to vent.',
    'Count to 100 slowly.'
  ],
  Sad: [
    'It\'s okay to cry.',
    'Watch a funny video.',
    'Talk to someone.',
    'Take a warm shower.',
    'Eat comfort food.',
    'Remember good memories.',
    'Get some sunlight.'
  ],
  Happy: [
    'Spread the joy!',
    'Dance around.',
    'Call loved ones.',
    'Do something creative.',
    'Help someone.',
    'Plan something fun.',
    'Savor the moment.'
  ],
  Bored: [
    'Try a new hobby.',
    'Read a book.',
    'Learn something online.',
    'Clean/organize.',
    'Call a friend.',
    'Go outside.',
    'Meditate.'
  ],
  Nervous: [
    'You\'ve got this.',
    'Breathe: 4-7-8.',
    'Visualize success.',
    'Prepare best you can.',
    'Positive affirmations.',
    'Focus on present.',
    'Talk it out.'
  ],
  Lonely: [
    'Reach out to someone.',
    'Join online community.',
    'Pet an animal.',
    'Volunteer.',
    'Self-care time.',
    'Watch feel-good show.',
    'Write in journal.'
  ]
};

// Init
let audioPlayed = false;
document.addEventListener('click', () => {
  if (!audioPlayed) {
    audioPlayed = true;
    bunnyAudio.play().catch(e => console.log('Audio play failed:', e));
  }
}, { once: true });

document.addEventListener('DOMContentLoaded', init);

function init() {
  openBtn.addEventListener('click', openApp);
  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keypress', e => e.key === 'Enter' && doSearch());

  // Create emotion bubbles
  createEmotionBubbles();
  console.log('Emotions bubbles created:', emotionBubbles.children.length);

  // Initial updates
  updateTime();
  updateDayNight();
  updateDays();

  // Update UI loop (perf: RAF)
  requestAnimationFrame(updateLoop);
}

function openApp() {
  // Stop audio if playing
  if (!bunnyAudio.paused) {
    bunnyAudio.pause();
    bunnyAudio.currentTime = 0;
  }
  
  // Transition
  loading.style.opacity = '0';
  loading.style.transition = 'opacity 1s ease-out';
  setTimeout(() => {
    loading.classList.add('hidden');
    main.classList.remove('hidden');
  }, 1000);
}

function updateLoop() {
  updateTime();
  updateDayNight();
  updateDays();
  requestAnimationFrame(updateLoop);
}

function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
  const dateStr = now.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: '2-digit',
    year: '2-digit'
  }).replace(/(\d{2})\/(\d{2})\/(\d{2})/, '$1<span style="color:#DC143C;font-weight:bold;">$1</span>/$2/$3'); // Wait JS, use spans
  timeEl.textContent = timeStr;
  const day = now.toLocaleDateString('en-GB', { day: 'numeric' });
  const month = now.toLocaleDateString('en-GB', { month: '2-digit' });
  const year = now.toLocaleDateString('en-GB', { year: '2-digit' });
  dateEl.innerHTML = `<span style="color:#DC143C;font-weight:bold;">${day}</span>/${month}/${year}`;
}

function updateDayNight() {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  
  dayGif.classList.toggle('hidden', !isDay);
  nightGif.classList.toggle('hidden', isDay);
  if (isDay !== dayGif.classList.contains('hidden')) {
    // Smooth fade handled by CSS
  }
}

function updateDays() {
  const start = new Date('2025-05-15');
  const today = new Date();
  today.setHours(0,0,0,0);
  const diff = today - start;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const remDays = days % 30;
  daysCount.textContent = `${years}y, ${remMonths}m, ${remDays}d`;
}

function createEmotionBubbles() {
  Object.keys(emotions).forEach((emotion, idx) => {
    const bubble = document.createElement('button');
    bubble.className = `emotion-bubble ${emotion.toLowerCase()}`;
    bubble.textContent = emotion;
    bubble.title = emotion;
    bubble.addEventListener('click', () => showEmotionSentence(emotion));
    emotionBubbles.appendChild(bubble);
  });
}

function showEmotionSentence(emotion) {
  console.log('Emotion clicked:', emotion);
  const sentences = emotions[emotion];
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  
  // Save history
  saveEmotionHistory(emotion, randomSentence);
  
  // Popup
  emotionPopup.innerHTML = `<h3>${emotion}</h3><p>${randomSentence}</p><button onclick="closeEmotionPopup()">Close</button>`;
  emotionPopup.classList.remove('hidden');
  console.log('Emotion popup shown');
}

function closeEmotionPopup() {
  emotionPopup.classList.add('hidden');
}

function saveEmotionHistory(emotion, sentence) {
  const history = JSON.parse(localStorage.getItem('emotionHistory') || '[]');
  history.unshift({ emotion, sentence, date: new Date().toISOString() });
  if (history.length > 30) history.pop(); // Last 30
  localStorage.setItem('emotionHistory', JSON.stringify(history));
}

function doSearch() {
  const query = searchInput.value.trim();
  if (query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    searchInput.value = '';
  }
}

// Click date for fact
dateEl.addEventListener('click', getDateFact);

async function getDateFact() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  try {
    // Real API: https://api.onthisdayonthisday.com/api (free tier)
    const response = await fetch(`https://api.onthisdayonthisday.com/v1/day/${month}/${day}?token=YOUR_TOKEN`); // User add token if needed, fallback static
    const data = await response.json();
    
    if (data.events && data.events.length) {
      const fact = data.events[0].html_description || data.events[0].description;
      factCloud.innerHTML = `<div>${fact}</div><button onclick="document.getElementById('factCloud').classList.add('hidden')">Close</button>`;
    } else {
      factCloud.innerHTML = '<div>No events found for today. Try Wikipedia!</div><button onclick="document.getElementById(\'factCloud\').classList.add(\'hidden\')">Close</button>';
    }
  } catch (e) {
    factCloud.innerHTML = '<div>Fact API unavailable. Today is special anyway! ✨</div><button onclick="document.getElementById(\'factCloud\').classList.add(\'hidden\')">Close</button>';
  }
  factCloud.classList.remove('hidden');
}

// Close popups on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('#timeWidget') && !e.target.closest('.cloud, .popup')) {
    factCloud.classList.add('hidden');
    emotionPopup.classList.add('hidden');
  }
});

// PWA ready
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
