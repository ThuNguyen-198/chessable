const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

router.get("/tournaments", async (req, res) => {
  await axios
    .get("https://gcp-test-7l6ho2jzjq-uc.a.run.app/tournaments")
    .then((results) => {
      res.status(200).json(results.data);
    });
});

module.exports = router;
