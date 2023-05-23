const express = require('express');
const router = express.Router();
const db = require("../model/helper");

/* GET answers listing. */
router.get('/', function(req, res, next) {
  db("SELECT * from answers;")
    .then(results => {
      res.send(results.data);
    })
    .catch(error => res.status(500).send(error));
});

// GET one answer
router.get("/:answer_id", async function(req, res) {
  const { answer_id } = req.params;
  try {
    const results = await db(
      `SELECT * FROM answers WHERE id = ${answer_id};`
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ADD an new answer
router.post("/", async function(req, res) {
  const { answer, question_ID } = req.body;
  try {
    const results = await db(
      `INSERT INTO answers (answer, question_ID) VALUES ("${answer}", ${question_ID});`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE an answer
router.delete("/:answer_id", async function(req, res) {
  const { answer_id } = req.params;
  try {
    const results = await db(`DELETE FROM answers WHERE id = ${answer_id};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE an answer
router.put("/:answer_id", async (req, res) => {
  const { answer_id } = req.params;
  const { answer } = req.body;
  try {
    const results = await db(`UPDATE answers SET answer = '${answer}' WHERE id = ${answer_id};`);
    res.send(results.data);
    } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

