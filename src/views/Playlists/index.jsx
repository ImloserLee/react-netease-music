import React, { memo, useEffect, useState } from 'react';
import TopPlaylistCard from 'components/TopPlaylistCard';
import Tabs from 'components/Tabs';
import PlaylistCard from 'components/PlaylistCard';
import { getTopPlaylists, getPlaylists } from 'api/playlist';
import { getPageOffset } from 'utils';
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

const PAGE_SIZE = 50;

function Playlists() {
    const [topPlaylist, setTopPlaylist] = useState({});
    const [songPlaylists, setSongPlaylists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // 获取顶部精品歌单数据,默认是全部分类
    const getTopPlayData = async (index = 0) => {
        const { playlists } = await getTopPlaylists({
            limit: 1,
            cat: TABS[index]
        });

        setTopPlaylist(playlists[0] || {});
    };

    // 获取歌单列表数据
    const getPlaylistsData = async (index = 0) => {
        const { playlists } = await getPlaylists({
            limit: PAGE_SIZE,
            cat: TABS[index],
            offset: getPageOffset(currentPage, PAGE_SIZE)
        });

        setSongPlaylists(playlists);

        console.log('%c 🧠 playlists: ', 'background-color: #3F7CFF;color:#fff;', playlists);
    };

    const handleTabChange = index => {
        getTopPlayData(index);
    };

    useEffect(() => {
        getTopPlayData();
        getPlaylistsData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='playlist-wrapper'>
            <div className='top-play-list-card'>
                {topPlaylist.id && <TopPlaylistCard {...topPlaylist} />}

                <Tabs tabs={TABS} type='small' align='right' tabChange={handleTabChange} />
                <div className='playlist-cards'>
                    {songPlaylists.length &&
                        songPlaylists.map(list => {
                            return (
                                <PlaylistCard
                                    copywriter={`播放量: ${list.playCount}`}
                                    name={list.name}
                                    picUrl={list.coverImgUrl}
                                    key={list.id}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default memo(Playlists);
