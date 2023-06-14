const express = require('express');
const fetchAndWritePhotos = require('./api/unsplashapi');
require('dotenv').config();


const app = express();

app.get('/photos/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const photos = await fetchAndWritePhotos(city);
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

