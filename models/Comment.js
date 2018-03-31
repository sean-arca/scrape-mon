// Dependencies
var mongoose = require("mongoose");

// Mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema: Article
var CommentSchema = new Schema ({
    body: {
        type: String
    }
});

// Create Article Model using ArticleSchema
var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;