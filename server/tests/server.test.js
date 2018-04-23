const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const { app } = require('./../server');
const { Blog } = require('./../models/blog');
const { User } = require('./../models/user');
const { blogs, populateBlogs, users, populateUsers } = require('./seed/seed'); 

describe('SERVER', function() {
    this.timeout(15000);
    beforeEach(populateBlogs);
    beforeEach(populateUsers);


    describe('GET /blogs', () => {
        it('should get all blogs', done => {
            request(app)
                .get('/blogs')
                .expect(200)
                .expect(res => {
                    expect(res.body.blogs.length).to.equal(2);
                    expect(res.body.blogs[0]).to.not.have.property('body');
                    expect(res.body.blogs[0]).to.not.have.property('author');
                    expect(res.body.blogs[0]).to.have.property('title');
                    expect(res.body.blogs[0]).to.have.property('_id');
                })
                .end(done);
        });
    });

    describe('GET /blogs/user', () => {
        it('should get all the blogs by a user', done  => {
            const token = users[0].tokens[0].token;

            request(app)
                .get('/blogs/user')
                .set('x-auth', token)
                .expect(200)
                .expect(res => {
                    expect(res.body.blogs.length).to.equal(1);
                })
                .end(done);
        });

        it('should not return blogs if invalid token', done => {
            const token = jwt.sign({ _id: '123abc', access: 'auth'}, 'secret');

            request(app)
                .get('/blogs/user')
                .expect(401)
                .end(done);
        });

        it('should not get blogs if no token', done => {
            request(app)
                .get('/blogs/user')
                .expect(401)
                .end(done);
        })
    });

    describe('POST /blogs', () => {
        it('should create a new blog', done => {
            const newBlog = {
                title: "Test title",
                body: "test body"
            };

            request(app)
                .post('/blogs')
                .set('x-auth', users[0].tokens[0].token)
                .send(newBlog)
                .expect(200)
                .expect(res => {
                    expect(res.body.blog).to.include(newBlog);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Blog.find({ author: users[0]._id })
                        .then(blogs => {
                            expect(blogs.length).to.equal(2);
                            done();
                        })
                        .catch(e => done(e));
                });

        });

        it('should not create blog if no token', done => {
            const newBlog = {
                title: "Test title",
                body: "test body"
            };

            request(app)
                .post('/blogs')
                .send(newBlog)
                .expect(401)
                .end(done);
        });

        it('should not create blog with invalid body data', done => {
            request(app)
                .post('/blogs')
                .set('x-auth', users[0].tokens[0].token)                
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
            const token = users[1].tokens[0].token;

            const updateBlog = {
                ...blogs[1],
                _id: blogs[1]._id.toHexString(), 
                author: blogs[1].author.toHexString(),
                title: "Test Update",
                published: true
            };

            request(app)
                .patch(`/blogs/${idHex}`)
                .set('x-auth', token)
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
            const token = users[0].tokens[0].token;
            

            const updateBlog = {
                ...blogs[0],
                _id: blogs[0]._id.toHexString(),
                author: blogs[0].author.toHexString(),
                title: "Test update",
                published: false
            };

            request(app)
                .patch(`/blogs/${idHex}`)
                .set('x-auth', token)
                .send(updateBlog)
                .expect(200)
                .expect(res => {
                    expect(res.body.blog).to.include(updateBlog);
                    expect(res.body.blog.publishedAt).to.be.null;                
                })
                .end(done);
        });

        it('should return a 401 if no auth token', done => {
            const idHex = mongoose.Types.ObjectId().toHexString();

            request(app)
                .patch(`/blogs/${idHex}`)
                .send({})
                .expect(401)
                .end(done);
        });

        it('should return a 400 for non-object ids', done => {
            const token = users[0].tokens[0].token;

            request(app)
                .patch('/blogs/123')
                .set('x-auth', token)
                .send({})
                .expect(404)
                .end(done);
        });
    });

    describe('DELETE /blogs/:id', () => {
        it('should delete a blog', done => {
            const idHex = blogs[0]._id.toHexString();
            const token = users[0].tokens[0].token;

            request(app)
                .delete(`/blogs/${idHex}`)
                .expect(200)
                .set('x-auth', token)
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

        it('should return 400 if blog not found', done => {
            const idHex = mongoose.Types.ObjectId().toHexString();
            const token = users[0].tokens[0].token;

            request(app)
                .delete(`/blogs/${idHex}`)
                .set('x-auth', token)
                .expect(400)
                .end(done);
        });

        it('should return 400 if object id is invalid', done => {
            const token = users[0].tokens[0].token;
            
            request(app)
                .delete('/blogs/123')
                .set('x-auth', token)
                .expect(404)
                .end(done);
        });

        it('should return 401 if no auth token', done => {
            request(app)
                .delete(`/blogs/${blogs[0]._id.toHexString()}`)
                .expect(401)
                .end(done);
        });
    });

    describe('POST /users', () => {
        it('should create a user', done => {
            const email = "test@test.com";
            const password = "password12";

            request(app)
                .post('/users')
                .send({ email, password })
                .expect(200)
                .expect(res => {
                    expect(res.headers['x-auth']).to.exist;
                    expect(res.body._id).to.exist;
                    expect(res.body.email).to.equal(email);
                })
                .end((err, res) => {
                    if (err) return done(err);

                    User
                        .find({})
                        .then(users => {
                            expect(users.length).to.equal(3);
                            done();
                        })
                        .catch(e => done(e));
                });
        });

        it('should not create user for invalid email', done => {
            const email = "test.com";
            const password = "password12";

            request(app)
                .post('/users')
                .send({ email, password })
                .expect(400) 
                .end(done);
        });

        it('should not create user for invalid password', done => {
            const email = "test1@test.com";
            const password = "123";
            
            request(app)
                .post('/users')
                .send({ email, password })
                .expect(400)
                .end(done);
        });

        it('should not create user if email already exists', done => {
            const email = users[0].email;
            const password = "password13!";

            request(app)
                .post('/users')
                .send({ email, password })
                .expect(400)
                .end(done);
        });
    });

    describe('GET /users/me', () => {
        it('should return a user for valid token', done => {
            const token = users[0].tokens[0].token;

            request(app)
                .get('/users/me')
                .set('x-auth', token)
                .expect(200)
                .expect(res => {
                    expect(res.body.email).to.equal(users[0].email);
                    expect(res.body._id).to.equal(users[0]._id.toHexString());
                })
                .end(done);
        });

        it('should not return a user for invalid token', done => {
            const token = jwt.sign({ _id: '123abc', access: 'auth'}, 'sdfaf');

            request(app)
                .get('/users/me')
                .set('x-auth', token)
                .expect(401)
                .end(done);
        });

        it('should not return a user if no token', done => {
            request(app)
                .get('/users/me')
                .expect(401)
                .end(done);
        });
    });

    describe('POST /users/login', () => {
        it('should login a user', done => {
            const email = users[0].email;
            const password = users[0].password;

            request(app)
                .post('/users/login')
                .send({ email, password })
                .expect(200)
                .expect(res => {
                    expect(res.body.email).to.equal(email);
                    expect(res.body._id).to.equal(users[0]._id.toHexString());
                    expect(res.headers['x-auth']).to.exist;
                })
                .end(done);
        });

        it('should not login a user if password is wrong', done => {
            const email = users[0].email;
            const password = "thisisnotthepassword";

            request(app)
                .post('/users/login')
                .send({ email, password })
                .expect(400)
                .expect(res => {
                    expect(res.headers['x-auth']).to.not.exist;
                })
                .end(done);
        });
    });

    describe('DELETE /users/logout', () => {
        it('should remove auth token', done => {
            const token = users[1].tokens[0].token;

            request(app)
                .delete('/users/logout')
                .set('x-auth', token)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    User
                        .findById(users[0]._id)
                        .then(user => {
                            expect(user.tokens).to.not.include(token);
                            done();
                        })
                        .catch(e => done(e));
                });
        });
    });
});