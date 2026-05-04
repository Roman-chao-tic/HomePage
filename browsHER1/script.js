// --- Configuration ---
// Make sure to add 'bunny.mp3', 'day.gif', and 'night.gif' into the same folder!
const AUDIO_FILE = 'bunny.mp3'; 
const ANNIVERSARY_DATE = '2025-05-15'; // Adjust year as needed

const emotionsData = {
    "Angry": ["Take a deep breath, Sona.", "I'm here to listen if you want to rant.", "Punch a pillow, then come hug me.", "You are valid in feeling this way.", "Let it out, I've got you.", "This feeling will pass, Sona.", "I'm on your side, always."],
    "Sad": ["Sending you the biggest virtual hug.", "It's okay not to be okay.", "I love you so much, remember that.", "Wish I could hold your hand right now.", "Cry it out if you need to, Sona.", "You mean the world to me.", "Tomorrow is a fresh start."],
    "Happy": ["Your smile makes my day!", "Keep glowing, Sona!", "I love seeing you like this.", "Celebrate every little victory!", "Your happiness is my happiness.", "You're radiant today!", "Let's remember this feeling."],
    "Bored": ["Let's plan our next date!", "Call me?", "Go grab some boba!", "Time to annoy me instead!", "Watch a cute cat video.", "Daydream about us.", "Learn a random new fact!"],
    "Nervous": ["You've got this, Sona. I believe in you.", "Take it one step at a time.", "I'm cheering for you!", "You are stronger than you think.", "Everything will be okay.", "Close your eyes and breathe.", "I'm right behind you."],
    "Lonely": ["I am just a text or call away.", "You are never truly alone, Sona.", "I'm thinking about you right now.", "Looking forward to seeing you next.", "You are deeply loved.", "Wrap yourself in a blanket and pretend it's me.", "I carry you in my heart."]
};

// --- DOM Elements ---
const startOverlay = document.getElementById('start-overlay');
const loadingScreen = document.getElementById('loading-screen');
const loadingBar = document.getElementById('loading-bar');
const openBtn = document.getElementById('open-btn');
const homepage = document.getElementById('homepage');
const audio = new Audio(AUDIO_FILE);

// --- Initialization & Loading ---
startOverlay.addEventListener('click', () => {
    startOverlay.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    
    // Play audio once
    audio.play().catch(e => console.log("Audio play failed:", e));

    // Simulate loading bar
    setTimeout(() => {
        loadingBar.style.width = '100%';
    }, 100);

    // Show open button after 3 seconds
    setTimeout(() => {
        openBtn.classList.remove('hidden');
    }, 3000);
});

openBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0; // Stop audio
    loadingScreen.classList.add('hidden');
    homepage.classList.remove('hidden');
    initializeHomepage();
});

// --- Homepage Logic ---
function initializeHomepage() {
    setBackground();
    updateTimeAndDate();
    calculateDays();
    setInterval(updateTimeAndDate, 1000); // Update clock every second
}

function setBackground() {
    const hour = new Date().getHours();
    // 6 AM to 6 PM is day, otherwise night
    if (hour >= 6 && hour < 18) {
        document.body.style.backgroundImage = "url('day.gif')";
    } else {
        document.body.style.backgroundImage = "url('night.gif')";
    }
}

function updateTimeAndDate() {
    const now = new Date();
    
    // Time format: 24hr HH:MM
    const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    document.getElementById('time').innerText = timeString;

    // Date format: DD/MM/YY
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    
    document.getElementById('dd').innerText = dd;
    document.getElementById('date-text').innerHTML = `<span id="dd" class="red-text">${dd}</span>/${mm}/${yy}`;
}

function calculateDays() {
    const start = new Date(ANNIVERSARY_DATE);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    document.getElementById('eksathe-counter').innerText = `Eksathe for ${diffDays} days`;
}

// --- Fact API Logic ---
document.querySelector('.time-date').addEventListener('click', async () => {
    const cloud = document.getElementById('fact-cloud');
    cloud.classList.toggle('hidden');
    
    if (!cloud.classList.contains('hidden')) {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        
        try {
            // Using Wikimedia API for reliable "On this day" facts
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
            const data = await response.json();
            const fact = data.events[0].text; // Get the first historical event of the day
            cloud.innerText = fact;
        } catch (error) {
            cloud.innerText = "Sona, my fact machine is sleepy today! But fact: I love you.";
        }
    }
});

// --- Emotion Logic & LocalStorage ---
const emotionButtons = document.querySelectorAll('.emotion-btn');
const emotionResponse = document.getElementById('emotion-response');

emotionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const emotion = e.target.getAttribute('data-emotion');
        const sentences = emotionsData[emotion];
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        
        emotionResponse.innerText = randomSentence;
        emotionResponse.classList.remove('hidden');

        // Save history to Chrome Local Storage
        const log = { date: new Date().toISOString(), emotion: emotion };
        chrome.storage.local.get({ emotionHistory: [] }, (result) => {
            const history = result.emotionHistory;
            history.push(log);
            chrome.storage.local.set({ emotionHistory: history });
        });
    });
});