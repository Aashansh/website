var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var multer = require('multer');


//mongoose schema
var courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category : {
        type : String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    totalstudents: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});


//creating a model using schema
var Course = mongoose.model('Course', courseSchema);

// make this available to our Node application
module.exports = Course;