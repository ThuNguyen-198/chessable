const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios");

router.get("/games", async (req, res) => {
  res.json();
});

module.exports = router;
