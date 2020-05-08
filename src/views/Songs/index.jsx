import React, { useEffect, useState, useCallback } from 'react';
import Tabs from 'components/Tabs';
import SongTable from 'components/SongTable';
import { getTopSongs } from 'api/song';
import { createSong } from 'utils';
import './index.scss';

const TABS = [
    { title: '全部', type: 0 },
    { title: '华语', type: 7 },
    { title: '欧美', type: 96 },
    { title: '日本', type: 8 },
    { title: '韩国', type: 16 }
];

function Songs() {
    const [songs, setSongs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const getSongs = async () => {
        const { data } = await getTopSongs(TABS[currentIndex].type);

        const ret = data.map(song => {
            const {
                id,
                name,
                artists,
                duration,
                mvid,
                album: { picUrl, name: albumName }
            } = song;
            return createSong({
                id,
                name,
                artists,
                duration,
                albumName,
                img: picUrl,
                mvId: mvid
            });
        });

        setSongs(ret);
    };

    const handleTabChange = useCallback(index => {
        setCurrentIndex(index);
    }, []);

    useEffect(() => {
        getSongs();
        // eslint-disable-next-line
    }, [currentIndex]);
    return (
        <div className='songs-wrapper'>
            <Tabs tabs={TABS} type='small' align='right' tabChange={handleTabChange}></Tabs>
            <SongTable songs={songs}></SongTable>
        </div>
    );
}

export default Songs;
