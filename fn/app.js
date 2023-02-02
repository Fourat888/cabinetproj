var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PatientRouter = require('./routes/patient');
var UserRouter = require('./routes/user');
var ConsultationRouter = require('./routes/Consultation');
var RDVRouter = require('./routes/RDV');
var DossierPatientRouter = require('./routes/DossierPatient');
var FactureRouter = require('./routes/Facture');

//import database var mongoose =
var mongoose = require('mongoose');
var configDB = require('./database/mongodb.json');
//mongo config const connect =


mongoose.connect(
  configDB.mongo.uri,
  {
    useNewUrlParser:
      true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to DB !!"));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Patient', PatientRouter);
app.use('/User', UserRouter);
app.use('/Consultation', ConsultationRouter);
app.use('/RDV', RDVRouter);
app.use('/DossierPatient', DossierPatientRouter);
app.use('/Facture', FactureRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001, () => {
  console.log("Server is running on port " + 3001);
});

module.exports = app;
