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

  let sql = "DROP TABLE if exists quiz; DROP TABLE if exists answers; DROP TABLE if exists concerns; DROP TABLE if exists `concerns-ingredients`; DROP TABLE if exists ingredients; CREATE TABLE quiz(id INT NOT NULL AUTO_INCREMENT, question VARCHAR(255) not null, PRIMARY KEY (id)); CREATE TABLE answers(id INT NOT NULL AUTO_INCREMENT, answer VARCHAR(255), question_ID INT DEFAULT 0 NOT NULL, PRIMARY KEY (id)); CREATE TABLE concerns(id INT NOT NULL AUTO_INCREMENT, concern VARCHAR(255), answer_ID INT DEFAULT 0 NOT NULL, PRIMARY KEY (id)); CREATE TABLE `concerns-ingredients` (concern_ID INT DEFAULT 0 NOT NULL, ingredient_ID INT DEFAULT 0 NOT NULL); CREATE TABLE ingredients(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), altname VARCHAR(255), role VARCHAR(255),  description VARCHAR(255),  details VARCHAR(255), rating VARCHAR(255), PRIMARY KEY (id)); INSERT INTO quiz (id, question) VALUES (1, 'How would you describe your skin type?'); INSERT INTO quiz (id, question) VALUES (2, 'Do you have sensitive skin?'); INSERT INTO quiz (id, question) VALUES (3, 'What are your main concerns? Select up to 3.'); INSERT INTO quiz (id, question) VALUES (4, 'What about your eye area?'); INSERT INTO quiz (id, question) VALUES (5, 'What age group do you belong to?'); INSERT INTO answers VALUES (1, 'Dry', 1); INSERT INTO answers VALUES (2, 'Balanced', 1); INSERT INTO answers VALUES (3, 'Oily', 1); INSERT INTO answers VALUES (4, 'Combination', 1); INSERT INTO answers VALUES (5, 'Signs of congestion', 3); INSERT INTO answers VALUES (6, 'Dryness/ dehydration', 3); INSERT INTO answers VALUES (7, 'Dullness', 3); INSERT INTO answers VALUES (8, 'Signs of aging', 3); INSERT INTO answers VALUES (9, 'Irregular skin texture', 3); INSERT INTO answers VALUES (10, 'Uneven skin tone', 3); INSERT INTO answers VALUES (11, 'Active acne breakouts', 3); INSERT INTO answers VALUES (12, 'Post acne scars', 3); INSERT INTO answers VALUES (13, 'Under 20', 5); INSERT INTO answers VALUES (14, '20 - 29', 5); INSERT INTO answers VALUES (15, '30 - 39', 5); INSERT INTO answers VALUES (16, '40 - 49', 5); INSERT INTO answers VALUES (17, '50+', 5); INSERT INTO answers VALUES (18, 'Prefer not to say', 5); INSERT INTO answers VALUES (19, 'Not at all', 2); INSERT INTO answers VALUES (20, 'Sometimes', 2); INSERT INTO answers VALUES (21, 'Yes', 2); INSERT INTO answers VALUES (22, 'Not sure', 2); INSERT INTO answers VALUES (23, 'Dark circles', 4); INSERT INTO answers VALUES (24, 'Puffiness', 4); INSERT INTO answers VALUES (25, 'Fine lines', 4); INSERT INTO answers VALUES (26, 'All three', 4); INSERT INTO answers VALUES (27, 'None', 4);INSERT INTO concerns VALUES (1, 'dry skin', 1); INSERT INTO concerns VALUES (2, 'oily skin', 3); INSERT INTO concerns VALUES (3, 'combination skin', 4); INSERT INTO concerns VALUES (4, 'white heads/black heads', 5); INSERT INTO concerns VALUES (5, 'dehydrated skin', 6); INSERT INTO concerns VALUES (6, 'dull skin', 7); INSERT INTO concerns VALUES (7, 'mature skin', 8); INSERT INTO concerns VALUES (8, 'accumulated dead skin', 9); INSERT INTO concerns VALUES (9, 'sun damage', 10); INSERT INTO concerns VALUES (10, 'acne', 11); INSERT INTO concerns VALUES (11, 'acne scarring', 12); INSERT INTO concerns VALUES (12, 'mature skin', 17); INSERT INTO concerns VALUES (13, 'sensitive skin', 20); INSERT INTO concerns VALUES (14, 'sensitive skin', 21); INSERT INTO concerns VALUES (15, 'sensitive skin', 22);  INSERT INTO concerns VALUES (16, 'under eye dark circles', 23); INSERT INTO concerns VALUES (17, 'under eye puffiness', 24); INSERT INTO concerns VALUES (18, 'mature skin', 25); INSERT INTO concerns VALUES (19, 'mature skin', 26); INSERT INTO concerns VALUES (20, 'under eye dark circles', 26); INSERT INTO concerns VALUES (21, 'under eye puffiness', 26);";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Tables creation was successful!");

    console.log("Closing...");
  });

  con.end();
});