const express = require("express")

const English = require('../models/englishModel');

var appRouter = function (router) {

  var english = require("../controllers/englishController");

  router.get("/", (req, res, next) => {
    res.status(200).json({
      message: "Handling Get request to /words"
    });
  });

  router.get("/api/words/en/:letter", (req, res, next) => {
    const letter = req.params.letter;
    English.find({word: new RegExp('^' + letter.toUpperCase())  }, {"_id": 0, "word": 1})
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

  router.get("/api/words/en/aventure", (req, res, next) => {
    const letter = req.params.letter;
    English.find({category: /^Aventure/i  }, {"_id": 0, "word": 1})
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  /*
    router.get("/", (req, res, next) => {
      Product.find()
        .exec()
        .then(docs => {
          console.log(docs);
          //   if (docs.length >= 0) {
          res.status(200).json(docs);
          //   } else {
          //       res.status(404).json({
          //           message: 'No entries found'
          //       });
          //   }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });
    */
  router.get("/api/words/en", (req, res, next) => {
    English.find({}, { "_id": 0, "word": 1 })
      .exec()
      .then(docs => {
        console.log(docs);
        if (docs.length >= 0) {
          res.status(200).json(docs);
        } else {
          res.status(404).json({
            message: 'No entries found'
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
}

module.exports = appRouter;