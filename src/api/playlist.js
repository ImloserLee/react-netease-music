import { get } from 'utils';

// 精品歌单
export const getTopPlaylists = async params => {
    const res = await get(`/top/playlist/highquality`, params);

    return res;
};
