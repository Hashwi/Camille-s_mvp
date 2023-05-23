const express = require('express');
const router = express.Router();
const db = require("../model/helper");

// GET all the questionnaire.
router.get('/', function(req, res, next) {
  db("SELECT * from quiz INNER JOIN answers ON quiz.question_ID = answers.question_ID;")
    .then(results => {
      res.send(results.data);
    })
    .catch(error => res.status(500).send(error));
});


/* SELECT * FROM table1 
  INNER JOIN table2
  ON table1.id = table2.id; */

// GET one question with matchin answers
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

module.exports = router;
