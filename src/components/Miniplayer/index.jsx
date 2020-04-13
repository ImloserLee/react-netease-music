import React, { memo } from 'react';
import Icon from 'components/Icon';
import './index.scss';
function Miniplayer() {
    return (
        <div className='mini-player-wrapper'>
            <div className='song'>
                <div className='img-wrap'>
                    <img src='' alt='' className='blur' />
                    <div className='player-control'>
                        <Icon size={24} type='shrink' color='white' />
                    </div>
                </div>
                <div className='content'>
                    <div className='top'>
                        <p className='name'>勇气</p>
                        <p className='split'>-</p>
                        <p className='artists'>梁静茹</p>
                    </div>
                    <div className='time'>
                        <span className='played-time'>00:00</span>
                        <span className='split'>/</span>
                        <span className='total-time'>03:00</span>
                    </div>
                </div>
            </div>
            <div className='control'>
                <Icon size={24} className='icon' type='prev' />
                <div className='play-icon'>
                    <Icon size={24} type='pause' />
                </div>
                <Icon size={24} className='icon' type='next' />
            </div>
            <div className='mode'>
                <Icon size={20} className='mode-item' type='loop' />
                <Icon size={20} className='mode-item' type='playlist' />
                <div className='volume-item'></div>
            </div>
            <div className='progress-bar-wrap'></div>
        </div>
    );
}

export default memo(Miniplayer);
