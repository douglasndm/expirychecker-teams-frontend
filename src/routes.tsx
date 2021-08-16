import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Pages/Auth/Login';

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
