import blogReducer from './blog';
import * as constants from '../actions/constants';

let initialState = {
    all: [],
    blog: {},
    error: {
        isError: false,
        value: ''
    },
    loading: false
};

const blogs = [{
    title: "First Title",
    _id: "1"
},
{
    title: "Second Title",
    _id: "2"
}
];

describe('blogReducer', () => {
    it('should init blogs', () => {
        expect(blogReducer(initialState, { 
            type: constants.INIT_BLOGS,
            loading: true
        })).toEqual({
            ...initialState,
            loading: true
        })
    });

    it('should set error', () => {
        const message = "FAIL TO FETCH";
        expect(blogReducer(initialState, {
            type: constants.FAIL_BLOGS,
            loading: false,
            error: {
                isError: true,
                value: message
            }
        })).toEqual({
            ...initialState,
            loading: false,
            error: {
                isError: true,
                value: message
            }
        });
    });
    
    it('should set blogs', () => {
        expect(blogReducer(initialState, {
            type: constants.SUCCESS_BLOGS,
            blogs,
            loading: false,
            error: {
                isError: false,
                value: ''
            }
        })).toEqual({
            ...initialState,
            all: blogs
        });
    });

    it('should add blog', () => {
        const blog = {
            _id: '3',
            title: "TEST THIS TITLE",
        };

        expect(blogReducer({
            ...initialState,
            all: blogs
        }, {
            type: constants.ADD_BLOG,
            loading: false,
            blog
        })).toEqual({
            ...initialState,
            all: [...blogs, blog]
        });
    });

    it('should patch blog', () => {
        const updateBlog = {
            _id: '1',
            title: "Updated Title"
        };

        expect(blogReducer({
            ...initialState,
            all: blogs
        }, {
            type: constants.PATCH_BLOG,
            loading: false,
            blog: updateBlog
        })).toEqual({
            ...initialState,
            all: [updateBlog, blogs[1]]
        });
    });

    it('should delete blog', () => {
        expect(blogReducer({
            ...initialState,
            all: blogs
        }, {
            type: constants.DELETE_BLOG,
            loading: false,
            blog: blogs[0]
        })).toEqual({
            ...initialState,
            all: [blogs[1]]
        });
    });
});