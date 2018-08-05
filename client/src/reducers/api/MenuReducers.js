import MenuApi from 'actions/api/MenuActions';

const {
    API_SUCCESS,
    API_ERROR,
    API_PENDING,
} = MenuApi;

const defaultState = {
    success: false,
    error: null,
    pending: false,
    menu: [],
};

const menu = (state = defaultState, action = {}) => {
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
            menu: action.data,
        };
    case API_ERROR:
        return {
            ...state,
            success: false,
            error: action.erorr,
            pending: false,
            menu: null,
        };
    default:
        return state;
    }
};

export default menu;
