const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

router.get("/openings", (req, res) => {
  res.json();
});
module.exports = router;
