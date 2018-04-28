import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as constants from './constants';
import * as actions from './auth';

let createMockStore, mock, store, initialState;
describe('Auth Actions', () => {
    initialState = {
        token: null,
        userId: null,
        error: {
            isError: false,
            value: ''
        },
        loading: false
    };

    it('should init a auth action', () => {
        const action = actions.authInit();
        expect(action).toEqual({
            type: constants.AUTH_INIT,
            loading: true
        });
    });

    it('should generate auth fail action', () => {
        const action = actions.authFail();
        expect(action).toEqual({
            type: constants.AUTH_FAIL,
            loading: false,
            error: {
                isError: true,
                value: 'Authentication Fail'
            }
        });
    });

    it('should generate auth success action', () => {
        const token = '123abc';
        const userId = '1';

        const action = actions.authSuccess(token, userId);
        expect(action).toEqual({
            type: constants.AUTH_SUCCESS,
            token,
            userId,
            loading: false,
            error: {
                isError: false,
                value: ''
            }
        });
    });

    describe('Auth Login', () => {
        beforeEach(() => {
            createMockStore = configureStore([thunk]);

            mock = new MockAdapter(axios);

            store = createMockStore(initialState);
        });

        it('should generate async login action and success when valid user', () => {
            const token = '123abc!';
            const email = 'test@test.com';
            const password = 'password!';
            const userId = '1';

            const response = {
                _id: userId,
                email
            };
            const headers = {
                'x-auth': token
            };

            const expectedActions = [
                {
                    type: constants.AUTH_INIT,
                    loading: true
                },
                {
                    type: constants.AUTH_SUCCESS,
                    token,
                    userId,
                    loading: false,
                    error: {
                        isError: false,
                        value: ''
                    }
                }
            ];

            mock.onPost('http://localhost:5000/users/login').reply(200, response, headers);    
            
            return store
                    .dispatch(actions.authLogin({ email, password}))
                    .then(() => {
                        const dispatchedActions = store.getActions();
                        expect(dispatchedActions[0]).toEqual(expectedActions[0]);                        
                        expect(dispatchedActions[1]).toEqual(expectedActions[1]);
                    });
        });

        it('should generate async login action and fail when invalid user', () => {
            const expectedActions = [
                {
                    type: constants.AUTH_INIT,
                    loading: true
                },
                {
                    type: constants.AUTH_FAIL,
                    loading: false,
                    error: {
                        isError: true,
                        value: 'Authentication Fail'
                    }
                }
            ];

            mock.onPost('http://localhost:5000/users/login').reply(400, {}, {});

            return store
                    .dispatch(actions.authLogin())
                    .then(() => {
                        const dispatchedActions = store.getActions();
                        expect(dispatchedActions[0]).toEqual(expectedActions[0]);
                        expect(dispatchedActions[1]).toEqual(expectedActions[1]);
                    });
        });
    });

    describe('Auth Sign Up', () => {
        beforeEach(() => {
            createMockStore = configureStore([thunk]);

            mock = new MockAdapter(axios);

            store = createMockStore(initialState);
        });

        it('should generate async signup action and success valid user', () => {
            const email = 'test@test.com';
            const password = 'password!';
            const token = '123abc!';
            const userId = '1';
            const response = {
                _id: userId,
                email
            };
            const headers = {
                'x-auth': token
            };

            mock.onPost('http://localhost:5000/users').reply(200, response, headers);

            const expectedActions = [
                {
                    type: constants.AUTH_INIT,
                    loading: true
                },
                {
                    type: constants.AUTH_SUCCESS,
                    token,
                    userId,
                    loading: false,
                    error: {
                        isError: false,
                        value: ''
                    }
                }
            ];

            return store
                    .dispatch(actions.authSingup())
                    .then(() => {
                        const dispatchedActions = store.getActions();
                        expect(dispatchedActions[0]).toEqual(expectedActions[0]);
                        expect(dispatchedActions[1]).toEqual(expectedActions[1]);
                    });
        });

        it('should generate async sign up action and fail when invalid user', () => {
            const expectedActions = [
                {
                    type: constants.AUTH_INIT,
                    loading: true
                },
                {
                    type: constants.AUTH_FAIL,
                    loading: false,
                    error: {
                        isError: true,
                        value: 'Authentication Fail'
                    }
                }
            ];

            mock.onPost('http://localhost:5000/users').reply(400, {}, {});

            return store
                    .dispatch(actions.authLogin())
                    .then(() => {
                        const dispatchedActions = store.getActions();
                        expect(dispatchedActions[0]).toEqual(expectedActions[0]);
                        expect(dispatchedActions[1]).toEqual(expectedActions[1]);
                    });
        });
    });

    describe('Auth Logout', () => {
        beforeEach(() => {
            createMockStore = configureStore([thunk]);

            mock = new MockAdapter(axios);

            store = createMockStore(initialState);
        });

        it('should create async logout action', () => {
            const token = '123abc!';
            const headers = {
                'x-auth': token
            };

            const expectedActions = [
                {
                    type: constants.AUTH_INIT,
                    loading: true
                },
                {
                    type: constants.AUTH_LOGOUT
                }
            ];

            mock.onDelete('http://localhost:5000/users/logout').reply(200);

            return store    
                    .dispatch(actions.authLogout(token))
                    .then(() => {
                        const dispatchedActions = store.getActions();
                        expect(dispatchedActions[0]).toEqual(expectedActions[0]);
                        expect(dispatchedActions[1]).toEqual(expectedActions[1]);
                    });
        });
    });
});