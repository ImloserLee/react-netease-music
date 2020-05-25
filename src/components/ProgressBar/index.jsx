import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function ProgressBar(props) {
    const { percent, progressInput, progressChange, step } = props;

    const progress = useRef(null);

    const onProgressChange = e => {
        e.persist();
        progressChange(e.target.value);
    };
    const onProgressInput = e => {
        e.persist();
        progressInput(e.target.value);
    };

    const updateProgressBg = () => {
        progress.current.style.backgroundSize = `${percent}% 100%`;
    };

    useEffect(() => {
        updateProgressBg();
        // eslint-disable-next-line
    }, [percent]);

    return (
        <input
            className='progress'
            type='range'
            max='100'
            min='0'
            step={step}
            value={percent}
            onChange={onProgressChange}
            onInput={onProgressInput}
            ref={progress}
        />
    );
}

ProgressBar.defaultProps = {
    percent: 0,
    step: '1'
};

ProgressBar.propTypes = {
    percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    progressChange: PropTypes.func,
    progressInput: PropTypes.func,
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default ProgressBar;
