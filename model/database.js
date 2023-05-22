require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "mvp",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists Quiz; CREATE TABLE 'Quiz' ('q-id int NOT NULL, 'question' varchar NOT NULL UNIQUE, 'answer_id' int NOT NULL, PRIMARY KEY ('q-id'));";
    "DROP TABLE if exists Answers; CREATE TABLE 'Answers' ('answer_id' int NOT NULL AUTO_INCREMENT, 'answer' varchar NOT NULL UNIQUE, 'concern_id' int NOT NULL, PRIMARY KEY ('answer_id'));";
    "DROP TABLE if exists Skin; CREATE TABLE 'Skin' ( 'concern_id' int NOT NULL AUTO_INCREMENT, 'concern' varchar NOT NULL, 'ingredient_id' int NOT NULL, PRIMARY KEY ('concern_id'));";
    "DROP TABLE if exists Ingredients; CREATE TABLE 'Ingredients' ('ingredient_id' INT NOT NULL AUTO_INCREMENT, 'name' varchar NOT NULL, 'alt-name' varchar NOT NULL, 'benefits' varchar NOT NULL, 'disadvantages' varchar NOT NULL, PRIMARY KEY ('ingredient_id'));";
    "ALTER TABLE 'Quiz' ADD CONSTRAINT 'Quiz_fk0' FOREIGN KEY ('answer_id') REFERENCES 'Answers'('answer_id');"
    "ALTER TABLE 'Answers' ADD CONSTRAINT 'Answers_fk0' FOREIGN KEY ('concern_id') REFERENCES 'Skin'('concern_id');"
    "ALTER TABLE 'Skin' ADD CONSTRAINT 'Skin_fk0' FOREIGN KEY ('concern_id') REFERENCES 'Answers'('concern-id');"
    "ALTER TABLE 'Skin' ADD CONSTRAINT 'Skin_fk1' FOREIGN KEY ('ingredient_id') REFERENCES 'Ingredients'('ingredient_id');"
    con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Tables creation was successful!");

    console.log("Closing...");
  });

  con.end();
});
