import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Header, Menu } from './components';
import Miniplayer from 'components/Miniplayer';
import PlayList from 'components/PlayList';
import './index.scss';

function Layout(props) {
    const { route } = props;
    return (
        <div className='layout-wrapper'>
            <Header />
            <div className='layout-body'>
                <div className='layout-menu'>
                    <Menu />
                </div>
                <div className='layout-content'>{renderRoutes(route.routes)}</div>
            </div>
            <Miniplayer />
            <PlayList />
        </div>
    );
}

export default Layout;
