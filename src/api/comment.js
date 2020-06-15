import { get } from "utils";

// 歌曲评论
export const getSongComment = async params => {
	const ret = await get("/comment/music", params);

	return ret;
};

// 歌单评论
export const getPlaylistComment = async params => {
	const ret = await get("/comment/playlist", params);

	return ret;
};

// 热门评论
export const getHotComment = async params => {
	const ret = await get("/comment/hot", params);

	return ret;
};

// mv评论
export const getMvComment = async params => {
	const ret = await get("/comment/mv", params);

	return ret;
};
