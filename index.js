const dotenv = require("dotenv");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

app.use(express.json());
app.use(cors());

dotenv.config();
//Initialize routes
const gamesRoute = require("./public/backend/routes/games");
const openingsRoute = require("./public/backend/routes/openings");
const playerRoute = require("./public/backend/routes/players");
const tournamentRoute = require("./public/backend/routes/tournaments");
const sponsorRoute = require("./public/backend/routes/sponsors");

app.get("/status", (req, res) => res.send("Success."));

//GET TABLES ROUTES

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running at: http://localhost:${port}`);
});

app.get("/:query", async (req, res) => {
  await axios.get(
    "https://gcp-test-7l6ho2jzjq-uc.a.run.app/" + req.params.query
  );
});

app.use("/games", gamesRoute);
app.use("/openings", openingsRoute);
app.use("/players", playerRoute);
app.use("/sponsors", sponsorRoute);
app.use("/tournaments", tournamentRoute);

module.exports = app;
