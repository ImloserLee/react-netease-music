import * as music from "./action-type";

// 开始播放歌曲
export const startSong = rawSong => {
	const song = Object.assign({}, rawSong);

	return (dispatch, getState) => {
		const {
			musicReducer: { playHistory }
		} = getState();

		const playHistoryCopy = playHistory.slice();

		const findedIndex = playHistoryCopy.findIndex(({ id }) => song.id === id);

		if (findedIndex !== -1) {
			// 删除旧的一项，插入到最前面
			playHistoryCopy.splice(findedIndex, 1);
		}
		playHistoryCopy.unshift(song);

		dispatch(setPlayHistory(playHistoryCopy));

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
	return dispatch => {
		dispatch(setPlayList([]));
		dispatch(clearCurrentSong());
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

// 设置历史记录
export const setPlayHistory = history => {
	return {
		type: music.SET_PLAY_HISTORY,
		history
	};
};

// 清除历史记录
export const clearPlayHistory = () => {
	return dispatch => {
		dispatch(setPlayHistory([]));
	};
};

// 清除当前歌曲
export const clearCurrentSong = () => {
	return dispatch => {
		dispatch(setPlayingState(false));
		dispatch(setCurrentTime(0));
		dispatch(setCurrentSong({}));
	};
};

// 更新结果数据
export const updateCount = count => {
	return {
		type: music.UPDATE_COUNT,
		count
	};
};
