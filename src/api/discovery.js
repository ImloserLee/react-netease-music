import { get } from 'utils';
import url from './url';

// 轮播图数据
export const getBanner = async type => {
    const res = await get(`${url.getBanner}`, { type });

    return res.banners;
};
