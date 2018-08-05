import LoginApi from 'actions/api/LoginActions';

const {
    API_SUCCESS,
    API_ERROR,
    API_PENDING,
} = LoginApi;

const defaultState = {
    success: false,
    error: null,
    pending: false,
    user: null,
};

const login = (state = defaultState, action = {}) => {
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
            user: action.data,
        };
    case API_ERROR:
        return {
            ...state,
            success: false,
            error: action.erorr,
            pending: false,
            user: null,
        };
    default:
        return state;
    }
};

export default login;
