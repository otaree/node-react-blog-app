import blogReducer from './blog';
import * as constants from '../actions/constants';

describe('blogReducer', () => {
    const blogsState = [{
        title: "First Title",
        author: "author1",
        body: "First blog body",
        published: false,
        _id: "1"
    },
    {
        title: "Second Title",
        author: "author1",
        body: "Second blog body",
        published: false,
        _id: "2"
    }
];

    it("fetches and sets  blogs", () => {
        expect(blogReducer({}, {
                type: constants.FETCH_BLOGS,
                blogs: blogsState
            }))
            .toEqual(blogsState)
    });

    it("creates a blog", () => {
        const blog = {
            title: "Test Create",
            author: "tester",
            body: "Test body",
            published: false,
            _id: "123abc"
        };

        expect(blogReducer(blogsState, {
            type: constants.CREATE_BLOG,
            blog
        })).toContainEqual(blog);
    });

    it("update a blog", () => {
        const updateBlog = {
            ...blogsState[1],
            title: "Updated title",
            published: true
        };

        expect(blogReducer(blogsState, {
            type: constants.PATCH_BLOG,
            blog: updateBlog,
            id: blogsState[1]._id
        })).toContainEqual(updateBlog);
    });

    it("Delete a blog", () => {
        expect(blogReducer(blogsState, {
            type: constants.DELETE_BLOG,
            id: blogsState[0]._id
        })).not.toContainEqual(blogsState[0]);
    });
    
});