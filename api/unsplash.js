const fetch = require("node-fetch");
const { createApi } = require("unsplash-js");
require('dotenv').config();


global.fetch = fetch;

// Initiate Unsplash API
const unsplash = createApi({ accessKey: process.env.UNSPLASH_KEY });

async function fetchAndWritePhotos(city) {
  // Search photos for a given city
  const photos = await unsplash.search.getPhotos({ query: city });
  return photos;
}

module.exports = fetchAndWritePhotos;





