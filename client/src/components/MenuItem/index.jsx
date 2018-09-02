import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';

const styles = theme => ({
    image: {
        textAlign: 'right',
    },
    heading: {
        margin: theme.spacing.unit * 2,
    },
    container: {
        width: '100%',
        textAlign: 'left',
        display: 'inline-block',
    },
});

const MenuItem = ({
    title,
    description,
    image,
    classes,
    onClick,
}) => (
    <div>
        <ButtonBase className={classes.container} onClick={onClick}>
        <Card>
            <Grid container spacing={24}>
                <Grid item xs={8}>
                    <CardContent>
                        <Typography
                          variant="headline"
                          classnames={classes.heading}
                        >
                            {title}
                        </Typography>
                        <Typography variant="body1">
                          {description}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={4}>
                    <img
                        src={image}
                        height="200"
                        width="200"
                        className={classes.image}
                    />
                </Grid>
            </Grid>
        </Card>
        </ButtonBase>
    </div>
);

MenuItem.propTypes = {
    classes: PropTypes.shape({
        image: PropTypes.string,
        heading: PropTypes.string,
    }).isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};


export default withStyles(styles)(MenuItem);
