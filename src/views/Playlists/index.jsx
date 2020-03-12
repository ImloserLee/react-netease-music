import React, { memo, useEffect, useState } from 'react';
import TopPlaylistCard from 'components/TopPlaylistCard';
import Tabs from 'components/Tabs';
import { getTopPlaylists } from 'api/playlist';
import './index.scss';

const TABS = [
    '全部',
    '欧美',
    '华语',
    '流行',
    '说唱',
    '摇滚',
    '民谣',
    '电子',
    '轻音乐',
    '影视原声',
    'ACG',
    '怀旧',
    '治愈',
    '旅行'
];

function Playlists() {
    const [topPlaylist, setTopPlaylist] = useState({});
    // 获取顶部精品歌单数据,默认是全部分类
    const getTopPlayData = async (index = 0) => {
        const { playlists } = await getTopPlaylists({
            limit: 1,
            cat: TABS[index]
        });

        setTopPlaylist(playlists[0]);
    };

    const handleTabChange = index => {
        getTopPlayData(index);
    };

    useEffect(() => {
        getTopPlayData();
    }, []);

    return (
        <div className='playlist-wrapper'>
            <div className='top-play-list-card'>
                <TopPlaylistCard {...topPlaylist} />
                <Tabs tabs={TABS} type='small' align='right' tabChange={handleTabChange} />
            </div>
        </div>
    );
}

export default memo(Playlists);
