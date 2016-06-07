var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session')
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

var User = require('../models/user');
var Verify = require('./verify');
var fs = require('fs');
var forgotRouter = express.Router();
forgotRouter.use(bodyParser.json());


forgotRouter.route('/')
.post(function(req, res, next) {
  async.waterfall([
    function(done) {
    crypto.randomBytes(20, function(err, buf) {
    var token = buf.toString('hex');
    done(err, token);
          });
},
    function(token, done) {
      User.findOne({email: req.body.email }, function(err, user) {
        if (!user) {
          return res.status(401).json({status: 'Sorry! No username exists with that email'});
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'Aashansh',
          pass: 'thebechange2016'
        }
      });
    var mailOptions = {
        to: user.email,
        from: 'noreply@aashansh.org',
        subject: 'Aashansh Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.send('An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

forgotRouter.route('/reset/:token')
.get(function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return res.status(401).json({status: 'Password reset token is invalid or has expired.'});
    }
    res.render('reset', {
      user: req.user
    });
  });
})

.post(function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.status(401).json({status: 'Password reset token is invalid or has expired.'});
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'Aashansh',
          pass: 'thebechange2016'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'noreply@aashansh.org',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.send('Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});


module.exports = forgotRouter;
