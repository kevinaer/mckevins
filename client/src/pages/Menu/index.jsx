import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import NavBar from 'components/Navbar';
import MenuItem from 'components/MenuItem';

const styles = theme => ({
    menu: {
        padding: theme.spacing.unit,
        marginTop: theme.mixins.toolbar.minHeight + theme.spacing.unit * 2,
    },
});

const IMAGE = 'https://www.habitburger.com/wp-content/themes/habitburger/images/slider_charburger.png';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    responseFacebook = async (response) => {
        let user;
        try {
            user = await fetch(`/api/user/${response.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            }).then(res => res.json());
        } catch (err) {
            user = await fetch('/api/user/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(response),
            }).then(res => res.json());
        }
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <NavBar />
                <Paper className={classes.menu}>
                    {user && (
                        <div>
                            <h1>
                                {user.name}
                            </h1>
                            <img src={`${user.url}`} alt="profile" />
                        </div>
                    )}
                    <MenuItem
                      title="Burger"
                      description="Muh burgers lololol"
                      image={IMAGE}
                    />
                </Paper>
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
};

export default withStyles(styles)(Menu);
