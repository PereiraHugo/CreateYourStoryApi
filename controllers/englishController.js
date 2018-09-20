const english = require('../models/englishModel');

exports.all_words = function (req, res, next) {
    var num_req = parseInt(req.query.num);
    english.find({}, { "_id": 0, "word": 1 })
        .sort('word')
        .exec()
        .then(doc => {
            console.log("From database", doc.length);
            if (doc === undefined || doc.length == 0) {
                res
                    .status(404)
                    .json({ message: "No entries found" });
            } else {    
                if (num_req != undefined && Number.isInteger(num_req))
                {
                    doc = getRandItem(num_req, doc)
                }
                res.status(200).json(doc);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.words_by_letter = function (req, res, next) {
    // Retrieve the tag from our URL path
    var letter = req.params.letter;
    var num_req = parseInt(req.query.num);
    // Regex to find the filter on the first letter of the word
    english.find({ word: new RegExp('^' + letter.toUpperCase()) }, { "_id": 0, "word": 1 })
        .sort('word')
        .exec()
        .then(doc => {
            console.log("From database", doc.length);
            if (doc === undefined || doc.length == 0) {
                res
                    .status(404)
                    .json({ message: "No valid entry found for this letter: " + letter});
            } else {
                if (num_req != undefined && Number.isInteger(num_req))
                {
                    doc = getRandItem(num_req, doc)
                }
                res.status(200).json(doc);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.words_by_category = function (req, res, next) {
    // Retrieve the tag from our URL path
    var category = req.params.category;
    var num_req = parseInt(req.query.num);
    // Creating a query here to pass te request into category key.
    var query = {};
    query["category." + category] = true;
    english.find(query, { "_id": 0, "word": 1 })
        .sort('word')
        .exec()
        .then(doc => {
            console.log("From database", doc.length);
            if (doc === undefined || doc.length == 0) {
                res
                    .status(404)
                    .json({ message: "No valid entry found for this category: " + category });
            } else {
                if (num_req != undefined && Number.isInteger(num_req))
                {
                    doc = getRandItem(num_req, doc)
                }
                res.status(200).json(doc);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

getRandItem = function(number, complete_array) {
    var i;
    rand_index = [];
    rand_array = [];
    for (i = 0; i < number; i++) {
        rand_num = Math.floor(Math.random()* complete_array.length)
        if (rand_index.indexOf(rand_num) == -1)
        {
            rand_index.push(rand_num);
            rand_array.push(complete_array[rand_num])
        } else {
            i += -1;
        }
    }
    return (rand_array)
}