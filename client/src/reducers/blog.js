import * as constants from '../actions/constants';

const initialState = {
    all: [],
    blog: {},
    error: {
        isError: false,
        value: ''
    },
    loading: false
};

const blog = (state=initialState, action) => {
    switch (action.type) {
        case constants.INIT_BLOGS:
            return {
                ...state,
                loading: action.loading
            };
        case constants.FAIL_BLOGS:
            return {
                ...state,
                loading: action.loading,
                error: action.error
            };
        case constants.SUCCESS_BLOGS:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
                all: action.blogs
            };
        case constants.ADD_BLOG:
            return {
                ...state,
                loading: action.loading,
                all: [...state.all, { _id: action.blog._id, title: action.blog.title }]
            };

        case constants.PATCH_BLOG:
            return {
                ...state,
                loading: action.loading,
                all: state.all.map(blog => {
                    if (blog._id === action.blog._id) {
                        return {
                            _id: action.blog._id,
                            title: action.blog.title
                        };
                    }
                    return blog;
                })
            };
        case constants.DELETE_BLOG:
            return {
                ...state,
                loading: action.loading,
                all: state.all.filter(blog => blog._id !== action.blog._id)
            };
        default:
            return state;
    }
};

export default blog;