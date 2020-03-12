import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '../PlayIcon';
import { pad } from 'utils';
import './index.scss';

function SongCard(props) {
    const { img, name, artistsText, order } = props;
    return (
        <div className='song-card-wrapper'>
            <div className='order-wrapper'>
                <span className='order'>{pad(order)}</span>
            </div>
            <div className='covery'>
                <img src={img} alt='' />
                <div className='play-icon-wrapper'>
                    <PlayIcon size={16} />
                </div>
            </div>
            <div className='song-content'>
                <p className='song-name'>{name}</p>
                <p className='singer'>{artistsText}</p>
            </div>
        </div>
    );
}

SongCard.propTypes = {
    img: PropTypes.string,
    name: PropTypes.string,
    artistsText: PropTypes.string,
    order: PropTypes.number
};

export default memo(SongCard);
