import * as user from './action-type';
import { getUserDetail } from 'api/user';
import { setStorage, UID_KEY, genUsermenu } from 'utils';
import { message } from 'antd';
import { getPlaylist } from '../../api/user';

export const setUser = profile => ({
    type: user.SET_USER,
    profile
});

export const setLogin = flag => ({
    type: user.SET_LOGIN,
    flag
});

export const setPlaylist = playlist => ({
    type: user.SET_PLAYLIST,
    playlist
});

export const login = uid => {
    return async dispatch => {
        try {
            const res = await getUserDetail(uid);

            dispatch(setUser(res.profile));
            dispatch(setLogin(true));
            setStorage(UID_KEY, res.profile.userId);
            const { playlist } = await getPlaylist(uid);
            const playlistMenu = genUsermenu(playlist, res.profile.userId);

            dispatch(setPlaylist(playlistMenu));
        } catch (e) {
            message.error('登陆失败,请输入正确的uid');
            return false;
        }
        return true;
    };
};

export const logout = () => {
    return async dispatch => {
        dispatch(setUser({}));
        dispatch(setLogin(false));
        setStorage(UID_KEY, null);
    };
};
