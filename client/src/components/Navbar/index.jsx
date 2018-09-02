import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import PropTypes, { instanceOf } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        padding: `${theme.spacing.unit}px 0`,
    },
});

class NavBar extends React.Component {
    state = {
        anchorEl: false,
    }

    handleOpen = event => (
        this.setState({ anchorEl: event.currentTarget })
    )

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    logout = () => {
        const { cookies } = this.props;
        this.handleClose();
        cookies.remove('name');
        cookies.remove('id');
        window.location.reload();
    }

    render() {
        const {
            classes,
            cookies,
            isAdmin,
            history,
        } = this.props;
        const { anchorEl } = this.state;
        return (
            <div className={classes.root}>
            <AppBar position="fixed" color="default">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={9} className={classes.title}>
                            <Typography variant="title" color="inherit">
                                {'McKevin\'s Menu'}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            {cookies.get('name') && (
                                <div>
                                    <Button
                                      onClick={this.handleOpen}
                                    >
                                        {`${cookies.get('name')}`}
                                    </Button>
                                    <Menu
                                      id="user-menu"
                                      anchorEl={anchorEl}
                                      open={Boolean(anchorEl)}
                                      onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.logout}>Log Out</MenuItem>
                                        {isAdmin && (
                                            <MenuItem
                                              onClick={() => {
                                                  history.push('/admin');
                                                  window.location.href = window.location.href;
                                              }}
                                            >
                                                Admin Page
                                            </MenuItem>
                                        )}
                                    </Menu>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
    }).isRequired,
    cookies: instanceOf(Cookies).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(withCookies(withStyles(styles)(NavBar)));
