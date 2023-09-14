

// const express = require('express');
// const bodyParser = require('body-parser');
// const { MongoClient } = require('mongodb');

// const app = express();

// // Middleware to parse JSON and text request bodies
// app.use(bodyParser.json());
// app.use(bodyParser.text());

// // MongoDB Connection
// const uri = "mongodb+srv://jigyarth:jigyarth@cluster0.z4u8ffa.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas connection string
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let db;

// async function connectToDatabase() {
//     try {
//         await client.connect();
//         db = client.db('cluster0'); // Replace with your database name
//         console.log('Connected to MongoDB Atlas');
//     } catch (err) {
//         console.error('Error connecting to MongoDB Atlas:', err);
//     }
// }

// connectToDatabase();

// app.get('/check_message', (req, res) => {
//     res.send("GET nahi POST API hit karo baba 😀");
// });

// app.post('/check_message', async (req, res) => {
//     let dataToStore;

//     // Check if the content type is JSON
//     if (req.is('json')) {
//         dataToStore = req.body;
//     } else {
//         // If the content type is not JSON, assume it's plain text and convert it to JSON
//         try {
//             dataToStore = JSON.parse(req.body);
//         } catch (error) {
//             console.error('Error parsing text as JSON:', error);
//             return res.status(400).json({ message: 'Invalid JSON format in the request body.' });
//         }
//     }

//     const { name, message } = dataToStore;

//     try {
//         const result = await db.collection('pastes').insertOne(dataToStore);
//         console.log(`Inserted ${result.insertedCount} document into the collection`);

//         if (message === "Space technology in the service of mankind.") {
//             res.json({ message: `Congrats, ${name}! The message is correct. You have successfully completed all the stages of this challenge. You are a champion!🏆` });
//         } else {
//             res.status(400).json({ message: 'Sorry, the message is incorrect.' });
//         }
//     } catch (error) {
//         console.error('Error storing data:', error);
//         res.status(500).json({ message: 'Error storing data.' });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();

// Middleware to parse JSON and text request bodies
app.use(bodyParser.json());
app.use(bodyParser.text());

// MongoDB Connection
const uri = "mongodb+srv://jigyarth:jigyarth@cluster0.z4u8ffa.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('cluster0'); // Replace with your database name
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
    }
}

// Wrap the connection function in an async function
async function initializeApp() {
    await connectToDatabase();

    app.get('/check_message', (req, res) => {
        res.send("GET nahi POST API hit karo baba 😀");
    });

    app.post('/check_message', async (req, res) => {
        let dataToStore;

        // Check if the content type is JSON
        if (req.is('json')) {
            dataToStore = req.body;
        } else {
            // If the content type is not JSON, assume it's plain text and convert it to JSON
            try {
                dataToStore = JSON.parse(req.body);
            } catch (error) {
                console.error('Error parsing text as JSON:', error);
                return res.status(400).json({ message: 'Invalid JSON format in the request body.' });
            }
        }

        const { name, message } = dataToStore;

        try {
            const result = await db.collection('pastes').insertOne(dataToStore);
            console.log(`Inserted ${result.insertedCount} document into the collection`);

            if (message === "Space technology in the service of mankind.") {
                res.json({ message: `Congrats, ${name}! The message is correct.` });
            } else {
                res.status(400).json({ message: 'Sorry, the message is incorrect.' });
            }
        } catch (error) {
            console.error('Error storing data:', error);
            res.status(500).json({ message: 'Error storing data.' });
        }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Call the async function to initialize the app
initializeApp();
