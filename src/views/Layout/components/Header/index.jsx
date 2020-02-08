import React, { memo } from 'react';
import Icon from 'components/Icon';
import History from 'components/History';
import Search from 'components/Search';
import Theme from 'components/Theme';
import './index.scss';

function Header() {
    return (
        <header className='header'>
            <div className='header-left'>
                <div className='header-left__buttons'>
                    <div className='mac-button red'>
                        <Icon type={'home'} size={9} />
                    </div>
                    <div className='mac-button yellow'>
                        <Icon type={'minus'} size={9} />
                    </div>
                    <div className='mac-button green'>
                        <Icon type={'fullscreen'} size={9} />
                    </div>
                </div>
                <div className='header-left__history'>
                    <History />
                </div>
            </div>
            <div className='header-right'>
                <div className='header-right__search'>
                    <Search />
                </div>
                <div className='header-right__theme'>
                    <Theme />
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
