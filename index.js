const dotenv = require("dotenv");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());

dotenv.config();
//Initialize routes
const gamesRoute = require("./public/backend/routes/games");
const openingsRoute = require("./public/backend/routes/openings");
const playerRoute = require("./public/backend/routes/players");
const tournamentRoute = require("./public/backend/routes/tournaments");
const sponsorRoute = require("./public/backend/routes/sponsors");

app.get("/", (req, res) =>
  res.send("Try: /status, /warehouses, or /warehouses/2")
);

app.get("/status", (req, res) => res.send("Success."));

//GET TABLES ROUTES

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running at: http://localhost:${port}`);
});

app.use("/games", gamesRoute);
app.use("/openings", openingsRoute);
app.use("/players", playerRoute);
app.use("/sponsors", sponsorRoute);
app.use("/tournaments", tournamentRoute);

module.exports = app;
