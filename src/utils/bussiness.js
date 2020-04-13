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
        mvId,
        durationSecond: duration / 1000,
        artistsText: genArtistisText(artists),
        ...rest
    };
}

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

/**
 * 侧边栏相关工具函数
 */

// 生成创建的歌单列表
function genCreatePlaylist(userPlaylist, userId) {
    return userPlaylist.filter(playlist => {
        return playlist.userId === userId;
    });
}

// 生成收藏的歌单列表
function genCollectPlaylist(userPlaylist, userId) {
    return userPlaylist.filter(playlist => {
        return playlist.userId !== userId;
    });
}

// 将各类型的歌单列表处理成符合路由跳转的形式
function genPlaylist(playlist) {
    return playlist.map(({ id, name, coverImgUrl, trackCount }) => {
        return {
            path: `/playlists/${id}`,
            title: name,
            avatar: coverImgUrl,
            num: trackCount
        };
    });
}

export function genUsermenu(userPlaylist, userId) {
    const retMenu = [];
    const createPlaylist = genCreatePlaylist(userPlaylist, userId);
    const collectPlaylist = genCollectPlaylist(userPlaylist, userId);

    if (createPlaylist.length) {
        retMenu.push({
            type: 'playlist',
            title: '创建的歌单',
            children: genPlaylist(createPlaylist)
        });
    }
    if (collectPlaylist.length) {
        retMenu.push({
            type: 'playlist',
            title: '收藏的歌单',
            children: genPlaylist(collectPlaylist)
        });
    }

    return retMenu;
}
