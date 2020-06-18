import { get } from "utils";

export const getAllMvs = async params => {
	const ret = await get("/mv/all", params);

	return ret;
};

export const getMvDetails = async id => {
	const ret = await get(`/mv/detail?mvid=${id}`);

	return ret;
};

export const getSimiMv = async id => {
	const ret = await get(`/simi/mv?mvid=${id}`);

	return ret;
};

export const getMvUrl = async id => {
	const ret = await get(`/mv/url?id=${id}`);

	return ret;
};

export const getArtists = async id => {
	const ret = await get(`/artists?id=${id}`);

	return ret;
};
