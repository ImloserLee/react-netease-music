import * as user from './action-type';
import { getUserDetail } from 'api/user';
import { message } from 'antd';

export const setUser = info => ({
    type: user.SET_USER,
    info
});

export const login = uid => {
    return async dispatch => {
        try {
            const res = await getUserDetail(uid);
            console.log('%c 🎉 res: ', 'background-color: #ed763b;color:#fff;', res);
            dispatch(setUser());
        } catch (e) {
            message.error('登陆失败,请输入正确的uid');
            return false;
        }
        return true;
    };
};
