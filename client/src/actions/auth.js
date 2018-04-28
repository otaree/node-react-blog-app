import * as constants from './constants';
import Axios from 'axios';

export const authInit = () => {
    return {
        type: constants.AUTH_INIT,
        loading: true
    }
};

export const authFail = () => {
    return {
        type: constants.AUTH_FAIL,
        loading: false,
        error: {
            isError: true,
            value: 'Authentication Fail'
        }
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: constants.AUTH_SUCCESS,
        token,
        userId,
        loading: false,
        error: {
            isError: false,
            value: ''
        }
    }
};

export const authLogin = (user) => {
    return async dispatch => {
        dispatch(authInit());
        try {
            const response = await Axios.post('http://localhost:5000/users/login', user);
            dispatch(authSuccess(response.headers['x-auth'], response.data._id));
        } catch (e) {
            dispatch(authFail());
        }
    };
};

export const authSingup = (user) => {
    return async dispatch => {
        dispatch(authInit());
        try {
            const response = await Axios.post('http://localhost:5000/users', user);
            dispatch(authSuccess(response.headers['x-auth'], response.data._id));
        } catch (e) {
            dispatch(authFail());
        }
    };
};

export const authLogout = (token) => {
    return async dispatch => {
        dispatch(authInit());
        try {
            await Axios({ url: 'http://localhost:5000/users/logout', method: 'delete', headers: { 'x-auth': token }});
            dispatch({
                type: constants.AUTH_LOGOUT
            });
        } catch (e) {
            console.log(e);
        }
    };
}