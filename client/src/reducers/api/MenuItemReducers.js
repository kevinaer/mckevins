import MenuItemApi from 'actions/api/MenuItemActions';

const {
    API_SUCCESS,
    API_ERROR,
    API_PENDING,
} = MenuItemApi;

const defaultState = {
    success: false,
    error: null,
    pending: false,
    menuItem: {},
};

const menuItem = (state = defaultState, action = {}) => {
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
            menuItem: action.data,
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

export default menuItem;