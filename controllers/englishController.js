const english = require('../models/englishModel');

exports.all_words = function (req, res, next) {
    english.find({}, { "_id": 0, "word": 1 })
        .sort('word')
        .exec()
        .then(docs => {
            if (doc === undefined || doc.length == 0) {
                res
                    .status(404)
                    .json({ message: "No entries found" });
            } else {
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
    // Regex to find the filter on the first letter of the word
    english.find({ word: new RegExp('^' + letter.toUpperCase()) }, { "_id": 0, "word": 1 })
        .sort('word')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc === undefined || doc.length == 0) {
                res
                    .status(404)
                    .json({ message: "No valid entry found for this letter: " + letter});
            } else {
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
    // Creating a query here to pass te request into category key.
    var query = {};
    query["category." + category] = true;
    english.find(query, { "_id": 0, "word": 1 })
        .sort('word')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc === undefined || doc.length == 0) {
                res
                    .status(404)
                    .json({ message: "No valid entry found for this category: " + category });
            } else {
                res.status(200).json(doc);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};