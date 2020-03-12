import React from 'react';
import { Banner, NewPlaylists, NewSongs, NewMvs } from './components';
import './index.scss';

function Discovery() {
    return (
        <div className='discovery-wrapper'>
            <Banner />
            <NewPlaylists />
            <NewSongs />
            <NewMvs />
        </div>
    );
}

export default Discovery;
