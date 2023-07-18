require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const openai = require('openai');
const unsplash = require('./api/unsplash');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

openai.apiKey = process.env.OPENAI_API_KEY;

app.post('/api/chat', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const max_tokens = req.body.max_tokens;

        const response = await openai.Completion.create({
            engine: 'text-davinci-003',
            prompt: prompt,
            max_tokens: max_tokens,
        });

        res.json(response.data.choices[0].text);
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