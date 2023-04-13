const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

app.get("/games", (req, res) => {
  connection.query(
    "SELECT * FROM `chessDB`.`Games`",
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});
