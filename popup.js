document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKeyInput');
    const saveApiKeyButton = document.getElementById('saveApiKey');
  
    saveApiKeyButton.addEventListener('click', function () {
      const apiKey = apiKeyInput.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'saveApiKey', apiKey: apiKey });
      });
      window.close(); // Close the popup window after sending the API key
    });
  });