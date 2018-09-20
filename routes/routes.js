const eng_contr = require("../controllers/englishController");

var appRouter = function (router) {
  router.get("/", (req, res, next) => {
    res.status(200).json({
      message: "Handling Get request to /words"
    });
  });

  router.get("/words/en/letters/:letter", eng_contr.words_by_letter);

  router.get("/words/en/categories/:category", eng_contr.words_by_category);

  router.get("/words/en", eng_contr.all_words);
}

module.exports = appRouter;