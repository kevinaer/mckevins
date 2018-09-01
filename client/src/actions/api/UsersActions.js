import Api from 'actions/Api';

class UsersApi extends Api {
    getAllUsers() {
        return this.get();
    }
}

export default new UsersApi('USERS_API', 'api/users');
