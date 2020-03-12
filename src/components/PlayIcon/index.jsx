import React, { memo } from 'react';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import './index.scss';

function PlayIcon(props) {
    const { size } = props;
    return (
        <div className='play-icon-wrapper' style={{ width: `${size}px`, height: `${size}px` }}>
            <Icon type={'play'} size={size * 0.6} className='play-icon' />
        </div>
    );
}

PlayIcon.defaultProps = {
    size: 24
};

PlayIcon.propTypes = {
    size: PropTypes.number
};

export default memo(PlayIcon);
