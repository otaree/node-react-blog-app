import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Blogs from './Blogs';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';
import Auth from './Auth';
import Logout from './Logout';

const Main = (props) => {
    let routes = (
        <Switch>
            <Route exact path='/' component={Blogs} /> 
            <Route path='/auth' component={Auth} /> 
            <Route exact path="/blogs/:id" component={Blog} />
        </Switch>
    );
    if (props.isAuth) {
        routes = (
            <Switch>
                <Route exact path='/' component={Blogs} /> 
                <Route path="/blogs/create" component={CreateBlog} />
                <Route path="/blogs/edit/:id" component={EditBlog} />
                <Route exact path="/blogs/:id" component={Blog} />
                <Route  path="/logout" component={Logout} />
            </Switch>
        );
    }
    return (
        <main>
            {routes}
        </main>
    );
};

export default Main;