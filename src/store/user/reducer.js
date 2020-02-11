import * as user from './action-type';
const defaultState = {
    userInfo: {}, // 用户信息
    userPlaylist: [], // 用户歌单列表
    isLogin: false
};

export const userReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case user.SET_USER:
            return { ...state, ...{ userInfo: action.profile } };
        case user.SET_LOGIN:
            return { ...state, ...{ isLogin: action.flag } };
        case user.SET_PLAYLIST:
            return { ...state, ...{ userPlaylist: action.playlist } };
        default:
            return state;
    }
};
