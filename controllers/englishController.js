var mongoose = require('mongoose'); 

const english = require('../models/englishModel');

exports.all_words = function(req, res) {
    var query = english.find({}, {"_id": 0, "word": 1})
    query.exec(function(err, word) {
        if (err) {
            res.json(err);
            return Promise.reject(err); // Updated this line
        }
        console.log(word);
    });
};

exports.words_by_letter = function(req, res) {
    // Retrieve the tag from our URL path
    var letter = req.params.letter;
    var query =  english.find({word: /^letter/i}, {"_id": 0, "word": 1})
    query.exec(function(err, word) {
        if (err)
            res.send(err);
        res.json(word);
    });
};
