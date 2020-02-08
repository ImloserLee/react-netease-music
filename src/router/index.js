import React, { lazy, Suspense } from 'react';

const SuspenseComponent = Component => props => {
    return (
        <Suspense fallback={null}>
            <Component {...props}></Component>
        </Suspense>
    );
};

const Layout = lazy(() => import('views/Layout'));
const Search = lazy(() => import('views/Search'));

const routes = [
    {
        path: '/',
        component: SuspenseComponent(Layout),
        routes: [
            {
                path: '/search/:keywords',
                component: SuspenseComponent(Search)
            }
        ]
    }
];

export default routes;
