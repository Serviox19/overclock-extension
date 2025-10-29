# Chrome Extension Boilerplate

A modern Chrome extension boilerplate using Manifest V3.

## Structure

```
chrome-extension/
├── manifest.json       # Extension configuration
├── popup.html          # Extension popup UI
├── popup.js           # Popup logic
├── background.js      # Background service worker
├── content.js         # Content script (runs on web pages)
├── styles.css         # Popup styles
├── content.css        # Styles injected into web pages
└── icons/             # Extension icons (you need to add these)
```

## Features

- ✅ Manifest V3 compliant
- ✅ Modern ES6+ JavaScript
- ✅ Beautiful, gradient UI design
- ✅ Background service worker
- ✅ Content scripts for page interaction
- ✅ Chrome Storage API integration
- ✅ Message passing between components
- ✅ Permission handling

## Getting Started

### 1. Add Icons

Create an `icons/` directory and add three PNG icons:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

You can create simple icons using any image editor or online tools.

### 2. Load the Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `chrome-extension` directory
5. The extension should now appear in your extensions list

### 3. Test the Extension

1. Click the extension icon in your Chrome toolbar
2. Click the "Click Me" button to increment the counter
3. The page should briefly highlight when you click the button
4. Check the console (F12) for debug messages

## Development

### Modifying the Extension

- **Popup UI**: Edit `popup.html` and `styles.css`
- **Popup Logic**: Edit `popup.js`
- **Background Tasks**: Edit `background.js`
- **Page Interaction**: Edit `content.js` and `content.css`
- **Permissions**: Update `manifest.json`

### Reloading Changes

After making changes:
1. Go to `chrome://extensions/`
2. Click the refresh icon on your extension card
3. Reopen the popup or reload the page you're testing on

### Debugging

- **Popup**: Right-click popup → Inspect
- **Background Script**: Click "Inspect views: service worker" on extension card
- **Content Script**: Use regular page DevTools (F12)

## Key Components

### manifest.json

The manifest defines your extension's properties, permissions, and components.

### popup.html/js

The popup appears when users click your extension icon. It can interact with:
- Chrome Storage API
- Background script
- Content scripts in active tabs

### background.js

The background service worker:
- Runs in the background
- Handles long-running tasks
- Listens for browser events
- Manages extension lifecycle

### content.js

Content scripts:
- Run on web pages matching the patterns in manifest.json
- Can access and modify page DOM
- Have limited access to Chrome APIs
- Can communicate with popup and background scripts

## Chrome APIs Used

- `chrome.storage` - Store and retrieve data
- `chrome.runtime` - Message passing
- `chrome.tabs` - Interact with browser tabs
- `chrome.action` - Control extension icon and popup

## Common Tasks

### Add a New Permission

Edit `manifest.json` and add to the `permissions` array:
```json
"permissions": [
  "storage",
  "activeTab",
  "notifications"
]
```

### Store Data

```javascript
// Save
chrome.storage.sync.set({ key: 'value' });

// Retrieve
chrome.storage.sync.get(['key'], (result) => {
  console.log(result.key);
});
```

### Send Messages

```javascript
// From popup to background
chrome.runtime.sendMessage({ action: 'doSomething' });

// From content script to background
chrome.runtime.sendMessage({ action: 'getData' });

// From popup to content script
chrome.tabs.sendMessage(tabId, { action: 'highlight' });
```

## Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples)

## License

MIT
