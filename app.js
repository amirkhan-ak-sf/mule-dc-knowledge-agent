// app.js
document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const searchButton = document.getElementById('search-button');
    const chatOutput = document.getElementById('chat-output');

    searchButton.addEventListener('click', () => {
        const query = userInput.value.trim();
        if (query) {
            addMessageToChat('User', query);
            fetchAnswer(query);
        }
    });

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        const senderClass = sender.toLowerCase().replace(/\s+/g, '-'); // Ensure no spaces or invalid characters
        messageElement.classList.add('message', senderClass);
    
        // Split the message into lines
        const lines = message.split('\n');
        lines.forEach(line => {
            const lineElement = document.createElement('div');
            lineElement.textContent = line;
            messageElement.appendChild(lineElement);
        });
    
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
    
    function fetchAnswer(query) {
        fetch('https://knowledge-agent-04-7fx768.5sc6y6-3.usa-e2.cloudhub.io/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: query })
        })
        .then(response => response.json())
        .then(data => {
            let botResponse = data.response || `No response for the query: "${query}"`;
            console.log('Bot Response before replacement:', botResponse);
            botResponse = botResponse.replace(/\\n/g, '\n'); // Replacing \n with actual new lines
            console.log('Bot Response after replacement:', botResponse);
            addMessageToChat('Max Mule', botResponse);
        })
        .catch(error => {
            console.error('Error fetching the answer:', error);
            addMessageToChat('Max Mule', 'Sorry, there was an error processing your request.');
        });
    }
    });
