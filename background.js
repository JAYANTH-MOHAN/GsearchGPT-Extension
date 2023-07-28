chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'saveApiKey') {
      const apiKey = message.apiKey;
  
      // Save the API key in Chrome storage
      chrome.storage.sync.set({ 'apiKey': apiKey }, function () {
        sendResponse({ success: true });
      });
    }
  });
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function (registration) {
        console.log('Service worker registered:', registration);
      })
      .catch(function (error) {
        console.error('Service worker registration failed:', error);
      });
  }

  // Optional: If you want to handle the case where the user removes the extension or the data is cleared
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync' && changes.apiKey) {
      const apiKey = changes.apiKey.newValue;
  
      // Notify the content script about the updated API key
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'apiKeyUpdated', apiKey: apiKey });
      });
    }
  });
  