import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import NavBar from 'components/Navbar';
import MenuItem from 'components/MenuItem';
import MenuApi from 'actions/api/MenuActions';
import { Typography } from '@material-ui/core';

const styles = theme => ({
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

    // responseFacebook = async (response) => {
    //     const user = await fetch('/api/login/', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(response),
    //     }).then(res => res.json());
    //     this.setState({ user });
    // }

    renderCategory(category) {
        const { menu } = this.props;

        return menu.menu.filter(item => item.category === category)
            .map(item => (
                <MenuItem
                  title={item.name}
                  description={item.description}
                  image={item.imageUrl}
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
            </div>
        );
    }

    render() {
        const { classes, menu } = this.props;
        return (
            <div>
                <NavBar />
                <div className={classes.menu}>
                    {
                        menu.success && this.renderMenuItems()
                    }
                </div>
                <FacebookLogin
                  appId="371809906684685"
                  autoLoad
                  fields="name,picture"
                  callback={this.responseFacebook}
                />
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.shape({
        menu: PropTypes.string,
    }).isRequired,
    menu: PropTypes.shape({
        success: PropTypes.bool,
        pending: PropTypes.bool,
        error: PropTypes.string,
        menu: PropTypes.array,
    }).isRequired,
    onGetMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onGetMenu: () => dispatch(MenuApi.getMenu()),
});

const mapStateToProps = (state) => {
    const { menu } = state.menu;
    return {
        menu,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Menu));
