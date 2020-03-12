import { get } from 'utils';

// 获取用户信息
export const getUserDetail = async uid => {
    const res = await get(`/user/detail`, { uid });
    return res;
};

// 获取用户歌单列表
export const getPlaylist = async uid => {
    const res = await get(`/user/playlist`, { uid });
    return res;
};
