import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import LoginApi from 'actions/api/LoginActions';
import NavBar from 'components/Navbar';
import Menu from 'pages/Menu';
import Admin from 'pages/Admin';

class Routes extends React.Component {
    propTypes = {
        user: PropTypes.shape({
            isAdmin: PropTypes.bool,
        }),
        cookies: instanceOf(Cookies).isRequired,
        onLoginWithFb: PropTypes.func.isRequired,
    }

    render() {
        const { user, cookies, onLoginWithFb } = this.props;
        if (!user && cookies.get('id')) {
            onLoginWithFb({ id: cookies.get('id') });
        }
        return (
            <div>
                <NavBar isAdmin={_.get(user, 'isAdmin', false)}/>
                <Switch>
                    <Route exact path="/" component={Menu} />                    
                    <Route exact path="/menu" component={Menu} />
                    {_.get(user, 'isAdmin', false) === true && (
                        <Route path="/admin" exact component={Admin} />
                    )}
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLoginWithFb: credentials => dispatch(LoginApi.loginWithFb(credentials)),
});

const mapStateToProps = (state) => {
    const { user } = state.loginApi;
    return {
        user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Routes));
