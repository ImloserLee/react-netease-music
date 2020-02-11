import { get } from 'utils';
import url from './url';

// 获取用户信息
export const getUserDetail = async uid => {
    const res = await get(`${url.getUserDetail}`, { uid });
    return res;
};

// 获取用户歌单列表
export const getPlaylist = async uid => {
    const res = await get(`${url.getPlaylist}`, { uid });
    return res;
};
