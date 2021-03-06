import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App';
import blogReducer from './reducers/blog';
import authReducer from './reducers/auth';
import * as actions from './actions/blog';
import './index.css';

const rootReducer = combineReducers({
    auth: authReducer,
    blogs: blogReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const jsx = (
    <Provider store={store}>
            <App />
    </Provider>
);

let hasRender = false;

const renderApp = () => {
    if (!hasRender) {
        render(jsx, document.getElementById('root'));
        hasRender = true;
    }
};

render(<h3 style={{ textAlign: 'center'}}>Loading...</h3>, document.getElementById('root'));

store
    .dispatch(actions.fetchBlogs())
    .then(() => {
        renderApp();
    })
    .catch(console.log);
