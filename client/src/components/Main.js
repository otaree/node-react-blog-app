import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Blogs from './Blogs';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import EditBlog from './EditBlog';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Blogs} />
            <Route path="/blogs/create" component={CreateBlog} />
            <Route path="/blogs/edit/:id" component={EditBlog} />
            <Route exact path="/blogs/:id" component={Blog} />
        </Switch>
    </main>
);

export default Main;