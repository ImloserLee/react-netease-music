import { get } from 'utils/http';
import url from './url';

export const getSearchHot = async () => {
    const res = await get(`${url.hotSearchList}`);

    if (res.code === 200) {
        return res.result;
    }
};

export const getSearchSuggest = async keywords => {
    const res = await get(`${url.searchSuggest}`, { keywords });

    if (res.code === 200) {
        return res.result;
    }
};
