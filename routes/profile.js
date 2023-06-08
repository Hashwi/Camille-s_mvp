const express = require('express');
const router = express.Router();
const db = require("../model/helper");
const { sign } = require('jsonwebtoken');

router.get("/:id", async function(req, res) {
  const {id} = req.params;
  try {
    const results = await db(`SELECT * FROM useranswers WHERE user_id = ${id}`);
    if (results.data.length) {
      res.send(results.data);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

module.exports = router;
