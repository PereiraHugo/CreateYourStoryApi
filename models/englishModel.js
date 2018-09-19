'use strict';
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var English = new Schema({
    word: String,
    category: JSON
},{ collection : 'English' });

module.exports = mongoose.model('English', English);

