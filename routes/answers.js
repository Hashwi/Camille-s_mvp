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

// GET one answer with corresponding concerns
router.get("/:answer_id/concerns", async function(req, res) {
  const { answer_id } = req.params;
  try {
    const answersResult = await db(
      `SELECT * FROM answers WHERE id = ${answer_id};`
    );
    const concernsResult = await db(
      `SELECT * FROM concerns WHERE answer_ID = ${answer_id};`
    )

  const id = answersResult.data[0].id;
  const answer = answersResult.data[0].answer;
  const concerns = concernsResult.data.map(object => object.concern);
  const quizOutcome = {id, answer, concerns};

    res.send(quizOutcome);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET one answer with corresponding concerns and ingredients
router.get("/:answer_id", async function(req, res) {
  const { answer_id } = req.params;
  const {id:user_id} = req.user;
  try {
    const useranswers = await db (
      `INSERT INTO useranswers (answer_id, user_id) VALUES ("${answer_id}","${user_id}");`
    )
    const answersResult = await db(
      `SELECT * FROM answers WHERE id = ${answer_id};`
    );
    const concernsResult = await db(
      `SELECT * FROM concerns WHERE answer_ID = ${answer_id};`
    )
    const matchingIngredients = await db(
      `SELECT concerns.id, concerns.concern, concernsIngredients.concern_ID, ingredients.id, ingredients.name, concernsIngredients.ingredient_ID FROM concerns LEFT JOIN concernsIngredients ON concerns.id = concernsIngredients.concern_ID LEFT JOIN ingredients ON ingredients.id = concernsIngredients.ingredient_ID WHERE answer_ID = ${answer_id};`
    )
    const answer = answersResult.data[0].answer;
    const concerns = concernsResult.data.map(object => object.concern); 
    const ingredients = matchingIngredients.data.map(object => object.name);
    const recommendation = {answer, concerns, ingredients};

    res.send(recommendation);
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
  const { answer, question_ID } = req.body;
  try {
    const results = await db(`UPDATE answers SET answer = ("${answer}"), question_ID = (${question_ID}) WHERE id = ${answer_id};`);
    res.send(results.data);
    } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;

