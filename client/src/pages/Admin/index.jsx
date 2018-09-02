import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Button, Card, Divider } from '@material-ui/core';
import _ from 'lodash'

import MenuApi from 'actions/api/MenuActions';
import OrderApi from 'actions/api/OrderActions';
import OrdersApi from 'actions/api/OrdersActions';
import UsersApi from 'actions/api/UsersActions';
import UserApi from 'actions/api/UserActions';
import MenuItem from 'components/MenuItem';
import UserCard from 'components/UserCard';
import CreateItemModal from 'components/CreateItemModal';

const styles = theme => ({
    page: {
        padding: theme.spacing.unit,
        marginTop: theme.mixins.toolbar.minHeight + theme.spacing.unit,
    },
    content: {
        flexGrow: 1,
        marginTop: 2 * theme.mixins.toolbar.minHeight + 3 * theme.spacing.unit,
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
    group: {
        marginBottom: theme.spacing.unit,
    },
    image: {
        borderRadius: theme.shape.borderRadius,
        marginBottom: theme.spacing.unit,
    },
    order: {
        textAlign: "center",
        padding: theme.spacing.unit,
    },
    orderItem: {
        marginBottom: theme.spacing.unit,
    }
});

class Admin extends Component {
    propTypes = {
        onGetAllUsers: PropTypes.func.isRequired,
        onGetMenu: PropTypes.func.isRequired,
        onChangeAdminStatus: PropTypes.func.isRequired,
        menu: PropTypes.array.isRequired,
        classes: PropTypes.object,
        cookies: instanceOf(Cookies).isRequired,
        users: PropTypes.object,
    }

    constructor(props) {
        super(props);

        const { cookies } = props;
        const tab = parseInt(cookies.get('tab'), 10);
        this.state = {
            tab,
            open: false,
        };
    }

    componentDidMount() {
        const { onGetAllUsers, onGetMenu, onGetAllOrders } = this.props;
        onGetAllUsers();
        onGetMenu();
        onGetAllOrders();
    }

    componentDidUpdate(prevProps) {
        const { orders, users } = this.props;

        if (prevProps.orders !== orders) {
            const placedOrders = orders.filter(order => order.status === 'placed');
            const doneOrders = orders.filter(order => order.status === 'done');
            this.setState({ placedOrders, doneOrders });
        }
        if (users !== prevProps.users) {
            const mappedUsers = users.reduce((sum, user) => (
                {...sum, [user._id]: {
                    name: user.name,
                    url: user.url,
                }}
            ), {});
            this.setState({ mappedUsers });
        }
    }

    renderCategory(category) {
        const { menu } = this.props;
        const filteredMenu = menu.filter(item => item.category === category);
        if (!filteredMenu.length) {
            return (
                <Typography variant="subheading">
                    No items currently exist
                </Typography>
            );
        }
        return filteredMenu.map(item => (
                <MenuItem
                  title={item.name}
                  description={item.description}
                  image={item.imageUrl}
                  onClick={() => this.setState({ open: true, item })}
                />
        ));
    }

    renderMenuItems() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.group}>
                    <Typography variant="headline">
                        Main
                    </Typography>
                    {this.renderCategory('main')}
                </div>
                <div className={classes.group}>
                    <Typography variant="headline">
                        Sides
                    </Typography>
                    {this.renderCategory('sides')}
                </div>
                <div className={classes.group}>
                    <Typography variant="headline">
                        Drinks
                    </Typography>
                    {this.renderCategory('drinks')}
                </div>
                <div className={classes.group}>
                    <Typography variant="headline">
                        Desserts
                    </Typography>
                    {this.renderCategory('desserts')}
                </div>
            </div>
        );
    }

    renderMenu() {
        const { menu } = this.props;
        const { open, item } = this.state;

        return (
            <div>
                {!menu.length && (
                    <Typography
                      variant="headline"
                    >
                        No Items on the Menu
                    </Typography>
                )}
                {menu.length && this.renderMenuItems()}
                <CreateItemModal
                  open={open}
                  item={item}
                  onClose={() => this.setState({ open: false })}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.setState({ open: true, item: null })}
                >
                    Create
                </Button>
            </div>
        );
    }

    renderUsers() {
        const { users, classes, onChangeAdminStatus } = this.props;
        return (
            <div>
                <Typography
                  variant="headline"
                >
                    Admins
                </Typography>
                <Grid container spacing={8}>
                    {users.filter(user => user.isAdmin).map(user => (
                        <Grid item lg={3} md={4}>
                            <UserCard
                              name={user.name}
                              image={user.url}
                              id={user._id}
                              isAdmin={user.isAdmin}
                              key={user.name}
                              onChangeAdminStatus={onChangeAdminStatus}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.divider} />
                <Typography
                  variant="headline"
                >
                    Users
                </Typography>
                <Grid container spacing={8}>
                    {users.filter(user => !user.isAdmin).map(user => (
                        <Grid item lg={3} md={4}>
                            <UserCard
                              name={user.name}
                              image={user.url}
                              id={user._id}
                              isAdmin={user.isAdmin}
                              key={user.name}
                              onChangeAdminStatus={onChangeAdminStatus}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }

    renderOrders() {
        const { placedOrders, doneOrders, mappedUsers } = this.state;
        const { classes, onFinishOrder } = this.props;

        const OrderCard = (order, isDone=false) => (
            <Grid item lg={3} md={4}>
                <Card className={classes.order}>
                    <Typography variant="title">
                        {mappedUsers[order.userId].name}
                    </Typography>
                    <img
                        src={mappedUsers[order.userId].url}
                        title={mappedUsers[order.userId].name}
                        className={classes.image}
                        alt=""
                    />
                    {_.get(order, 'cart', []).map((item, key) => (
                        <div className={classes.orderItem}>
                            <Typography variant="subheading">{item.name}</Typography>
                            {Object.keys(item.options).map(option => (
                                <Typography>{`${option}: ${item.options[option]}`}</Typography>
                            ))}
                            <Typography>{`Special Instructions: ${item.instructions || 'None'}`}</Typography>
                            <Divider />
                        </div>
                    ))}
                    {!isDone && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                              onFinishOrder(order._id);
                              window.location.reload();
                          }}
                        >
                            Mark as complete
                        </Button>
                    )}
                </Card>
            </Grid>
        )
        return (
            <div>
                <Typography
                  variant="headline"
                >
                    In Progress Orders
                </Typography>
                {placedOrders && mappedUsers && (
                    <Grid container spacing={8}>
                        {placedOrders.map(order => OrderCard(order))}
                    </Grid>
                )}
                <Typography
                  variant="headline"
                >
                    Completed Orders
                </Typography>
                {doneOrders && mappedUsers && (
                    <Grid container spacing={8}>
                        {doneOrders.map(order => OrderCard(order, true))}
                    </Grid>
                )}
            </div>
        );
    }

    render() {
        const { tab } = this.state;
        const { classes, cookies } = this.props;
        return (
            <div>
                <AppBar className={classes.page}>
                    <Tabs
                      value={tab}
                      onChange={(event, value) => {
                          cookies.set('tab', value);
                          this.setState({ tab: value });
                      }}
                      fullWidth
                    >
                        <Tab label="Menu" />
                        <Tab label="Users" />
                        <Tab label="Orders" />
                    </Tabs>
                </AppBar>
                <div className={classes.content}>
                    {tab === 0 && this.renderMenu()}
                    {tab === 1 && this.renderUsers()}
                    {tab === 2 && this.renderOrders()}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onChangeAdminStatus: (id, admin) => dispatch(UserApi.changeAdminStatus(id, admin)),
    onGetAllUsers: () => dispatch(UsersApi.getAllUsers()),
    onGetMenu: () => dispatch(MenuApi.getMenu()),
    onGetAllOrders: () => dispatch(OrdersApi.getAllOrders()),
    onFinishOrder: orderId => dispatch(OrderApi.finishOrder(orderId)),
});

const mapStateToProps = (state) => {
    const { users } = state.usersApi;
    const { menu } = state.menuApi;
    const { orders } = state.ordersApi;
    return {
        menu,
        users,
        orders,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(withStyles(styles)(Admin)));
