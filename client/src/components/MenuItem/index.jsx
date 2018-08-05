import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    image: {
        height: 0,
        paddingTop: '75%',
    },
    heading: {
        margin: theme.spacing.unit * 2,
    },
});

const MenuItem = ({
    title,
    description,
    image,
    classes,
}) => (
    <div>
        <Card>
            <Grid container spacing={24}>
                <Grid item xs={6}>
                    <CardContent>
                        <Typography
                          variant="headline"
                          classnames={classes.heading}
                        >
                            {title}
                        </Typography>
                        <Divider />
                        <Typography variant="body1">
                          {description}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={6}>
                    <CardMedia
                      image={image}
                      title={title}
                      className={classes.image}
                    />
                </Grid>
            </Grid>
        </Card>
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
};


export default withStyles(styles)(MenuItem);
