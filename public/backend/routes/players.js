const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.congif();

router.get("", (req, res) => {
  connection.query(
    "SELECT * FROM `chessDB`.`Players`",
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});
