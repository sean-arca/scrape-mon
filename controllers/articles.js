// Dependencies
var scraper = require("../scripts/scraper");
var Article = require("../models/Article");

module.exports = {
    fetch: function (callback) {
        
        scraper (function (data) {

            var articlesArr = data;

            for (let i = 0; i < articlesArr.length; i++) {
                articlesArr[i].data = new Date();
                articlesArr[i].saved = false;
            };

            console.log(articlesArr);

            Article.collection.insertMany(articlesArr,{ ordered: false }, function(err, docs) {
                callback(err, docs);
            });
        });
    },
    get: function (query, callback) {
        Article.find(query).sort({ _id: -1}).exec(function (err, doc) {
            // Send saved recipes thru callback to be rendered
            callback(doc);
        });
    },
    update: function (query, callback) {
        Article.update({_id: query.id}, {$set: {saved: query.saved}}, {}, callback);
    },
    addComment: function (query, callback) {
        Article.findOneAndUpdate({_id: query.id}, {$push: {comments: query.comments}}, {}, callback);
    }
};