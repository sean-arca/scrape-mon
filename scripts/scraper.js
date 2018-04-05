// Dependencies
var request = require("request");
var cheerio = require("cheerio");

// Scraper Function - www.spoonforkbacon.com
var scraper = function (cb) {

    var articlesArr = [];

    request("http://www.spoonforkbacon.com/recipes/", function(error, response, html) {
        var $ = cheerio.load(html);

        $("div#recipeindex_thumb").each(function(i, element) {
            var result = {};

            result.title = $(this).children("a").attr("title");
            result.link = $(this).children("a").attr("href");
            result.image = $(this).find("img").attr("src");

            console.log(result);

            if (result.image === undefined) {
                console.log("sponsor block");
            } else if (result.title !== "" && result.link !== "" && result.image !== "") {
                articlesArr.push(result);
            }
        });
        cb(articlesArr);
    });
};

module.exports = scraper;