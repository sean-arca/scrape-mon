// Dependencies
var request = require("request");
var cheerio = require("cheerio");

// Scraper Function - www.spoonforkbacon.com
var scraper = function (cb) {

    var articlesArr = [];

    request("http://www.spoonforkbacon.com/", function(error, response, html) {
        var $ = cheerio.load(html);

        $("div.entry-content").each(function(i, element) {
            var result = {};

            result.title = $(this).find("h1.entry-title a").children("span").text();
            result.link = $(this).find("h1.entry-title").children("a").attr("href");
            result.image = $(this).children("a img").attr("src");

            if (result.title !== "" && result.link !== "" && result.image !== "") {
                articlesArr.push(result);
            }
        });
        cb(articlesArr);
    });
};

module.exports = scraper;