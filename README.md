# TransitionCommand — Local Test Guide

## Folder Structure
```
TransitionCommand-PWA/
├── index.html        ← Main app (all 12 tabs, wizard, resume builder)
├── manifest.json     ← PWA install metadata
├── sw.js             ← Service worker (offline support)
├── icons/
│   ├── icon-192.png  ← App icon (home screen)
│   └── icon-512.png  ← App icon (splash screen)
└── README.md         ← This file
```

## Option 1 — Test in Browser (Quickest)
Just double-click `index.html`. The app opens directly in your browser.
- All 12 tabs work
- Data saves to localStorage automatically
- PWA/service worker features require a local server (see Option 2)

## Option 2 — Full PWA Test (Recommended before launch)
Run a local HTTPS server so the service worker and install prompt activate:

### Using Python (built into Mac/Linux, install for Windows):
```bash
cd TransitionCommand-PWA
python3 -m http.server 8080
```
Then open: `http://localhost:8080`

### Using Node.js (npx serve):
```bash
npx serve TransitionCommand-PWA
```

### Using VS Code:
Install the "Live Server" extension → right-click `index.html` → "Open with Live Server"

## Option 3 — Test on Phone (Android/iOS)
1. Run the local server (Option 2)
2. Find your computer's IP: run `ipconfig` (Windows) or `ifconfig` (Mac)
3. On your phone browser, go to: `http://YOUR_IP:8080`
4. Android Chrome: tap menu → "Add to Home Screen" to install as PWA
5. iOS Safari: tap Share → "Add to Home Screen"

## Known Items to Test (Bug Hunt Checklist)
- [ ] Wizard: complete all 6 steps, verify profile saves
- [ ] Tasks: check/uncheck items, verify progress bar updates
- [ ] Timeline: set a separation date, verify milestones generate
- [ ] Calendar: verify ICS export downloads correctly
- [ ] Resume Builder: enter data, verify live preview updates
- [ ] MOS Translator: test your MOS/Rate/AFSC code
- [ ] Email Templates: verify auto-fill from profile works
- [ ] Finance Calculator: test retirement pay math
- [ ] All tabs: verify data persists after closing and reopening browser
- [ ] Mobile: test all tabs on phone screen (responsive layout)
- [ ] Edit Profile: tap avatar → verify wizard reopens with saved data

## Data
All data saves to your browser's `localStorage` under key `tc2`.
To reset/start fresh: open browser DevTools → Application → Local Storage → delete `tc2`.

## Version
TransitionCommand v1.0 — Built for Those Who Served
