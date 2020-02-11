import React, { memo, useState, useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import { Input, Icon } from 'antd';
import { getSearchHot, getSearchSuggest } from 'api/search';
import { debounce, setStorage, getStorage, SEARCH_HISTORY_KEY, isDef } from 'utils';
import Panel from './Panel';

import './index.scss';

function SearchInput() {
    const panelEl = useRef();
    const inputEl = useRef();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchHots, setSearchHots] = useState([]);
    const [searchHistorys, setHistorys] = useState([]);
    const [panelVisible, setPanelVisible] = useState(false);
    const [inPanel, setInPanel] = useState(false);

    const handleGetSearchSuggest = debounce(async value => {
        if (value) {
            const res = await getSearchSuggest(value);
        }
    }, 500);

    const handleFocus = () => {
        setPanelVisible(true);
        setInPanel(true);
    };

    const handleChange = e => {
        const value = e.target.value.replace(/^ +| +$/g, '');
        setSearchKeyword(value);
        handleGetSearchSuggest(value);
    };

    const handlePressEnter = e => {
        const res = searchHistorys.concat([{ first: e.target.value }]);
        setHistorys(res);
        setStorage(SEARCH_HISTORY_KEY, res);
        goSearch(e.target.value);
    };

    const goSearch = async value => {};

    const clickEvent = e => {
        // 能获取到panel这个dom节点,同时鼠标点击的位置不包含在这个区域内，且鼠标不是在搜索栏的输入框内的时候，将panel的显示状态置为false
        if (
            panelEl.current &&
            !panelEl.current.contains(e.target) &&
            !findDOMNode(inputEl.current).contains(e.target)
        ) {
            setInPanel(false);
            return;
        }
    };

    const getSearchHotList = async () => {
        const res = await getSearchHot();

        setSearchHots(res.hots);
    };

    useEffect(() => {
        document.addEventListener('mousedown', clickEvent);
        return () => {
            document.removeEventListener('mousedown', clickEvent);
        };
    }, []);

    useEffect(() => {
        // 从本地读取搜索历史
        const searchHistory = getStorage(SEARCH_HISTORY_KEY);

        if (isDef(searchHistory) && searchHistory.length) {
            setHistorys(searchHistory);
        }
        getSearchHotList();
    }, []);

    return (
        <div className='search-wrapper'>
            <Input
                onFocus={handleFocus}
                onPressEnter={handlePressEnter}
                value={searchKeyword}
                ref={inputEl}
                placeholder='搜索'
                onChange={handleChange}
                prefix={<Icon type='search' />}
            />
            {panelVisible && inPanel && (
                <div className='search-panel-wrapper' ref={panelEl}>
                    <Panel items={searchHots} />
                    <Panel items={searchHistorys} />
                </div>
            )}
        </div>
    );
}

export default memo(SearchInput);
