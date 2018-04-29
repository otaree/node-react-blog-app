require('./config/config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { Blog } = require('./models/blog');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');


const app = express();
const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, "..", "client", "build");



app.use(express.static(publicPath));
// configure CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
    res.header("Access-Control-Expose-Headers", "x-auth");
    next();
  });
app.use(bodyParser.json());

app.get('/blogs', async (req, res) => {
    
    try {
        const blogs = await Blog.find().select('title');
        res.send({ blogs });        
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/blogs/user', authenticate, async (req, res) => {
    
    try {
        const blogs = await Blog.find({ author: req.user._id }).select('title');
        res.send({ blogs });
    } catch (e) {
        res.status(400).send();
    }
});

app.post('/blogs', authenticate, async (req, res) => {
    const body = _.pick(req.body, ["title", "body"]);

    if (Object.keys(body).length !== 2) {
        return res.status(400).send(new Error('Missing field'));
    } 

    try {
        const blog = await new Blog({...body, author: req.user._id }).save();
        res.send({ blog });
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/blogs/:id', async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send({ blog })
    } catch (e) {
        res.status(400).send(e);
    }
    

});

app.patch('/blogs/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    const body = _.pick(req.body, ["title", "body", "published"]);

    if (_.isBoolean(body.published) && body.published) {
        body.publishedAt = new Date().getTime();
    } else {
        body.published = false;
        body.publishedAt = null;
    }

    try {
        const blog = await Blog.findOneAndUpdate({ _id: id, author: req.user._id }, { $set: body }, { new: true });
        
        if(!blog) {
            throw "No Blog";
        }

        res.send({ blog });
    } catch (e) {
        res.status(400).send(e);
    }

});

app.delete('/blogs/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    try {
        const blog = await Blog.findOneAndRemove({ _id: id, author: req.user._id });
        if (!blog) throw "No Blog";
        res.send({ blog });
    } catch (e) {
        res.status(400).send();
    }

});

app.post('/users', async (req, res) => {
    const body = _.pick(req.body, ["email", "password"]);
    
    try {
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(400).send();
    }

});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', async (req, res) => {
    const body = _.pick(req.body, ["email", "password"]);

    try {
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(400).send();
    }
});

app.delete('/users/logout', authenticate, async (req, res) => {
    const user = req.user;
    const token = req.token;
    
    try {
        await user.removeToken(token);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Started at port ${port}`);
});

module.exports = { app };