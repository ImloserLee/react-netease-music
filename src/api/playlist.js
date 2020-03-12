import { get } from 'utils';

// 精品歌单
export const getTopPlaylists = async params => {
    const res = await get(`/top/playlist/highquality`, params);

    return res;
};

// 获取歌单
export const getPlaylists = async params => {
    const res = await get(`/top/playlist`, params);

    return res;
};
