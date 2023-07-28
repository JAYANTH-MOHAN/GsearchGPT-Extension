# GsearchGPT-Extension
An innovative Chrome extension that leverages the power of GPT technology to enhance your search experience. Get instant answers and relevant information based on your Google queries, all within a user-friendly popup window. Unlock the potential of AI assistance while browsing



#### 1. `manifest.json`:
This is the main configuration file for the Chrome extension. It defines the extension's properties, such as its name, version, description, permissions, content scripts, icons, and background script. The manifest file acts as a blueprint for how the extension should behave and interact with the browser.

#### 2. `content_script.js`:
This file contains the JavaScript code that runs on every webpage matched by the `content_scripts` section in the `manifest.json`. In our case, it fetches the user's Google search query, performs API requests to OpenAI's GPT service, and displays the GPT's response in a user-friendly popup window on the page.

#### 3. `popup.html`: 
This HTML file represents the popup window that appears when the user clicks on the extension's icon in the Chrome toolbar. It contains an input field for the user to enter their Chat GPT API key and a "Save" button to save the key.

#### 4. `popup.js`: 
This JavaScript file handles the functionality of the popup window. It retrieves the stored API key from `chrome.storage.sync`, displays it in the input field (if it exists), and saves the new key to the storage when the user clicks "Save." It also sends a message to the background script with the new API key using `chrome.runtime.sendMessage`.

#### 5. `background.js`:
This is the background script that handles communication between the popup and content script using message passing. It listens for messages from the popup, saves the API key to `chrome.storage.sync`, and notifies the content script about the updated API key when it changes.

#### 6. `service-worker.js`:
While not explicitly mentioned in the code provided, this file is referenced in `background.js` as the service worker registration. Service workers can be used for additional functionalities like caching assets for offline access, handling push notifications, and more. In this case, it's used for service worker registration.

These files work together to create a functional Chrome extension that integrates GPT technology to enhance the user's search experience and provides AI-powered assistance while browsing the web.
