chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'saveApiKey') {
    const apiKey = message.apiKey;

    // Use the API key for subsequent API requests
    const endpoint = 'https://api.openai.com/v1/completions';
    const maxToken = 50;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
 

    const url = new URL(window.location.href);
    const search = url.search;
    const searchparam = new URLSearchParams(search);
    const q = searchparam.get('q');



    fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: q,
        max_tokens: maxToken,
        temperature: 0,
      })
    })
      .then(response => response.json())
      .then(data => {
        const completion = data.choices[0].text;
        const divElement = document.createElement('div');

        // Set the text content of the div
        divElement.textContent = completion;

        // Set CSS styles for the div
        divElement.style.width = '100';
        divElement.style.padding = '20px';
        divElement.style.margin = '20px';
        divElement.style.borderRadius = '4px';

        divElement.style.position = 'absolute';
        divElement.style.bottom = '0';
        divElement.style.right = '0';
        divElement.style.width = '200px';
        divElement.style.backgroundColor = 'lightblue';

        divElement.style.textAlign = 'center';

        // Append the div element to the body of the document
        document.body.appendChild(divElement);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
});
