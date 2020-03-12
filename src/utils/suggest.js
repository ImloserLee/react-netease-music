/**
 * 搜索栏相关工具函数
 */

function genArtistisText(artists) {
    return (artists || []).map(({ name }) => name).join('/');
}
// 生成搜索建议的列表
export function genSuggestList(suggest) {
    return [
        {
            title: '单曲',
            icon: 'music',
            data: suggest.songs,
            renderName(song) {
                return `${song.name}-${genArtistisText(song.artists)}`;
            }
        },
        {
            title: '歌单',
            icon: 'playlist',
            data: suggest.playlists
        },
        {
            title: 'mv',
            icon: 'mv',
            data: suggest.mvs,
            renderName(mv) {
                return `${mv.name}-${genArtistisText(mv.artists)}`;
            }
        }
    ];
}
