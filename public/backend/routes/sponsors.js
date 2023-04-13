const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

app.get("/sponsors", (req, res) => {
  connection.query(
    "SELECT * FROM `chessDB`.`Sponsors`",
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});
