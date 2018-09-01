import Api from 'actions/Api';

class UserApi extends Api {
    changeAdminStatus(id, admin) {
        return this.put('/admin', { id, admin });
    }
}

export default new UserApi('USER_API', 'api/user');
