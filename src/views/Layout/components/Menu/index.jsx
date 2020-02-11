import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/Icon';
import User from 'components/User';
import SongSheet from 'components/SongSheet';
import { menuRoutes } from 'router';
import './index.scss';

function Menu() {
    return (
        <div className='menu-wrapper'>
            <User />
            <div className='menu-list'>
                <ul>
                    {menuRoutes.map((route, index) => {
                        return (
                            <li key={index} className='menu-item'>
                                <NavLink exact to={route.path}>
                                    <Icon type={route.icon} size={16} />
                                    <span className='menu-title'>{route.title}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <SongSheet />
            </div>
        </div>
    );
}

export default memo(Menu);
