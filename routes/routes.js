// Dependencies
var scraper = require("../scripts/scraper");
var Article = require("../models/Article");
var articlesController = require("../controllers/articles");
var commentsController = require("../controllers/comments");

module.exports = function (router) {

    // Html - Show Recipes Found
    router.get("/", function (req, res) {
        
        Article.find({saved: false}, function(error, found) {
            if (error) {
                console.log(error);
            } else if (found.length === 0) {
                res.render("empty")
            } else {
                var hbsObject = {
                    articles: found
                };
                res.render("index", hbsObject);
            }
        });       
    });

    // Api - Fetch Recipes and Save Unique to DB
    router.get("/api/fetch", function (req, res) {

        articlesController.fetch(function (err, docs) {

            // Show Message Once Fetched, or Not
            if (!docs || docs.insertedCount === 0) {
                res.json({message: "No new recipes today. Please check back at a later date!"});
            } else {
                res.json({message: "Added " + docs.insertedCount + " new recipes! Check them out!"})
            }
        });
    });

    // Get Saved Recipe
    router.get("/saved", function (req, res) {

        articlesController.get({saved: true}, function (data) {

            var hbsObject = {
                articles: data
            };
            res.render("saved", hbsObject);
        });
    });

    // Save or Unsave Recipe
    router.patch("/api/articles", function (req, res) {

        articlesController.update(req.body, function (err, data) {
            // Goes thru app.js
            res.json(data);
        });
    });
};