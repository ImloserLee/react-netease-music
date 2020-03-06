import { get } from 'utils';
import url from './url';

export const getSearchHot = async () => {
    const res = await get(`${url.hotSearchList}`);

    return res.result;
};

export const getSearchSuggest = async keywords => {
    const res = await get(`${url.searchSuggest}`, { keywords });

    return res.result;
};
