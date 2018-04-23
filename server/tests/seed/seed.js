const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { Blog } = require('../../models/blog');
const { User } = require('../../models/user');


const userOneId = mongoose.Types.ObjectId();
const userTwoId = mongoose.Types.ObjectId();

const users = [{
    _id: userOneId,
    email: 'ron@test.com',
    password: 'password1',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'secret')
    }]
}, {
    _id: userTwoId,
    email: 'jon@test.com',
    password: 'password2',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'secret')
    }]
}];

const populateUsers = done => {
    User
        .remove({})
        .then(() => {
            const userOne = new User(users[0]).save();
            const userTwo = new User(users[1]).save();

            return Promise.all([userOne, userTwo]);
        })
        .then(() => done());
}

const blogs = [{
    _id: mongoose.Types.ObjectId(),
    title: "First Test Blog",
    author: userOneId,
    body: "First test blog body",
}, {
    _id: mongoose.Types.ObjectId(),
    title: "Second Test Blog",
    author: userTwoId,
    body: "Second test blog body",
}];

const populateBlogs = done => {
    Blog
        .remove({})
        .then(() => {
            return Blog.insertMany(blogs);
        })
        .then(() => done());
};


module.exports = { blogs, populateBlogs, users, populateUsers };