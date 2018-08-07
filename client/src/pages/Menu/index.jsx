import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuApi from 'actions/api/MenuActions';
import LoginModal from 'components/LoginModal';
import MenuItem from 'components/MenuItem';

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

    renderCategory(category) {
        const { menu } = this.props;

        return menu.filter(item => item.category === category)
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
        const { classes, menuLoaded } = this.props;
        return (
            <div>
                <LoginModal />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Menu));
