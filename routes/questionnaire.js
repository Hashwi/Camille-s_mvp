const express = require('express');
const router = express.Router();
const db = require("../model/helper");

/* SELECT * FROM table1 
  INNER JOIN table2
  ON table1.id = table2.id; */


// GET all the questionnaire.
router.get('/', function(req, res, next) {
  db("SELECT * from quiz INNER JOIN answers ON quiz.id = answers.question_ID;")
    .then(results => {
      res.send(results.data);
    })
    .catch(error => res.status(500).send(error));
});


// GET one question with all matching answers
router.get("/:question_id", async function(req, res) {
  const { question_id } = req.params;
  try {
    const results = await db(
      `SELECT * FROM quiz INNER JOIN answers ON quiz.id = answers.question_ID WHERE quiz.id = ${question_id};`
      );
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
