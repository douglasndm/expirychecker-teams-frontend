import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Pages/Auth/Login';

import TeamsList from './Pages/Team/List';
import TeamView from './Pages/Team/View';

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />

            <Route path="/teams/list" component={TeamsList} />
            <Route path="/team" component={TeamView} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
