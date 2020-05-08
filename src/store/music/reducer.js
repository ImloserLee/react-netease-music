import * as music from './action-type';
import { playModeMap } from 'utils';
const defaultState = {
    // 当前播放歌曲
    currentSong: {},
    // 播放模式
    playMode: playModeMap.sequence.code,
    // 播放列表显示
    isPlaylistShow: false,
    // 播放列表数据
    playList: []
};
export const musicReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case music.START_SONG:
            return { ...state, ...{ currentSong: action.song } };
        case music.SET_PLAY_MODE:
            return { ...state, ...{ playMode: action.code } };
        case music.SET_PLAY_LIST_SHOW:
            return { ...state, ...{ isPlayListShow: action.flag } };
        case music.SET_PLAY_LIST:
            return { ...state, ...{ playList: action.songs } };
        default:
            return state;
    }
};
