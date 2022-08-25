const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const accessTokenMiddleware = require("./api/accessTokenMiddleware")

const app = express();

module.exports = app;

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(accessTokenMiddleware)

const spotifyRouter = require("./api/spotifyRouter");
app.use(spotifyRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
