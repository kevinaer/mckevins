import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from 'pages/Menu';

const Routes = () => (
    <div>
        <Switch>
            <Route path="/" component={Menu} />
        </Switch>
    </div>
);

export default Routes;
