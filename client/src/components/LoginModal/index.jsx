import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import PropTypes, { instanceOf } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import LoginApi from 'actions/api/LoginActions';

const styles = theme => ({
    modal: {
        top: '10rem',
        margin: 'auto',
        width: '50%',
    },
    container: {
        padding: theme.spacing.unit * 2,
    },
    component: {
        margin: theme.spacing.unit * 2,
    },
});

const LoginModal = ({
    classes,
    onLoginWithFb,
    user,
    cookies,
}) => (
    <Modal open={!user} className={classes.modal}>
        <div>
            <Paper className={classes.container}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
                <div className={classes.component}>
                    <Typography variant="title" id="modal-title">
                        Login
                    </Typography>
                </div>
                <div className={classes.component}>
                    <FacebookLogin
                      appId="371809906684685"
                      autoLoad={false}
                      fields="name,picture"
                      callback={data => (
                          onLoginWithFb(data).then((res) => {
                              cookies.set('name', res.data.name);
                              cookies.set('id', res.data._id);
                          })
                      )}
                    />
                </div>
                <Button color="primary" variant="contained" className={classes.component}>
                    Login as Guest
                </Button>
            </Grid>
            </Paper>
        </div>
    </Modal>
);

LoginModal.propTypes = {
    classes: PropTypes.shape({
        modal: PropTypes.string,
        container: PropTypes.string,
        component: PropTypes.string,
    }).isRequired,
    onLoginWithFb: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
    }),
    cookies: instanceOf(Cookies).isRequired,
};

LoginModal.defaultProps = {
    user: null,
};

const mapDispatchToProps = dispatch => ({
    onLoginWithFb: credentials => dispatch(LoginApi.loginWithFb(credentials)),
});

const mapStateToProps = (state) => {
    const { user } = state.loginApi;
    return {
        user,
    };
};

const styledLoginModal = withStyles(styles)(LoginModal);
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(styledLoginModal));
