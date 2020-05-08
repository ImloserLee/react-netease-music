import * as music from './action-type';

export const startSong = song => {
    return {
        type: music.START_SONG,
        song
    };
};

export const setPlayMode = code => {
    return {
        type: music.SET_PLAY_MODE,
        code
    };
};

export const setPlayList = songs => {
    return {
        type: music.SET_PLAY_LIST,
        songs
    };
};

export const setPlayListShow = flag => {
    return {
        type: music.SET_PLAY_LIST_SHOW,
        flag
    };
};
