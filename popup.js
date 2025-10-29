// Popup JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const actionBtn = document.getElementById('actionBtn');
  const clearBtn = document.getElementById('clearBtn');
  const statusDiv = document.getElementById('status');
  const countDisplay = document.getElementById('count');

  // Load saved count from storage
  chrome.storage.sync.get(['count'], function(result) {
    const count = result.count || 0;
    countDisplay.textContent = count;
  });

  // Action button click handler
  actionBtn.addEventListener('click', async function() {
    // Get current count
    const result = await chrome.storage.sync.get(['count']);
    const newCount = (result.count || 0) + 1;

    // Save new count
    await chrome.storage.sync.set({ count: newCount });
    countDisplay.textContent = newCount;

    // Update status
    statusDiv.textContent = 'Button clicked!';
    statusDiv.style.color = '#4CAF50';

    // Send message to background script
    chrome.runtime.sendMessage({
      action: 'buttonClicked',
      count: newCount
    }, function(response) {
      console.log('Response from background:', response);
    });

    // Get active tab and send message to content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, {
      action: 'highlightPage',
      count: newCount
    });
  });

  // Clear button click handler
  clearBtn.addEventListener('click', async function() {
    await chrome.storage.sync.set({ count: 0 });
    countDisplay.textContent = '0';
    statusDiv.textContent = 'Count reset!';
    statusDiv.style.color = '#FF5722';
  });
});
