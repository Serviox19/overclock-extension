// Content Script - Runs on web pages
console.log('Content script loaded on:', window.location.href);

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request);

  if (request.action === 'highlightPage') {
    // Example: Add a temporary highlight effect to the page
    const originalBg = document.body.style.backgroundColor;
    document.body.style.transition = 'background-color 0.5s';
    document.body.style.backgroundColor = '#fff3cd';

    setTimeout(() => {
      document.body.style.backgroundColor = originalBg;
    }, 1000);

    sendResponse({ success: true, message: 'Page highlighted' });
  }

  return true; // Keep message channel open for async response
});

// Example: Inject a notification element
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 14px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transition = 'opacity 0.5s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Example usage
// showNotification('Extension loaded!');
