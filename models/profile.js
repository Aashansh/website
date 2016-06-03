var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var multer = require('multer');


//mongoose schema
var profileSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    lookingfor: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});


//creating a model using schema
var Profile = mongoose.model('Profile', profileSchema);

// make this available to our Node application
module.exports = Profile;