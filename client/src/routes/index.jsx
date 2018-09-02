import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import LoginApi from 'actions/api/LoginActions';
import OrderApi from 'actions/api/OrderActions';
import NavBar from 'components/Navbar';
import OrderBar from 'components/OrderBar';
import Menu from 'pages/Menu';
import MenuItem from 'pages/MenuItem';
import Admin from 'pages/Admin';
import Cart from 'pages/Cart';

class Routes extends React.Component {
    propTypes = {
        user: PropTypes.shape({
            isAdmin: PropTypes.bool,
        }),
        cookies: instanceOf(Cookies).isRequired,
        onLoginWithFb: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps) {
        const { order, user, onGetCart, location, history } = this.props;
        
        if (!order && user) {
            onGetCart(user._id);
        }
    }

    render() {
        const { user, cookies, onLoginWithFb, onGetCart, order, location, history } = this.props;
        if (!user && cookies.get('id')) {
            onLoginWithFb({ id: cookies.get('id') });
        }
        return (
            <div>
                <NavBar isAdmin={_.get(user, 'isAdmin', false)} />
                <Switch>
                    <Route exact path="/" component={Menu} />
                    <Route exact path="/menu" component={Menu} />
                    <Route exact path="/menu/:id" component={MenuItem} />
                    <Route exact path="/cart" component={Cart} />
                    {_.get(user, 'isAdmin', false) === true && (
                        <Route path="/admin" exact component={Admin} />
                    )}
                </Switch>
                {_.get(location, 'pathname') !== '/cart' && _.get(order, 'cart.length', 0) > 0 && (
                    <OrderBar
                      order={order}
                      onClick={() => {
                        history.push('/cart');
                        window.location.reload();
                      }}
                    />
                )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLoginWithFb: credentials => dispatch(LoginApi.loginWithFb(credentials)),
    onGetCart: userId => dispatch(OrderApi.getCart(userId)),
});

const mapStateToProps = (state) => {
    const { user } = state.loginApi;
    const { order } = state.orderApi;
    return {
        user,
        order,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withCookies(Routes)));
