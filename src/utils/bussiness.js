/**
 * 业务工具方法
 */

export function createSong(song) {
    const { id, name, img, artists, duration, mvId, ...rest } = song;

    return {
        id,
        name,
        img,
        artists,
        duration,
        durationSecond: duration / 1000,
        artistsText: genArtistisText(artists),
        ...rest
    };
}

export function genArtistisText(artists) {
    return (artists || []).map(({ name }) => name).join('/');
}
