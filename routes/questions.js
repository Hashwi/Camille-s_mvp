var express = require('express');
var router = express.Router();
const db = require("..model/helper.js");

/* GET questions listing. */
router.get('/', function(req, res, next) {
  db("SELECT * from quiz;")
    .then(results => {
      res.send(results.data);
    })
    .catch(error => res.status(500).send(error));
});

// GET one question
router.get("/:q_id", async function(req, res) {
  //your code here
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
  //your code here
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
router.delete("/:q_id", async function(req, res) {
  //your code here
  const { question_id } = req.params;
  try {
    const results = await db(`DELETE FROM quiz WHERE id = ${question_id};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

