const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

app.get("/openings", (req, res) => {
  connection.query(
    "SELECT * FROM `chessDB`.`Openings`",
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});
