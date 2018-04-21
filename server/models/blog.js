const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    published: {
        type: Boolean,
        default: false,
    },
    publishedAt: {
        type: Number,
        default: null
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = { Blog };