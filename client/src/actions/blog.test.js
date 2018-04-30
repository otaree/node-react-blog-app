import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as constants from './constants';
import * as actions from './blog';

let createMockStore, mock, store;
describe("auth action generator", () => {

    let initialState = {
        all: [],
        blog: {},
        error: {
            isError: false,
            value: ''
        },
        loading: false
    };

   

    it('should generate init fetch blogs action', () => {
        const action = actions.initBlogs();
        expect(action).toEqual({
            type: constants.INIT_BLOGS,
            loading: true
        });
    });

    it('should generate fail fetch blogs action', () => {
        const errorMessage = "FAIL TO FETCH BLOGS";
        const action = actions.failBlogs(errorMessage);
        expect(action).toEqual({
            type: constants.FAIL_BLOGS,
            loading: false,
            error: {
                isError: true,
                value: errorMessage
            }
        });
    });

    it('should generate success fetch blogs action', () => {
        const blogs = [
            {
                _id: '1',
                title: "First Blog Title"
            },
            {
                _id: '2',
                title: "Second Blog Title"
            }
        ];
        const action = actions.successBlogs(blogs);
        expect(action).toEqual({
            type: constants.SUCCESS_BLOGS,
            loading: false,
            error: {
                isError: false,
                value: ''
            },
            blogs
        });
    });

    it('should generate add blog action', () => {
        const blog = {
            _id: '1',
            title: "Blog Title"
        };

        const action = actions.addBlog(blog);
        expect(action).toEqual({
            type: constants.ADD_BLOG,
            loading: false,
            blog
        });
    });

    it('should generate delete blog action', () => {
        const blog = {
            _id: '1',
            title: "Blog Title"
        };

        const action = actions.deleteBlog(blog);
        expect(action).toEqual({
            type: constants.DELETE_BLOG,
            loading: false,
            blog
        });
    });

    it('should generate patch blog action', () => {
        const blog = {
            _id: '1',
            title: "Blog Title"
        };

        const action = actions.patchBlog(blog);
        expect(action).toEqual({
            type: constants.PATCH_BLOG,
            loading: false,
            blog
        });
    });

    describe("Fetch Blogs", () => {
        beforeEach(() => {
            createMockStore = configureMockStore([thunk]);

            mock = new MockAdapter(axios);

            store = createMockStore(initialState);
        });

        it('should generate async fetch blogs and success blogs actions', () => {
            const blogs = [
                {
                    _id: '1',
                    title: "First Blog Title"
                },
                {
                    _id: '2',
                    title: "Second Blog Title"
                }
            ];

            const response = {
                blogs
            }

            mock.onGet("http://localhost:5000/blogs").reply(200, response);

            const expectedActions = [
                {
                    type: constants.INIT_BLOGS,
                    loading: true
                },
                {
                    type: constants.SUCCESS_BLOGS,
                    loading: false,
                    error: {
                        isError: false,
                        value: ''
                    },
                    blogs 
                }
            ];

            return store
                    .dispatch(actions.fetchBlogs())
                    .then(() => {
                        const dispatchedActions = store.getActions();
                        expect(dispatchedActions[0]).toEqual(expectedActions[0]);
                        expect(dispatchedActions[1]).toEqual(expectedActions[1]);
                    })
        });

        it('should generate async fetch blogs and fail blogs actions', () => {
            const expectedActions = [
                {
                    type: constants.INIT_BLOGS,
                    loading: true
                },
                {
                    type: constants.FAIL_BLOGS,
                    loading: false,
                    error: {
                        isError: true,
                        value: 'Unable to fetch blogs'
                    }
                }
            ];

            mock.onGet("http://localhost:5000/blogs").reply(400, {}, {});

            return store
                    .dispatch(actions.fetchBlogs())
                    .then(() => {
                        const dispatchedActions = store.getActions();
                        expect(dispatchedActions[0]).toEqual(expectedActions[0]);
                        expect(dispatchedActions[1]).toEqual(expectedActions[1]);
                    });
        });
    });

});

