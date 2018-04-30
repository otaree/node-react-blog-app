import * as constants from './constants';
import Axios from 'axios';

export const initBlogs = () => {
    return {
        type: constants.INIT_BLOGS,
        loading: true
    };
};

export const failBlogs = (message) => {
    return {
        type: constants.FAIL_BLOGS,
        loading: false,
        error: {
            isError: true,
            value: message
        }
    };
};

export const successBlogs = (blogs) => {
    return {
        type: constants.SUCCESS_BLOGS,
        loading: false,
        error: {
            isError: false,
            value: ''
        },
        blogs
    };
};

export const fetchBlogs = () => {
    return async dispatch => {
        dispatch(initBlogs());
        try {
            const response = await Axios({ url: "http://localhost:5000/blogs", method: "get" });
            dispatch(successBlogs(response.data.blogs));
        } catch (e) {
            dispatch(failBlogs("Unable to fetch blogs"))
        }
    }
};

export const addBlog = (blog) => {
    return {
        type: constants.ADD_BLOG,
        loading: false,
        blog
    };
}


export const deleteBlog = (blog) => {
    return {
        type: constants.DELETE_BLOG,
        loading: false,
        blog
    };
}

export const patchBlog = (blog) => {
    return {
        type: constants.PATCH_BLOG,
        loading: false,
        blog
    };
}