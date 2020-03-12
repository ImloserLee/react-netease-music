import React, { memo } from 'react';
import './index.scss';

function Title(props) {
    return (
        <div className='title-wrapper'>
            <p className='title'>{props.name}</p>
        </div>
    );
}

export default memo(Title);
