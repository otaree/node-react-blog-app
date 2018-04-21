const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const { app } = require('./../server');
const { Blog } = require('./../models/blog');

const blogs = [{
    _id: mongoose.Types.ObjectId(),
    title: "First Test Blog",
    author: "author1",
    body: "First test blog body",
}, {
    _id: mongoose.Types.ObjectId(),
    title: "Second Test Blog",
    author: "author2",
    body: "Second test blog body",
}];

beforeEach(done => {
    Blog
        .remove({})
        .then(() => {
            return Blog.insertMany(blogs);
        })
        .then(() => done());
});

describe('GET /blogs', () => {
    it('should get all blogs', done => {
        request(app)
            .get('/blogs')
            .expect(200)
            .expect(res => {
                expect(res.body.blogs.length).to.equal(2);
            })
            .end(done);
    });
});

describe('POST /blogs', () => {
    it('should create a new blog', done => {
        const newBlog = {
            title: "Test title",
            author: "testAuthor",
            body: "test body"
        };

        request(app)
            .post('/blogs')
            .send(newBlog)
            .expect(200)
            .expect(res => {
                expect(res.body.blog).to.include(newBlog);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Blog.find({ title: newBlog.title })
                    .then(blogs => {
                        expect(blogs.length).to.equal(1);
                        expect(blogs[0].title).to.equal(newBlog.title);
                        done();
                    })
                    .catch(e => done(e));
            });

    });

    it('should not create blog with invalid body data', done => {
        request(app)
            .post('/blogs')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);

                Blog
                    .find()
                    .then(blogs => {
                        expect(blogs.length).to.equal(2);
                        done();
                    })
                    .catch(done);
            });
    });
});

describe('GET /blogs/:id', () => {
    it('should return a blog', done => {
        request(app)
            .get(`/blogs/${blogs[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.blog.title).to.equal(blogs[0].title);
            })
            .end(done);
    });

    it('should return a 404 for blog not found', done => {
        const idHex = mongoose.Types.ObjectId().toHexString();
        
        request(app)
            .get(`/blogs/${idHex}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', done => {
        request(app)
            .get('/blogs/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /blogs/:id', () => {
    it('should update a blog', done => {
        const idHex = blogs[1]._id.toHexString();

        const updateBlog = {
            title: "Test Update",
            published: true
        };

        request(app)
            .patch(`/blogs/${idHex}`)
            .send(updateBlog)
            .expect(200)
            .expect(res => {
                expect(res.body.blog).to.include(updateBlog);
                expect(res.body.blog.publishedAt).to.be.a('number');
            })
            .end(done);
    });

    it('should clear publishedAt when published is false', done => {
        const idHex = blogs[0]._id.toHexString();

        const updateBlog = {
            title: "Test update",
            published: false
        };

        request(app)
            .patch(`/blogs/${idHex}`)
            .send(updateBlog)
            .expect(200)
            .expect(res => {
                expect(res.body.blog).to.include(updateBlog);
                expect(res.body.blog.publishedAt).to.be.null;                
            })
            .end(done);
    });

    it('should return a 404 for blog not found', done => {
        const idHex = mongoose.Types.ObjectId().toHexString();
        
        request(app)
            .patch(`/blogs/${idHex}`)
            .send({})
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', done => {
        request(app)
            .patch('/blogs/123')
            .send({})
            .expect(404)
            .end(done);
    });
});

describe('DELETE /blogs/:id', () => {
    it('should delete a blog', done => {
        const idHex = blogs[0]._id.toHexString();

        request(app)
            .delete(`/blogs/${idHex}`)
            .expect(200)
            .expect(res => {
                expect(res.body.blog._id).to.equal(idHex);
            })
            .end((err, res) => {
                if (err) return done(err);

                Blog.findById(idHex)
                    .then(blog => {
                        expect(blog).to.be.null;
                        done()
                    })
                    .catch(e => done(e));
            });
    });

    it('should return 404 if blog not found', done => {
        const idHex = mongoose.Types.ObjectId().toHexString();

        request(app)
            .delete(`/blogs/${idHex}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', done => {
        request(app)
            .delete('/blogs/123')
            .expect(404)
            .end(done);
    });
});