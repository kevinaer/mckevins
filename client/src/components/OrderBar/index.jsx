import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ButtonBase, AppBar, Typography } from '@material-ui/core';
import _ from 'lodash';

const styles = theme => ({
    bar: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        left: 0,
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.secondary.main,
    }
})

const OrderBar = ({ classes, order, onClick }) => (
    <ButtonBase className={classes.bar} onClick={onClick}>
        <Typography variant="title" color="textSecondary">
            {`Cart: ${_.get(order, 'cart.length', 0)}`}
        </Typography>
    </ButtonBase>
);

export default withStyles(styles)(OrderBar);

