import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Button } from '@material-ui/core';

import MenuApi from 'actions/api/MenuActions';
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
        const { orders } = this.props;
        return (
            <div>
                <Typography
                  variant="headline"
                >
                    In Progress Orders
                </Typography>
                <Typography
                  variant="headline"
                >
                    Completed Orders
                </Typography>
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
