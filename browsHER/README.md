# browsHER v2 — Installation Guide

## 🧋 Chrome Extension (Windows / Any Desktop)

### Step 1 — Add your icons
Copy three PNG files into `assets/icons/`:
| File | Size |
|------|------|
| `icon16.png`  | 16×16 px  |
| `icon48.png`  | 48×48 px  |
| `icon128.png` | 128×128 px |

A boba-themed icon has been generated for you — resize it to the three sizes above.

### Step 2 — Load into Chrome
1. Open Chrome → address bar → `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `browsHER` folder (the one containing `manifest.json`)
5. Open a new tab — you'll see browsHER! 🎉

### Step 3 — Share with another computer
1. Zip the entire `browsHER` folder → `browsHER.zip`
2. On the other computer: unzip, then repeat Step 2

> The extension auto-launches as the new-tab page on every new tab — no extra setup needed.

---

## 📱 Android (via Kiwi Browser)
1. On Android, install **Kiwi Browser** (free, supports Chrome extensions)
2. Go to `kiwi://extensions`
3. Enable Developer mode
4. Tap **Load unpacked** → select the `browsHER` folder (or transfer the zip)
5. Done! Opens on every new tab.

---

## 🔧 Assets Checklist
| File | Status |
|------|--------|
| `assets/bunny.mp3`        | ✅ exists |
| `assets/video/day.gif`    | ✅ exists |
| `assets/video/night.gif`  | ✅ exists |
| `assets/icons/icon16.png` | ⚠️ add manually |
| `assets/icons/icon48.png` | ⚠️ add manually |
| `assets/icons/icon128.png`| ⚠️ add manually |

---

## 🌐 Facts API
Uses **Wikipedia's free On This Day API** — no API key needed.
Falls back to built-in facts if offline.

---

## ❤️ Eksathe Counter
Counts from **May 15, 2025**. Edit `js/script.js` line with `2025-05-15` to change the start date.
