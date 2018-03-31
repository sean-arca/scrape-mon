// Dependencies
var mongoose = require("mongoose");

// Mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema: Article
var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// Create Article Model using ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;