const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to save credentials
app.post('/saveCredentials', (req, res) => {
    const credentials = req.body;

    // Specify the path for the JSON file
    const filePath = path.join(__dirname, 'credentials.json');

    // Write the credentials to the JSON file
    fs.writeFile(filePath, JSON.stringify(credentials, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ success: false, message: 'Error saving credentials' });
        }
        res.json({ success: true, message: 'Credentials saved successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
