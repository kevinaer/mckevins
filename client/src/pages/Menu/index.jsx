
import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes, { instanceOf } from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuApi from 'actions/api/MenuActions';
import LoginModal from 'components/LoginModal';
import MenuItem from 'components/MenuItem';

const styles = theme => ({
    root: {
        paddingBottom: theme.spacing.unit * 4,
    },
    menu: {
        padding: theme.spacing.unit,
        marginTop: theme.mixins.toolbar.minHeight + theme.spacing.unit,
    },
    group: {
        marginBottom: theme.spacing.unit,
    },
});

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        const { onGetMenu } = this.props;

        onGetMenu();
    }

    renderCategory(category) {
        const { menu, history } = this.props;
        if (!menu.length) {
            return (
                <Typography variant="subheading">
                    No items currently exist
                </Typography>
            );
        }
        return menu.filter(item => item.category === category)
            .map(item => (
                <MenuItem
                  title={item.name}
                  description={item.description}
                  image={item.imageUrl}
                  onClick={() => {
                      history.push(`/menu/${item._id}`);
                      window.location.reload();
                  }}
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

    render() {
        const { classes, menuLoaded, cookies } = this.props;
        return (
            <div className={classes.root}>
                {!cookies.get('id') && (<LoginModal />)}
                <div className={classes.menu}>
                    {
                        menuLoaded && this.renderMenuItems()
                    }
                </div>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.shape({
        menu: PropTypes.string,
    }).isRequired,
    menu: PropTypes.arrayOf({
        name: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    cookies: instanceOf(Cookies).isRequired,
    menuLoaded: PropTypes.bool.isRequired,
    onGetMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onGetMenu: () => dispatch(MenuApi.getMenu()),
});

const mapStateToProps = (state) => {
    const { menu } = state.menuApi;
    const { user } = state.loginApi;
    return {
        menu,
        menuLoaded: state.menuApi.success,
        user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withCookies(withStyles(styles)(Menu))));
