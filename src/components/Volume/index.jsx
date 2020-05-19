import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import ProgressBar from 'components/ProgressBar';
import './index.scss';

function Volume(props) {
    const { volume, onVolumeChange, onVolumeInput } = props;
    const [lastVolume, setLastVolume] = useState(volume);

    const onProgressChange = value => {
        onVolumeChange(value);
    };

    const onProgressInput = value => {
        onVolumeInput(value);
    };

    const volumeIconClick = () => {
        const target = volume ? 0 : lastVolume;

        if (volume) {
            setLastVolume(volume);
        }

        onProgressChange(target);
    };

    const type = useMemo(() => {
        return +volume === 0 ? 'silence' : 'horn';
    }, [volume]);

    return (
        <div className='volume-wrap'>
            <Icon type={type} size={20} className='volume-icon' click={volumeIconClick} />
            <div className='progress-wrap'>
                <ProgressBar
                    progressChange={onProgressChange}
                    progressInput={onProgressInput}
                    percent={volume}
                />
            </div>
        </div>
    );
}

Volume.defaultProps = {
    volume: 0
};

Volume.propTypes = {
    volume: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onVolumeInput: PropTypes.func,
    onVolumeChange: PropTypes.func
};

export default Volume;
