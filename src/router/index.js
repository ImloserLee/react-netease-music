import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
const SuspenseComponent = Component => props => {
    return (
        <Suspense fallback={null}>
            <Component {...props}></Component>
        </Suspense>
    );
};

const Layout = lazy(() => import('views/Layout'));
const Search = lazy(() => import('views/Search'));
const Discovery = lazy(() => import('views/Discovery'));
const Playlists = lazy(() => import('views/Playlists'));
const Songs = lazy(() => import('views/Songs'));
const Mvs = lazy(() => import('views/Mvs'));

// 侧边栏显示的菜单
export const menuRoutes = [
    {
        path: '/discovery',
        component: SuspenseComponent(Discovery),
        title: '发现音乐',
        icon: 'music'
    },
    {
        path: '/playlists',
        component: SuspenseComponent(Playlists),
        title: '推荐歌单',
        icon: 'playlist-menu'
    },
    {
        path: '/songs',
        component: SuspenseComponent(Songs),
        title: '最新音乐',
        icon: 'yinyue'
    },
    {
        path: '/mvs',
        component: SuspenseComponent(Mvs),
        title: '最新MV',
        icon: 'mv'
    }
];

const routes = [
    {
        path: '/',
        component: SuspenseComponent(Layout),
        routes: [
            {
                path: '/',
                exact: true,
                render: () => <Redirect to={'/discovery'} />
            },
            {
                path: '/search/:keywords',
                component: SuspenseComponent(Search)
            },
            ...menuRoutes
        ]
    }
];

export default routes;
