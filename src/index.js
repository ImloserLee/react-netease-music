import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Route from './router';
import { Provider } from 'react-redux';
import store from 'store';
import { calcFontSize } from 'utils';
import './style/index.scss';

calcFontSize();

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>{renderRoutes(Route)}</HashRouter>
        </Provider>,
        document.getElementById('root')
    );
};

render();
