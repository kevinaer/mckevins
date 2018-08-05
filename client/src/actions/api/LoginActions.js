import Api from 'actions/Api';

class LoginApi extends Api {
    loginWithFb(credentials) {
        return this.post('', credentials);
    }
}

export default new LoginApi('LOGIN_API', 'api/login');
