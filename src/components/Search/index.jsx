import React, { memo, useState, useRef, useEffect, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { Input, Icon } from 'antd';
import { getSearchHot, getSearchSuggest } from 'api/search';
import { debounce, setStorage, getStorage, SEARCH_HISTORY_KEY, isDef, genSuggestList } from 'utils';
import Panel from './Panel';
import Suggest from './Suggest';

import './index.scss';

function SearchInput() {
    const panelEl = useRef();
    const inputEl = useRef();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchHots, setSearchHots] = useState([]);
    const [searchHistorys, setSearchHistory] = useState([]);
    const [searchSuggest, setSearchSuggest] = useState([]);
    const [panelVisible, setPanelVisible] = useState(false);
    const [inPanel, setInPanel] = useState(false);

    const handleGetSearchSuggest = debounce(async value => {
        if (value) {
            const res = await getSearchSuggest(value);
            const ret = genSuggestList(res);
            setSearchSuggest(ret);
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
        setSearchHistory(res);
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
            setSearchHistory(searchHistory);
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
                    {/* 有搜索关键字以及搜索出来的数据中有一项有data这个数据，就需要展示检索到的面板 */}
                    {searchKeyword && searchSuggest.some(suggest => suggest.data) ? (
                        <Suggest items={searchSuggest} />
                    ) : (
                        <Fragment>
                            <Panel items={searchHots} title={'热门搜索'} />
                            <Panel items={searchHistorys} title={'搜索历史'} />
                        </Fragment>
                    )}
                </div>
            )}
        </div>
    );
}

export default memo(SearchInput);
