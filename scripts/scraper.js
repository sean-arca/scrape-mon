// Dependencies
var request = require("request");
var cheerio = require("cheerio");

// Scraper Function - www.spoonforkbacon.com
var scraper = function (cb) {

    var articlesArr = [];

    request("http://www.spoonforkbacon.com/", function(error, response, html) {
        var $ = cheerio.load(html);

        $("h1.entry-title").each(function(i, element) {
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            if (result.title !== "" && result.link !== "") {
                articlesArr.push(result);
            }
        });
        cb(articlesArr);
    });
};

module.exports = scraper;