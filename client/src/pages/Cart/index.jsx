import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import LoginApi from 'actions/api/LoginActions';
import OrderApi from 'actions/api/OrderActions';
import { Typography, Card, Button, Grid } from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
        marginTop: theme.mixins.toolbar.minHeight + theme.spacing.unit,
    },
    item: {
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        display: 'inline-block',
        width: '100%',
    },
    option: {
        marginLeft: theme.spacing.unit * 2,
    },
    button: {
        marginTop: theme.spacing.unit * 2,
    },
    remove: {
        marginLeft: theme.spacing.unit * 2,
    }
});

class Cart extends Component {

    removeItem(index) {
        const { order, onUpdateCart, history } = this.props;
        const { cart } = order;
        cart.splice(index, 1);
        onUpdateCart(order.userId, cart).then(() => {
            if (cart.length === 0) {
                history.push('/menu');
                window.location.reload();
            } 
        });
    }

    render() {
        const { classes, order, onPlaceOrder, history } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="headline">Your Order</Typography>
                {_.get(order, 'cart', []).map((item, key) => (
                    <Grid container alignItems="center">
                        <Grid item xs={9}>
                            <Card className={classes.item}>
                                <Typography variant="subheading">{item.name}</Typography>
                                {Object.keys(item.options).map(option => (
                                    <Typography className={classes.option}>{`${option}: ${item.options[option]}`}</Typography>
                                ))}
                                <Typography className={classes.option}>{`Special Instructions: ${item.instructions || 'None'}`}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                              color="secondary"
                              className={classes.remove}
                              onClick={() => this.removeItem(key)}
                            >
                                Remove
                            </Button> 
                        </Grid>
                        
                    </Grid>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                      onPlaceOrder(order.userId).then(() => {
                        history.push('/menu');
                        window.location.reload();
                      });
                  }}
                  className={classes.button}
                >
                    Place Order
                </Button>                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLoginWithFb: credentials => dispatch(LoginApi.loginWithFb(credentials)),
    onGetCart: userId => dispatch(OrderApi.getCart(userId)),
    onUpdateCart: (userId, cart) => dispatch(OrderApi.updateCart(userId, cart)),
    onPlaceOrder: userId => dispatch(OrderApi.placeOrder(userId))
});

const mapStateToProps = (state) => {
    const { user } = state.loginApi;
    const { order } = state.orderApi;
    return {
        user,
        order,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Cart)));