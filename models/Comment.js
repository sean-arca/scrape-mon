// Dependencies
var mongoose = require("mongoose");

// Mongoose Schema
var Schema = mongoose.Schema;

// Create new Schema: Comment
var CommentSchema = new Schema({
    body: {
        type: String
    }
});

// Create Comment Model using CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;