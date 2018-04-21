import * as constants from '../actions/constants';

const blog = (state=[], action) => {
    switch (action.type) {
        case constants.FETCH_BLOGS:
            return action.blogs;
        case constants.PATCH_BLOG:
            return state.map(blog => {
                if (blog._id === action.id) {
                    return {
                        ...blog,
                        ...action.blog
                    }
                } else {
                    return blog;
                }
            });
        case constants.DELETE_BLOG:
            return state.filter(blog => blog._id !== action.id);
        case constants.CREATE_BLOG:
            return [...state, action.blog];
        default:
            return state;
    }
};

export default blog;