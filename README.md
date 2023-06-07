# Skincare Ingredients Finder App

With this app, users will be able to go through a series of questions and get skincare ingredients recommendations based on their concerns.

Most skincare quiz on the internet are brand specific and limited in their recommendations to the brand's products.

This website is skincare neophyte friendly as only focuses on the ingredients and not the brands so users can then go out in the wild and know what to look for in the products avalailable to them.

## Setup

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

### Database Prep

Create `.env` file in project directory and add

```
DB_NAME=todos
DB_PASS=YOUR_PASSWORD
```

(replace `YOUR_PASSWORD` with your actual password)

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database mvp;` to create a database in MySQL.

Run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with your actual password)

Run `npm run migrate` in your **TERMINAL**, in the **project** folder (not your MySQL CLI! Open a new terminal window for this). This will create a table called 'items' in your database.

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:5173`
- You can test your API in `http://localhost:4000/api`

## Basic Description

### Database

See [my_mvp schema](/my_mvp.png).

### Back-end / Front-end structure

#### Back-end

Backend files are in the routes folder. They have been split into questions and answers.

##### Questions

5 methods were created for the questions: (only the 2nd one is currently used)

- get all existing questions
- get a specific ID question and the corresponding answers
- add a question to the table
- delete a question from the table
- modify a question

##### Answers

6 methods were created for the answers: (only the 3rd one is currently used)

- get all the existing answers
- get a specific ID answer with the corresponding concern(s)
- get a specific ID answer with the corresponding concern(s) AND ingredients
- add an answer to the table
- delete an answer from the table
- modify an answer

#### Font-end

Front-end files are in the client/src file. They have been split between the App and its components: ExistingUserView and NewUserView.

##### App

The only contains the code to toggle between the 2 views.

##### ExistingUserView

ExistingUserView is the view for registered users. Only the input fields and buttons have been done there at this point.

##### NewUserView

NewUserView contains the skincare quiz and subsequent answers/concerns/ingredients recommandations. 

It has a default welcome page with the first question of the quiz displayed.

It then has 3 functions:

- showQuestionnaire: this function calls the fetch method to get the questions and corresponding answers.
- onAnswerSelected : this function helps keep track of the answers selected during the questionnaire.
- onClickNext: this is the main function. It includes checks that answers have been selected correctcly, it moves on to the next question, adds a loading state to the page and at the last question triggers the result rendering.

### User Flow

When they get on the page, the users will by default be on the registered user page. They can toggle this view on the top right end side of the page.

New user will then be prompted to complete a quiz. 5 questions will be asked with pre-created answers they can click on to select. 
At the end of the quiz, the page will display their results: the concerns pointed out by the answers selected and the corresponding ingredients recommended.

See [quiz](/Questions-answers%20layout.png)

See [styling palette](/My%20MVP%20color%20palette.png)