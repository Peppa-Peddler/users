var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var show = require('./routes/show');
var profile = require('./routes/profile');
var logout = require('./routes/logout');
var send = require('./routes/send');
var tsend = require('./routes/tsend');
var clearUser = require('./routes/clearUser');
var reTask = require('./routes/reTask');
var elimTask = require('./routes/elimTask');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret:'bGliZWx1bGEyMDE3bGliZWx1bGEyMDE3'}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);
app.use('/show', show);
app.use('/profile', profile);
app.use('/logout', logout);
app.use('/send', send);
app.use('/tsend', tsend);
app.use('/clearuser', clearUser);
app.use('/reTask', reTask);
app.use('/elimTask', elimTask);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
