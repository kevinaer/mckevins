import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import MenuItemApi from 'actions/api/MenuItemActions';
import OrderApi from 'actions/api/OrderActions';
import { Typography, FormControl, FormLabel, Divider, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@material-ui/core';

const styles = theme => ({
    item: {
        padding: theme.spacing.unit,
        marginTop: theme.mixins.toolbar.minHeight + theme.spacing.unit,
    },
    option: {
        display: 'block',
        paddingTop: theme.spacing.unit,
    },
    image: {
        borderRadius: theme.shape.borderRadius,
    },
    button: {
        display: 'block',
        marginTop: theme.spacing.unit
    }
});

class MenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {},
            instructions: '',
        };
    }

    componentDidMount() {
        const { onGetMenuItem } = this.props;
        const { id } = this.props.match.params;
        onGetMenuItem(id);
    }

    onComponentDidUpdate(prevProps) {
        const { menuItem } = this.props;

        if (menuItem && menuItem !== prevProps.menuItem) {
            const options = menuItem.ingredients.reduce((sum, iter) => (
                {...sum, [iter.name]: iter.options[0] }
            ), {});
            this.setState({ options });
        }
    }

    onSubmit() {
        const { order, menuItem, onUpdateCart, onGetCart } = this.props;
        const { options, instructions } = this.state;
        const cart = _.get(order, 'cart', []);
        cart.push({ name: menuItem.name, options, instructions})
        onUpdateCart(order.userId, cart)
        .then(() => this.onClose());
    }

    onClose() {
        const { history, onGetCart, order } = this.props;
        onGetCart(order.userId).then(() => {
            history.push('/menu');
            window.location.reload();
        })
        
    }

    renderOptions() {
        const { options } = this.state;
        const { menuItem, classes } = this.props;
        return (
            <div>
                <Divider/>
                {_.get(menuItem, 'ingredients.length', 0) > 0 && (
                    <Typography variant="subheading">Options</Typography>
                )}
                {menuItem.ingredients.map(ingredient => (
                    <FormControl className={classes.option}>
                        <FormLabel>{ingredient.name}</FormLabel>
                        <RadioGroup
                          aria-label={ingredient.name}
                          name={ingredient.name}
                          value={_.get(options, ingredient.name)}
                          onChange={e => {
                              this.setState({ options: { ...options, [ingredient.name]: e.target.value }})
                          }}
                        >
                            {ingredient.options.map(option => (
                                <FormControlLabel value={option} control={<Radio />} label={option} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                ))}              
            </div>
        );
    }

    render() {
        const { classes, user, menuItem, order } = this.props;
        const { instructions } = this.state;
        return (
            <div className={classes.item}>
                <img className={classes.image} src={menuItem.imageUrl} height="200" width="200" alt="" />
                <Typography variant="headline">{menuItem.name}</Typography>
                <Typography variant="body1">{menuItem.description}</Typography>
                {_.get(menuItem, 'ingredients') && this.renderOptions()}
                <TextField
                  id="instructions"
                  label="Special Instructions"
                  value={instructions}
                  onChange={e => this.setState({ instructions: e.target.value })}
                />
                <div className={classes.button}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.onSubmit()}
                    >
                        Submit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.onClose()}
                    >
                        Cancel
                    </Button>
                </div>             
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onUpdateCart: (userId, cart) => dispatch(OrderApi.updateCart(userId, cart)),
    onGetCart: (userId) => dispatch(OrderApi.getCart(userId)),
    onGetMenuItem: (id) => dispatch(MenuItemApi.getMenuItem(id)),
});

const mapStateToProps = (state) => {
    const { menuItem } = state.menuItemApi;
    const { order } = state.orderApi;
    const { user } = state.loginApi;
    return {
        menuItem,
        user,
        order,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(MenuItem)));