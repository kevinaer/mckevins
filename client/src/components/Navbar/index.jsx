import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        flexGrow: 1,
    },
};

const NavBar = ({ classes }) => (
    <div className={classes.root}>
    <AppBar position="fixed" color="default">
        <Toolbar>
        <Typography variant="title" color="inherit">
            {'McKevin\'s Menu'}
        </Typography>
        </Toolbar>
    </AppBar>
    </div>
);


NavBar.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
    }).isRequired,
};

export default withStyles(styles)(NavBar);
