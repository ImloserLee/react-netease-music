import { get } from 'utils/http';
import url from './url';

export const getUserDetail = async uid => {
    const res = await get(`${url.getUserDetail}`, { uid });
    return res;
};
