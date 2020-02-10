import * as user from './action-type';
const defaultState = {
    userMenu: []
};

export const userReducder = (state = defaultState, action = {}) => {
    switch (action.type) {
        case user.SET_USER:
            return state;
        default:
            return state;
    }
};
