const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'))
let daysWithOut = 0;


function readdaysWithOut() {
    try {
        const fileData = fs.readFileSync('daysWithOut.json');
        const data = JSON.parse(fileData);
        if (data.hasOwnProperty('daysWithOut')) {
            daysWithOut = data.daysWithOut;
            console.log('daysWithOut initialized:', daysWithOut);
        }
    } catch (err) {
        console.error('Error reading daysWithOut:', err);
    }
}

// Function to write the value of daysWithOut to the file
function writedaysWithOut() {
    const jsonData = {
        daysWithOut: daysWithOut
    };
    fs.writeFileSync('daysWithOut.json', JSON.stringify(jsonData, null, 2));
}

function updateJsonFile() {
    const time = new Date();
    const sekundi = time.getSeconds();
    
    
    // Increment daysWithOut every second
    daysWithOut++;
    if (sekundi === 1){
        daysWithOut = 0;
    }

    const jsonData = {
        seconds: sekundi,
        follow: daysWithOut
    };



    // Write the updated JSON data back to the file
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));

    console.log('JSON file updated successfully.');
}

// Read the value of daysWithOut when the server starts
readdaysWithOut();

// Update daysWithOut every second
setInterval(() => {
    updateJsonFile();
    writedaysWithOut(); // Write the value to the file after updating
}, 1000);

// Route to reset daysWithOut
app.get('/reset', (req, res) => {
    if (isWrit)
    daysWithOut = 0;
    writedaysWithOut(); // Write the value to the file after resetting
    res.send('daysWithOut has been reset to 0');
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
