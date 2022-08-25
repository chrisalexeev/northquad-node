const axios = require("axios").default;
const qs = require("qs");
require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

let accessToken = null;
const url = "https://accounts.spotify.com/api/token";

const authOptions = {
  headers: {
    Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

function timeInSeconds() {
  return Date.now() / 1000;
}

async function getAccessToken() {
  const res = await axios.post(
    url,
    qs.stringify({ grant_type: "client_credentials" }),
    authOptions
  );
  const data = res.data;
  data.expires_at = data.expires_in + timeInSeconds;
  return data;
}

module.exports = async function (req, _, next) {
  if (!accessToken || accessToken.expires_at <= timeInSeconds) {
    accessToken = await getAccessToken();
  }
  req.accessToken = accessToken;
  next();
};
