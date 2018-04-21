import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as constants from './constants';
import * as actions from './blog';


const createMockStore = configureMockStore([thunk]);

const mock = new MockAdapter(axios);

let store;

beforeEach(() => {
    store = createMockStore({ blogs: [] });    
});


it('creates an async action to create a new blog', () => {
    const data = {
        blog: {
            title: "New Title",
            author: "New Author",
            body: "New Body"
        }
    };

    mock.onPost('http://localhost:5000/blogs').reply(200, data);

    const expectedAction = { type: constants.CREATE_BLOG, blog: data.blog };

    return store.dispatch(actions.createBlog(data.blog))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(expectedAction);
            });

});


it('creates an async action gets all blogs', () => {
    const data = { 
        blogs: [ 
            {
                title: "Test Title",
                author: "Tester",
                body: "Test Body"
            } 
        ] 
    };

    mock.onGet('http://localhost:5000/blogs').reply(200, data);

    const expectedAction = { type: constants.FETCH_BLOGS, blogs: data.blogs };

    return store.dispatch(actions.fetchBlogs())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(expectedAction);
            });
});


it('creates an async action to update a blog with particular id', () => {
    const id = '123abc';
    const data = { 
        blog: 
            {
                title: "Test Title",
                author: "Tester",
                body: "Test Body"
            }  
    };

    mock.onPatch(`http://localhost:5000/blogs/${id}`).reply(200, data);

    const expectedAction = { type: constants.PATCH_BLOG, blog: data.blog, id };

    return store.dispatch(actions.patchBlog(id, data))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(expectedAction);
            });
});

it("creates a async action to delete a blog with particular id", () => {
    const id = '123abc';
    const data = { 
        blog: 
            {
                title: "Test Title",
                author: "Tester",
                body: "Test Body"
            }  
    };

    mock.onDelete(`http://localhost:5000/blogs/${id}`).reply(200, data);

    const expectedAction = { type: constants.DELETE_BLOG, id };

    return store.dispatch(actions.deleteBlog(id))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(expectedAction);
            });

});
