import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Pages/Auth/Login';

import TeamsList from './Pages/Team/List';

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />

            <Route path="/teams/list" component={TeamsList} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
