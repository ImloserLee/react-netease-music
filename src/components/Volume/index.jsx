import React, { useRef, useState, useEffect, useMemo } from 'react';
import Icon from 'components/Icon';
import './index.scss';

function Volume() {
    const [progressVal, setProgressVal] = useState(0);
    const progress = useRef(null);

    const onProgressChange = e => {
        e.persist();
        setProgressVal(e.target.value);
    };
    const onProgressInput = e => {
        e.persist();
        setProgressVal(e.target.value);
    };

    const updateProgressBg = () => {
        progress.current.style.backgroundSize = `${progressVal}% 100%`;
    };

    const type = useMemo(() => {
        return +progressVal === 0 ? 'silence' : 'horn';
    }, [progressVal]);

    useEffect(() => {
        updateProgressBg();
        // eslint-disable-next-line
    }, [progressVal]);
    return (
        <div className='volume-wrap'>
            <Icon type={type} size={20} className='volume-icon' />
            <div className='progress-wrap'>
                <input
                    className='progress'
                    type='range'
                    max='100'
                    min='0'
                    step='1'
                    value={progressVal}
                    onChange={onProgressChange}
                    onInput={onProgressInput}
                    ref={progress}
                />
            </div>
        </div>
    );
}

export default Volume;
