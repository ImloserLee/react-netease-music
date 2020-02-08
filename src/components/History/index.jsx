import React, { memo } from 'react';
import Icon from 'components/Icon';
import './index.scss';

function History() {
    return (
        <div className='history-wrapper'>
            <Icon backdrop={true} type={'back'} />
            <Icon backdrop={true} type={'forward'} />
        </div>
    );
}

export default memo(History);
