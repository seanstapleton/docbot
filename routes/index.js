module.exports = function(db, passport) {
    var express = require('express');
    var router = express.Router(mergeParams=true);
    var path = require('path');
    var diagnose = require('./diagnose');

    var LocalStrategy = require('passport-local').Strategy;

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, '../public','index.html'));
    });

    /* POST Register & Passport Handover*/
    var register = require('../passport/register.js')(passport);
    router.post('/register', function(req,res,next) {
        passport.authenticate('register', function(err, newUser, info) {
            if(err) {
                return next(err);
            }

            if(!newUser) {
                return res.send({success: false});
            }

            console.log("Registered");
        })(req,res,next);
    });

    /* POST Login & Passport Handover */
    var login = require('../passport/login.js')(passport);
    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, user, info) {
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.send({success: false});
            }
            req.login(user, loginErr => {
                if(loginErr) {
                    return next(loginErr);
                }
                return res.send({success: true});
            });
        })(req, res, next);
    });

    router.post('/diagnose', diagnose.diagnosePatient);
    return router;
};
