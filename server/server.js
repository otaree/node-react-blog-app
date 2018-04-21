require('./config/config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { Blog } = require('./models/blog');


const app = express();
const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, "..", "client", "build");

app.use(express.static(publicPath));
app.use(cors());
app.use(bodyParser.json());

app.get('/blogs', async (req, res) => {
    
    try {
        const blogs = await Blog.find();
        res.send({ blogs });        
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/blogs', async (req, res) => {
    const body = _.pick(req.body, ["title", "author", "body"]);

    if (Object.keys(body).length !== 3) {
        return res.status(400).send(new Error('Missing field'));
    } 

    try {
        const blog = await new Blog({...body}).save();
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

app.patch('/blogs/:id', async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    const body = _.pick(req.body, ["title", "author", "body", "published"]);

    if (_.isBoolean(body.published) && body.published) {
        body.publishedAt = new Date().getTime();
    } else {
        body.published = false;
        body.publishedAt = null;
    }

    try {
        const blog = await Blog.findByIdAndUpdate(id, { $set: body }, { new: true });
        
        if(!blog) {
            return res.status(404).send();
        }

        res.send({ blog });
    } catch (e) {
        res.status(400).send(e);
    }

});

app.delete('/blogs/:id', async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    try {
        const blog = await Blog.findByIdAndRemove(id);
        if (!blog) return res.status(404).send();
        res.send({ blog });
    } catch (e) {
        res.status(400).send(e);
    }

});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Started at port ${port}`);
});

module.exports = { app };