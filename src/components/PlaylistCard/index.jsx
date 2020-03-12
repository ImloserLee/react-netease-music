import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from 'components/PlayIcon';
import './index.scss';

function PlaylistCard(props) {
    const { picUrl, copywriter, name } = props;
    return (
        <div className='playlist-card'>
            <div className='card-img'>
                <img src={picUrl} alt='' />
                <div className='card-desc'>
                    <span className='desc'>{copywriter}</span>
                </div>
                <div className='card-icon'>
                    <PlayIcon size={36} />
                </div>
            </div>
            <div className='card-name'>{name}</div>
        </div>
    );
}

PlaylistCard.propTypes = {
    picUrl: PropTypes.string,
    copywriter: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string
};

export default memo(PlaylistCard);
