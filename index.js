const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get('/check_message', (req, res) => {
    res.send("GET nahi POST API hit karo baba 😀");
});

app.post('/check_message', (req, res) => {
    const { name, message } = req.body;

    if (name && message) {
        if (message === "Space technology in the service of mankind.") {
            const dataToStore = `Name: ${name}\nMessage: ${message}\n\n`;

            // Specify the file path for correct messages
            const filePath = path.join(__dirname, 'correct_results.txt');

            // Append the data to the text file for correct messages
            fs.appendFile(filePath, dataToStore, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('Correct data stored successfully.');
                }
            });

            res.json({ message: `Congrats, ${name}! The message is correct. You have successfully completed all the tasks. Good luck!` });
        } else {
            const dataToStore = `Name: ${name}\nMessage: ${message}\n\n`;

            // Specify the file path for incorrect messages
            const filePath = path.join(__dirname, 'incorrect_results.txt');

            // Append the data to the text file for incorrect messages
            fs.appendFile(filePath, dataToStore, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('Incorrect data stored successfully.');
                }
            });

            res.status(400).json({ message: 'Sorry, the message is incorrect.' });
        }
    } else {
        res.status(400).json({ message: 'Invalid data provided.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
