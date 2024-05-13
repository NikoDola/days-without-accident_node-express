const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));

let isResetting = false;

let daysWithOut = 0;
let total = 0;
let lastActivity = 0;
let hr = 0;
let she = 0;
let si = 0;

function readDataBeforeServerStarts() {
    try {
        const fileData = fs.readFileSync('memory.json');
        const data = JSON.parse(fileData);
        if (data.hasOwnProperty('daysWithOut') && data.hasOwnProperty('total') && data.hasOwnProperty('lastActivity') && data.hasOwnProperty('hr') && data.hasOwnProperty('she') && data.hasOwnProperty('si')) {
            daysWithOut = data.daysWithOut;
            total = data.total;
            lastActivity = data.lastActivity;
            hr = data.hr;
            she = data.she;
            si = data.si;
            console.log('Memory initialized:', daysWithOut, total, lastActivity, hr, she, si);
        }
    } catch (err) {
        console.error('Error reading memory:', err);
    }
}

// Function to write the value of daysWithOut, total, and lastActivity to the file
function writeMemory() {
    const jsonData = {
        daysWithOut,
        total,
        lastActivity,
        hr,
        she,
        si
    };
    fs.writeFileSync('memory.json', JSON.stringify(jsonData, null, 2));
    console.log('Memory written:', jsonData);
}

function updateJsonFile() {
    const time = new Date();
    const sekundi = time.getSeconds();

    // Increment daysWithOut every second if not resetting
    if (!isResetting) {
        daysWithOut++;
        if (sekundi === 1) {
            daysWithOut = 0;
            total = 0;
            lastActivity = 0;
            hr = 0;
            she = 0;
            si = 0;
        }

        const jsonData = {
            seconds: sekundi,
            follow: daysWithOut,
            total,
            lastActivity,
            hr,
            she,
            si
        };

        // Write the updated JSON data back to the file
        fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));

        console.log('JSON file updated successfully:', jsonData);
    }
}

// Read the value of daysWithOut and total when the server starts
readDataBeforeServerStarts();

// Update daysWithOut every second
setInterval(() => {
    updateJsonFile();
    writeMemory(); // Write the value to the file after updating
}, 1000);

// Route to reset daysWithOut
app.get('/reset', (req, res) => {
    const option = req.query.option;
    isResetting = true; // Set the flag to indicate resetting
    total += 1;
    lastActivity = daysWithOut;
    console.log('Before reset - lastActivity:', lastActivity, 'daysWithOut:', daysWithOut);
    daysWithOut = 0;
    
    if (option === 'hr') {
        hr++;
    } else if (option === 'she') {
        she++;
    } else if (option === 'si') {
        si++;
    }

    writeMemory(); // Write the value to the file after resetting
    isResetting = false; // Reset the flag after writing
    console.log('After reset - lastActivity:', lastActivity, 'daysWithOut:', daysWithOut, 'hr:', hr, 'she:', she, 'si:', si);

    res.send('Attribute has been reset to 0');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
