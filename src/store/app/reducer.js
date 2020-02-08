import * as app from './action-type';
const defaultState = {
    routes: [],
    collapsed: false,
    breadcrumb: [],
    openkeys: []
};
export const appReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case app.TOGGLE_TRIGGER:
            return { ...state, ...{ collapsed: !state.collapsed } };
        case app.SET_BREADCRUMB:
            return { ...state, ...{ breadcrumb: action.breadcrumb } };
        case app.SET_OPENKEYS:
            return { ...state, ...{ openkeys: action.route } };
        default:
            return state;
    }
};
