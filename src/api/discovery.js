import { get } from 'utils';

// 轮播图数据
export const getBanner = async type => {
    const res = await get(`/banner`, { type });

    return res.banners;
};

// 推荐歌单数据
export const getPersonalized = async params => {
    const res = await get(`/personalized`, params);

    return res.result;
};

// 最新音乐数据
export const getNewSongs = async () => {
    const res = await get(`/personalized/newsong`);

    return res.result;
};

// 推荐mv数据
export const getPersonalizedMv = async () => {
    const res = await get(`/personalized/mv`);

    return res.result;
};
