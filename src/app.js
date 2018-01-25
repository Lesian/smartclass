// libraries
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
let session = require('express-session');
let cookieParser = require('cookie-parser');





// local dependencies
const db = require('./db');
const views = require('./routes/views');
// const api = require('./routes/api');


// initialize express app
const app = express();

app.set('view engine', 'ejs');

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sessions should always come after before the routes
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: true
}));

// set routes
app.use('/', views);
// app.use('/api', api);
app.use('/static', express.static('public'));
// app.use('/yelp', yelp);

//use sessions to track logins

app.use(cookieParser());




// 404 route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});






// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});


// port config
const port = 5000; // config variable
const server = http.Server(app);
server.listen(port, function() {
  console.log('Server running on port: ' + port);
});

