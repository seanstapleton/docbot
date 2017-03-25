module.exports = function(db, passport) {
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var restify = require('restify');
    var botbuilder = require('botbuilder');

    var routes = require('./routes/index');
    var users = require('./routes/users');

    //  Initialize App
    var app = express();
    app.use(express.static('public'));

    //  Configuring Passport
    var session = require('express-session');
    app.use(session({
        secret:'mySecretKey',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // var server = restify.createServer();
    // server.listen(process.env.port || 3978, function() {
    //   console.log("NSA should tune in on port" + server.url);
    // });
    // var connector = new builder.ChatConnector({
    //   appId: process.env.MICROSOFT_APP_ID,
    //   appPassword: process.env.MICROSOFT_APP_PASS
    // });
    // var bot = new builder.UniversalBot(connector);
    // server.post('/api/messages', connector.listen());
    // bot.dialog("/", function(session) {
    //   session.send("Hello World!");
    // });

    var User = require('./models/user.js');
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //  View Engine Setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    //  App Configuration
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    //app.use(express.static(path.join(__dirname, 'public')));

    //  Setup Router File-paths
    var routes = require('./routes/index');

    //  Pass to Routers
    app.use('/users', users);
    app.use(routes(db, passport));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    //  ======== Error Handlers ========

    //  development error handler
    //  will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    //  production error handler
    //  no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

    return app;
}
