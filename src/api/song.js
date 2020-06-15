import { get } from "utils";

// 新歌音乐列表数据
export const getTopSongs = async type => {
	const ret = await get(`/top/song?type=${type}`);

	return ret;
};

// 歌词
export const getLyric = async id => {
	const ret = await get(`/lyric?id=${id}`);

	return ret;
};

// 相似音乐
export const getSimiSongs = async (id, option) => {
	const ret = await get(`/simi/song?id=${id}`, option);

	return ret;
};
