import * as app from './action-type';

export const toggleTrigge = () => ({
    type: app.TOGGLE_TRIGGER
});

export const setBreadCrumb = breadcrumb => ({
    type: app.SET_BREADCRUMB,
    breadcrumb
});

export const setOpenKeys = route => ({
    type: app.SET_OPENKEYS,
    route
});
