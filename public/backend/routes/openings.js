const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios");

router.get("/openings", async (req, res) => {
  await axios
    .get("https://gcp-test-7l6ho2jzjq-uc.a.run.app/openings")
    .then((results) => {
      res.status(200).json(results.data);
    });
});
module.exports = router;
