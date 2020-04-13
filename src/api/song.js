import { get } from 'utils';

// 新歌音乐列表数据
export const getTopSongs = async type => {
    const ret = await get(`/top/song?type=${type}`);

    return ret;
};
