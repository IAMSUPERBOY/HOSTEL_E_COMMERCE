
// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const cors=require('cors');
const PORT = 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Only allow this specific frontend origin
  methods: 'POST', // Allow only the methods required
  allowedHeaders: 'Content-Type' // Allow specific headers if needed
}));

app.post('/saveCredentialsStudent', (req, res) => {
  const { studentid } = req.body;

  // Construct JSON object to save
  const credentials = {studentid };
  console.log(studentid);
  // Write to credentials.json file
 try{

   fs.writeFile('../credentials.json', JSON.stringify(credentials, null, 2), (err) => {
     if (err || studentid===null) {
       console.error("Error writing to file:", err);
       return res.status(500).json({ success: false, error: "Failed to save credentials" });
      }
      res.json({ success: true, message: "Credentials saved successfully" });
    });
  } catch(error)
  {
    return res.status(500).json({ success: false, error: "Incorrect Password" });
    }
  });
app.post('/saveCredentialsOwner', (req, res) => {
  const { ownerid } = req.body;

  // Construct JSON object to save
  const credentials = {ownerid };

  // Write to credentials.json file
  fs.writeFile('../credentials.json', JSON.stringify(credentials, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({ success: false, error: "Failed to save credentials" });
    }
    res.json({ success: true, message: "Credentials saved successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


