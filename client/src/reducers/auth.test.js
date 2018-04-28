import authReducer from './auth';
import * as constants from '../actions/constants';

describe('authReducer', () => {
    let initialState = {
        token: null,
        userId: null,
        error: {
            isError: false,
            value: ''
        },
        loading: false
    };
    
    it('should init auth', () => {
        expect(authReducer(initialState, {
            type: constants.AUTH_INIT,
            loading: true
        })).toEqual({
            ...initialState,
            loading: true
        });
    });

    it('should indicate auth fail', () => {
        expect(authReducer(initialState, {
            type: constants.AUTH_FAIL,
            loading: false,
            error: {
                isError: true,
                value: 'Authentication Fail'
            }
        })).toEqual({
            ...initialState,
            loading: false,
            error: {
                isError: true,
                value: 'Authentication Fail'
            }
        });
    });

    it('should set userId and token', () => {
        const userId = '1';
        const token = '123abc';
        expect(authReducer(initialState, {
            type: constants.AUTH_SUCCESS,
            token,
            userId,
            loading: false,
            error: {
                isError: false,
                value: ''
            }
        })).toEqual({
            ...initialState,
            token,
            userId,
            loading: false,
            error: {
                isError: false,
                value: ''
            }
        });
    });

    it('should reset state', () => {
        expect(authReducer({
            ...initialState,
            userId: '1',
            token: '123abc',
            loading: true
        }, { 
            type: constants.AUTH_LOGOUT 
        })).toEqual(initialState);
    })
});