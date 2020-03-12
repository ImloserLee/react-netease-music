import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import SongCard from 'components/SongCard';
import Title from 'components/Title';
import './index.scss';
import { getNewSongs } from 'api/discovery';
import { createSong } from 'utils';

const songsLimit = 10;

function NewSongs() {
    const [list, setList] = useState([]);
    const [chunkLimit] = useState(songsLimit / 2);

    // 获取最新音乐数据
    const getList = async () => {
        const res = await getNewSongs();

        setList(res);
    };

    // 组织最新音乐外层循环的数组
    const thunkedList = useMemo(() => {
        return [list.slice(0, chunkLimit), list.slice(chunkLimit, list.length)];
    }, [chunkLimit, list]);

    const getSongOrder = useCallback(
        (thunkedIndex, index) => {
            return thunkedIndex * chunkLimit + index + 1;
        },
        [chunkLimit]
    );

    const nomalizeSong = song => {
        const {
            id,
            name,
            song: {
                mvid,
                artists,
                album: { blurPicUrl },
                duration
            }
        } = song;

        return createSong({
            id,
            name,
            img: blurPicUrl,
            artists,
            mvid,
            duration
        });
    };

    useEffect(() => {
        getList();
    }, []);

    if (list.length) {
        return (
            <div className='new-songs'>
                <Title name='最新音乐' />
                <div className='list-wrap'>
                    {thunkedList.map((thunked, thunkedIndex) => {
                        return (
                            <div className='list' key={thunkedIndex}>
                                {thunked.map((item, index) => {
                                    return (
                                        <SongCard
                                            key={item.id}
                                            {...nomalizeSong(item)}
                                            order={getSongOrder(thunkedIndex, index)}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default memo(NewSongs);
