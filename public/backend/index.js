require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database");

dotenv.config();
//Initialize routes
const gamesRoute = require("./routes/games");
const openingsRoute = require("./routes/openings");
const playerRoute = require("./routes/players");
const tournamentRoute = require("./routes/tournaments");
const sponsorRoute = require("./routes/sponsors");

app.get("/", (req, res) =>
  res.send("Try: /status, /warehouses, or /warehouses/2")
);

app.get("/status", (req, res) => res.send("Success."));

//GET TABLES ROUTES

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running at: http://localhost:${port}`);
});

app.use("/games", gamesRoute);
app.use("/openings", openingsRoute);
app.use("/players", playerRoute);
app.use("/sponsors", sponsorRoute);
app.use("/tournaments", tournamentRoute);

module.exports = app;
