const express = require ('express');
const mongoose = require ('mongoose');
const app = express ();
const bodyParser = require ('body-parser');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const {port, database} = require ('./config/config');
const {expressValidtor} = require ('express-validator');
const flash = require ('connect-flash');




//Mongoose Connection
mongoose.connect (database.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let db = mongoose.connection;
  db.on ('error', console.error.bind (console, 'connection error:'));
  db.once ('open', function () {
    // we're connected!
    console.log ('connected to db mongodb');
  });



  app.use (express.json ());

  app.use('/assests',express.static('assests'))
//set template engine
app.set ('view engine', 'ejs');
//set static folder
var path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
// app.use(express.static(__dirname + '/public'));
//express json

// parse application/x-www-form-urlencoded
app.use (bodyParser.urlencoded ({extended: false}));
// parse application/json
app.use (bodyParser.json ());
//setup express flash;
app.use (flash());
//express messages middleware

app.use (function (req, res, next) {
  res.locals.messages = require ('express-messages') (req, res);
  next ();
});
// app.use(expressValidtor())

//session application
app.use (
  session ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true},
  })
);
//cookie parser
app.use (cookieParser ());

//Routes
const defaultRouter = require ('./routes/defaultRouter');

app.use ('/', defaultRouter);

app.use ((req, res) => {
  res.status (404).send ('Page Not Found🤞🤞🤞');
});

app.listen (port, () => console.log ('server is running on port 5000'));
