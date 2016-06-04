var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Profiles = require('../models/profile');
var Verify = require('./verify');
var fs = require('fs');
var profileRouter = express.Router();
profileRouter.use(bodyParser.json());

profileRouter.route('/')
.get(function (req, res, next) {
    Profiles.find({}, function (err, profile) {
        if (err) throw err;
        res.json(profile);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Profiles.create(req.body, function (err, profile) {
        if (err) throw err;
        console.log('Created the Profile');
        var id = profile._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Profile with id: ' + id + 'request=' + req.body.image);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Profiles.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

profileRouter.route('/:profileId')
.get(function (req, res, next) {
    Profiles.findById(req.params.profileId, function (err, profile) {
        if (err) throw err;
        res.json(profile);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    Profiles.findByIdAndUpdate(req.params.profileId, {
        $set: req.body
    }, {
        new: true
    }, function (err, profile) {
        if (err) throw err;
        res.json(profile);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Profiles.findByIdAndRemove(req.params.profileId, function (err, resp) {        
    	if (err) throw err;
        res.json(resp);
    });
});

module.exports = profileRouter;