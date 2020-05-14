import * as music from './action-type';

export const startSong = rawSong => {
    const song = Object.assign({}, rawSong);

    return dispatch => {
        dispatch(setCurrentSong(song));
    };
};

export const setCurrentSong = song => {
    return {
        type: music.SET_CURRENT_SONG,
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

export const clearPlayList = () => {
    return {
        type: music.CLEAR_PLAY_LIST,
        playList: []
    };
};

export const setPlayerShow = flag => {
    return {
        type: music.SET_PLAYER_SHOW,
        flag
    };
};
