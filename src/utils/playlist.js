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
