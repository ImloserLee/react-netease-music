import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '../PlayIcon';
import Icon from '../Icon';
import './index.scss';

function MvCard(props) {
    const { picUrl, name, artistName, playCount } = props;
    return (
        <div className='mvcard-wrapper'>
            <div className='img-wrap'>
                <img src={picUrl} alt='' />
                <div className='mvplay-count-wrap'>
                    <Icon type='play' />
                    {playCount}
                </div>
                <div className='mvplay-icon-wrap'>
                    <PlayIcon size={48} />
                </div>
            </div>
            <p className='name'>{name}</p>
            <p className='singer'>{artistName}</p>
        </div>
    );
}

MvCard.propTypes = {
    picUrl: PropTypes.string,
    name: PropTypes.string,
    artistName: PropTypes.string
};

export default memo(MvCard);
