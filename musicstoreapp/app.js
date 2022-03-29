let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const {MongoClient} = require("mongodb");
const url = 'mongodb+srv://sdi:admin@tiendamusica.dxqcq.mongodb.net/tiendamusica?retryWrites=true&w=majority'

let app = express();
app.set('connectionStrings',url);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let songsRepository = require('./repositories/songsRepository.js');
songsRepository.init(app,MongoClient);
let songsRouter = require("./routes/songs")(app,songsRepository);
let authorsRouter = require('./routes/authors')(app);



// view engine setup
app.set('views', [path.join(__dirname, 'views')]);
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
