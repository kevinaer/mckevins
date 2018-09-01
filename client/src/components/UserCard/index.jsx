import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const styles = theme => ({
    image: {
        borderRadius: theme.shape.borderRadius,
    },
    clicked: {},
    container: {
        textAlign: 'center',
    },
});

class UserCard extends React.Component {
    static propTypes = {
        onChangeAdminStatus: PropTypes.func.isRequired,
        id: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        classes: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
        };
    }

    changeAdminStatus(status) {
        const { onChangeAdminStatus, id } = this.props;
        onChangeAdminStatus(id, status).then(() => window.location.reload());
    }

    switchState() {
        const { clicked } = this.state;

        this.setState({ clicked: !clicked });
    }

    render() {
        const {
            name,
            image,
            isAdmin,
            classes,
        } = this.props;
        const { clicked } = this.state;
        return (
            <div>
            <ButtonBase
              focusRipple
              onClick={() => this.switchState()}
              className={classes.container}
            >
                <Card>
                    <CardContent>
                        <Typography
                          variant="title"
                        >
                            {name}
                        </Typography>
                    </CardContent>
                    <img
                      src={image}
                      title={name}
                      className={classes.image}
                      alt=""
                    />
                    {isAdmin && (
                        <CardContent>
                            <Typography
                              variant="title"
                              color="textSecondary"
                            >
                                Admin
                            </Typography>
                        </CardContent>
                    )}
                    {clicked && !isAdmin && (
                        <div>
                            <Typography
                              variant="title"
                            >
                                Make Admin?
                            </Typography>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button onClick={() => this.changeAdminStatus(true)} variant="contained" color="primary">Yes</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="secondary">No</Button>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                    {clicked && isAdmin && (
                        <div>
                            <Typography
                              variant="title"
                            >
                                Remove Admin?
                            </Typography>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button onClick={() => this.changeAdminStatus(false)} variant="contained" color="primary">Yes</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="secondary">No</Button>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Card>
            </ButtonBase>
            </div>
        );
    }
}

export default withStyles(styles)(UserCard);
