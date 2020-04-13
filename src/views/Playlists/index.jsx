import React, { useEffect, useState, useCallback } from 'react';
import { Pagination, Spin } from 'antd';
import TopPlaylistCard from 'components/TopPlaylistCard';
import Tabs from 'components/Tabs';
import PlaylistCard from 'components/PlaylistCard';
import { getTopPlaylists, getPlaylists } from 'api/playlist';
import { getPageOffset, formatNumber, unique } from 'utils';
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
    const [topPlaylist, setTopPlaylist] = useState({}); // 精品歌单数据
    const [songPlaylists, setSongPlaylists] = useState([]); // 歌单列表数据
    const [songTotal, setSongTotal] = useState(0); // 歌单总数
    const [currentIndex, setCurrentIndex] = useState(0); // tab高亮的下标
    const [pageIndex, setPageIndex] = useState(1); // 当前的页数
    const [loading, setLoading] = useState(false);

    // 获取顶部精品歌单数据,默认是全部分类
    const getTopPlayData = async () => {
        const { playlists } = await getTopPlaylists({
            limit: 1,
            cat: TABS[currentIndex]
        });

        setTopPlaylist(playlists[0] || {});
    };

    // 获取歌单列表数据
    const getPlaylistsData = async () => {
        setLoading(true);
        const { playlists, total } = await getPlaylists({
            limit: PAGE_SIZE,
            cat: TABS[currentIndex],
            offset: getPageOffset(pageIndex, PAGE_SIZE)
        });

        setSongPlaylists(unique(playlists));
        setSongTotal(total);
        setLoading(false);
    };

    const handleTabChange = useCallback(index => {
        setCurrentIndex(index);
    }, []);

    const handlePaginationChange = page => {
        setPageIndex(page);
    };

    useEffect(() => {
        getTopPlayData();
        // eslint-disable-next-line
    }, [currentIndex]);

    useEffect(() => {
        getPlaylistsData();
        // eslint-disable-next-line
    }, [currentIndex, pageIndex]);

    return (
        <div className='playlist-wrapper'>
            <div className='top-play-list-card'>
                {topPlaylist.id && <TopPlaylistCard {...topPlaylist} />}
                <Tabs tabs={TABS} type='small' align='right' tabChange={handleTabChange} />
                <Spin spinning={loading} size='large'>
                    <div className='playlist-cards'>
                        {songPlaylists.length &&
                            songPlaylists.map(list => {
                                return (
                                    <PlaylistCard
                                        copywriter={`播放量: ${formatNumber(list.playCount)}`}
                                        name={list.name}
                                        picUrl={list.coverImgUrl}
                                        key={list.id}
                                    />
                                );
                            })}
                    </div>
                    {songTotal > 0 && (
                        <div className='pagination-wrap'>
                            <Pagination
                                size='small'
                                total={songTotal}
                                pageSize={PAGE_SIZE}
                                current={pageIndex}
                                onChange={handlePaginationChange}
                            />
                        </div>
                    )}
                </Spin>
            </div>
        </div>
    );
}

export default Playlists;
