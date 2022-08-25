const axios = require("axios");
const express = require("express");

const baseUrl = "https://api.spotify.com/v1";

// Minions
const spotifyRouter = express.Router();

const processTracks = (response) => {
  const tracks = response.tracks.items;
  return tracks.map((t) => {
    return {
      title: t.name,
      artist: t.artists[0].name,
      album: t.album.name,
      spotifyId: t.id,
    };
  });
};

module.exports = spotifyRouter.get("/spotify", async (req, res, next) => {
  // console.log(req)
  const query = req.query.query;
  const url = `${baseUrl}/search?type=track&limit=10&q=${encodeURI(query)}`;
  const headers = {
    Authorization: `Bearer ${req.accessToken.access_token}`,
    "Content-Type": "application/json",
  };
  const response = await axios.get(url, { headers });
  const data = response.data;
  const processed = processTracks(data);
  res.json(processed);
});
