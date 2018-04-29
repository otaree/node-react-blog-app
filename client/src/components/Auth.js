import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Signup from './Signup';
import Login from './Login';

const Auth = () => (
    <section>
        <div>
            <ul>
                <li><Link to="/auth/signup">Sign Up</Link></li>
                <li><Link to="/auth/login">Login</Link></li>
            </ul>
        </div>
        <div>
            <Switch>
                <Route path="/auth/signup" component={Signup} />
                <Route path="/auth/login" component={Login} />
            </Switch>
        </div>
    </section>
);

export default Auth;