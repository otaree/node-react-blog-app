import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './Signup';

const Auth = () => (
    <section>
        <Route path="/auth/signup" component={Signup} />
    </section>
);

export default Auth;