const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios");

router.get("", async (req, res) => {
  await axios
    .get("https://gcp-test-7l6ho2jzjq-uc.a.run.app/tables/sponsors")
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/audit", async (req, res) => {
  await axios
    .get("https://gcp-test-7l6ho2jzjq-uc.a.run.app/tables/sponsors_audit")
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      coznsole.log(error);
    });
});

router.delete("/delete/:sponsorID", async (req, res) => {
  await axios
    .delete("https://gcp-test-7l6ho2jzjq-uc.a.run.app/delete/", {
      data: req.params,
    })
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
