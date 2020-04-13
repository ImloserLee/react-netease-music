import * as music from './action-type';

export const startSong = song => {
    return {
        type: music.START_SONG,
        song
    };
};
