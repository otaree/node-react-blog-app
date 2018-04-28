import * as constants from '../actions/constants';

const initialState = {
    token: null,
    userId: null,
    error: {
        isError: false,
        value: ''
    },
    loading: false
};

const auth = (state=initialState, action) => {
    switch (action.type) {
        case constants.AUTH_INIT:
            return {
                ...state,
                loading: action.loading
            };
        case constants.AUTH_FAIL:
            return {
                ...state,
                loading: action.loading,
                error: action.error
            }
        case constants.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                loading: action.loading,
                error: action.error
            };
        case constants.AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
}; 

export default auth;