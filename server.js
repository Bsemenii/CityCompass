require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const openai = require('openai');
const unsplash = require('./api/unsplash');
const axios = require('axios');
const chatgptapi = require('./api/chatgptapi');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.post('/api/chat', async (req, res) => {
    try {
        const userToken = req.body.token;
        const prompt = req.body.prompt;
        const max_tokens = req.body.max_tokens;

        const response = await chatgptapi.generateTour(userToken, prompt, max_tokens);

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.get('/api/images', async (req, res) => {
    try {
        const query = req.query.query;
        const images = await unsplash.searchPhotos(query);
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));