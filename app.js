var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topicsRouter = require('./routes/topics'); // -new- created - topics
var entriesRouter = require('./routes/entries'); // -new- created - entries


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/topics', topicsRouter); // -new- created - topics
app.use('/entries', entriesRouter); // -new- created - entries

module.exports = app;
