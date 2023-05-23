var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET questions listing. */
router.get('/', function(req, res, next) {
  db("SELECT * from quiz;")
    .then(results => {
      res.send(results.data);
    })
    .catch(error => res.status(500).send(error));
});

// GET one question
router.get("/:question_id", async function(req, res) {
  const { question_id } = req.params;
  try {
    const results = await db(
      `SELECT * FROM quiz WHERE id = ${question_id};`
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ADD a new question
router.post("/", async function(req, res) {
  const { question } = req.body;
  try {
    const results = await db(
      `INSERT INTO quiz (question) VALUE ("${question}");`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE a question
router.delete("/:question_id", async function(req, res) {
  const { question_id } = req.params;
  try {
    const results = await db(`DELETE FROM quiz WHERE id = ${question_id};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE a question
router.put("/:question_id", async (req, res) => {
  const { question_id } = req.params;
  const { question } = req.body;
  try {
    const results = await db(`UPDATE quiz SET question = '${question}' WHERE id = ${question_id};`);
    res.send(results.data);
    } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

