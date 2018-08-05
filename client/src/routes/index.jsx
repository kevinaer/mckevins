import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from 'components/Navbar';
import Menu from 'pages/Menu';

const Routes = () => (
    <div>
        <NavBar />
        <Switch>
            <Route path="/" component={Menu} />
        </Switch>
    </div>
);

export default Routes;
