import * as music from "./action-type";
import { playModeMap } from "utils";

const defaultState = {
	// 当前播放歌曲
	currentSong: {},
	// 当前播放时长
	currentTime: {},
	// 播放状态
	playingState: false,
	// 播放模式
	playMode: playModeMap.sequence.code,
	// 播放列表显示
	isPlaylistShow: false,
	// 播放列表数据
	playList: [],
	// 播放器显示隐藏
	isPlayerShow: false,
	// 播放历史
	playHistory: []
};

export const musicReducer = (state = defaultState, action = {}) => {
	switch (action.type) {
		case music.SET_CURRENT_SONG:
			return { ...state, ...{ currentSong: action.song } };
		case music.SET_PLAY_MODE:
			return { ...state, ...{ playMode: action.code } };
		case music.SET_PLAY_LIST_SHOW:
			return { ...state, ...{ isPlayListShow: action.flag } };
		case music.SET_PLAY_LIST:
			return { ...state, ...{ playList: action.songs } };
		case music.SET_PLAYER_SHOW:
			return { ...state, ...{ isPlayerShow: action.flag } };
		case music.SET_CURRENT_TIME:
			return { ...state, ...{ currentTime: action.time } };
		case music.SET_PLAYING_STATE:
			return { ...state, ...{ playingState: action.state } };
		case music.SET_PLAY_HISTORY:
			return { ...state, ...{ playHistory: action.history } };
		default:
			return state;
	}
};
