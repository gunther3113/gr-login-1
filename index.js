const express = require('express');
const path = require('path');
const session = require("express-session");
const bodyParser = require('body-parser');
const passport = require('passport');

const result = require('dotenv').config();
if (result.error) {
  throw result.error
}

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret: 'keyboard cat'}))

require('./lib/routes.js')(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
