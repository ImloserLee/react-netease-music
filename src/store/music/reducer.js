import * as music from './action-type';
const defaultState = {
    // 当前播放歌曲
    currentSong: {}
};
export const musicReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case music.START_SONG:
            return { ...state, ...{ currentSong: action.song } };
        default:
            return state;
    }
};
