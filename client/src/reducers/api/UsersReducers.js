import UsersApi from 'actions/api/UsersActions';

const {
    API_SUCCESS,
    API_ERROR,
    API_PENDING,
} = UsersApi;

const defaultState = {
    success: false,
    error: null,
    pending: false,
    users: [],
};

const users = (state = defaultState, action = {}) => {
    switch (action.type) {
    case API_PENDING:
        return {
            ...state,
            success: false,
            error: null,
            pending: true,
        };
    case API_SUCCESS:
        return {
            ...state,
            success: true,
            error: null,
            pending: false,
            users: action.data,
        };
    case API_ERROR:
        return {
            ...state,
            success: false,
            error: action.erorr,
            pending: false,
            users: null,
        };
    default:
        return state;
    }
};

export default users;
