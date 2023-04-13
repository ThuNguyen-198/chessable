const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

app.get("/tournaments", (req, res) => {
  connection.query(
    "SELECT * FROM `chessDB`.`Tournaments`",
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});
