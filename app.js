const createError = require("http-errors");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
const usersRouter = require('./routes/users');
const JWTValidator = require("./routes/guards/JWTValidator");
const profileRouter = require('./routes/profile');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/index', JWTValidator, indexRouter);
app.use('/api/questions', JWTValidator, questionsRouter);
app.use('/api/answers', JWTValidator, answersRouter);
app.use('/api/profile',JWTValidator,profileRouter);
app.use('/api/users', usersRouter);

module.exports = app;
