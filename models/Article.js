// Dependencies
var mongoose = require("mongoose");

// Mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema: Article
var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

// Create Article Model using ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;