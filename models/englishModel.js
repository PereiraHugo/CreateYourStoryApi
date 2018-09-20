'use strict';
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var english = new Schema({
    word: String,
    category: JSON
},{ collection : 'english' });

module.exports = mongoose.model('english', english);

