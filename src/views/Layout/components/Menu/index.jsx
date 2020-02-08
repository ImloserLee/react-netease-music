import React, { memo } from 'react';
import Icon from 'components/Icon';
import './index.scss';

function Menu() {
    return (
        <div className='menu-wrapper'>
            <div className='menu-user'>
                <Icon type={'yonghu'} size={24} />
                <p>未登录</p>
            </div>
            <div className='menu-list'>
                {['发现音乐', '推荐歌单'].map(item => {
                    return (
                        <ul key={item}>
                            <li>{item}</li>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
}

export default memo(Menu);
