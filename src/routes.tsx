import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Pages/Auth/Login';

import TeamsList from './Pages/Team/List';
import TeamView from './Pages/Team/View';
import TeamSubscription from './Pages/Team/Subscription';

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />

            <Route path="/teams/list" component={TeamsList} />
            <Route path="/team" exact component={TeamView} />
            <Route path="/team/subscription" component={TeamSubscription} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
