import { get } from 'utils';

export const getAllMvs = async params => {
    const ret = await get('/mv/all', params);

    return ret;
};
