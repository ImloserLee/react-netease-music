import * as music from "./action-type";

// 开始播放歌曲
export const startSong = rawSong => {
	const song = Object.assign({}, rawSong);

	return dispatch => {
		dispatch(setCurrentSong(song));
	};
};

// 设置当前播放歌曲
export const setCurrentSong = song => {
	return {
		type: music.SET_CURRENT_SONG,
		song
	};
};

// 设置播放模式
export const setPlayMode = code => {
	return {
		type: music.SET_PLAY_MODE,
		code
	};
};

// 设置播放歌单
export const setPlayList = songs => {
	return {
		type: music.SET_PLAY_LIST,
		songs
	};
};

// 设置播放歌单的展示
export const setPlayListShow = flag => {
	return {
		type: music.SET_PLAY_LIST_SHOW,
		flag
	};
};

// 清除播放歌单
export const clearPlayList = () => {
	return {
		type: music.CLEAR_PLAY_LIST,
		playList: []
	};
};

// 设置播放器的展示
export const setPlayerShow = flag => {
	return {
		type: music.SET_PLAYER_SHOW,
		flag
	};
};

// 设置当前播放时长
export const setCurrentTime = time => {
	return {
		type: music.SET_CURRENT_TIME,
		time
	};
};

// 设置播放状态
export const setPlayingState = state => {
	return {
		type: music.SET_PLAYING_STATE,
		state
	};
};
