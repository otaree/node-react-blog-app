import * as constants from './constants';
import Axios from 'axios';

export const fetchBlogs = () => {
    return dispatch => {
        return Axios.get('http://localhost:5000/blogs')
            .then(response => dispatch({ type: constants.FETCH_BLOGS, blogs: response.data.blogs}));
    }
};

export const patchBlog = (id, data) => {
    return dispatch => {
        return Axios.patch(`http://localhost:5000/blogs/${id}`, {...data})
            .then(response => dispatch({ type: constants.PATCH_BLOG, blog: response.data.blog, id }));
    }
};


export const createBlog = (blog) => {
    return dispatch => {
        return Axios.post('http://localhost:5000/blogs', {...blog})
            .then(response => dispatch({ type: constants.CREATE_BLOG, blog: response.data.blog }));
    }
};

export const deleteBlog = id => {
    return dispatch => {
        return Axios.delete(`http://localhost:5000/blogs/${id}`)
                .then(response => dispatch({ type: constants.DELETE_BLOG, id }));
    }
}
