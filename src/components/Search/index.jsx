import React, { memo, useState, useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import { Input, Icon } from 'antd';
import { getSearchHot, getSearchSuggest } from 'api/search';
import { debounce } from 'utils/common';

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
        const res = await getSearchSuggest(value);
        console.log('%c 🧠 res: ', 'background-color: #ffe304;color:#fff;', res);
    }, 500);

    const handleFocus = () => {
        setPanelVisible(true);
        setInPanel(true);
    };

    const handleChange = e => {
        setSearchKeyword(e.target.value);
        handleGetSearchSuggest(e.target.value);
    };

    const handlePressEnter = e => {
        const res = searchHistorys.concat([{ first: e.target.value }]);
        setHistorys(res);
        goSearch(e.target.value);
    };

    const goSearch = async value => {};

    const clickEvent = e => {
        if (
            panelEl.current &&
            !panelEl.current.contains(e.target) &&
            !findDOMNode(inputEl.current).contains(e.target)
        ) {
            setInPanel(false);
            return;
        }

        setInPanel(true);
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
        getSearchHotList();
    }, []);

    const Panel = (
        <div className='search-panel' ref={panelEl}>
            <div className='search-panel-hot'>
                <p className='panel-title'>热门搜索</p>
                <ul>
                    {searchHots.length
                        ? searchHots.map((hot, index) => {
                              return (
                                  <li className='panel-tag' key={index}>
                                      {hot.first}
                                  </li>
                              );
                          })
                        : null}
                </ul>
            </div>
            <div className='search-panel-history'>
                <p className='panel-title'>搜索历史</p>
                <ul>
                    {searchHistorys.length
                        ? searchHistorys.map((hot, index) => {
                              return (
                                  <li className='panel-tag' key={index}>
                                      {hot.first}
                                  </li>
                              );
                          })
                        : null}
                </ul>
            </div>
        </div>
    );

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
            {panelVisible && inPanel && Panel}
        </div>
    );
}

export default memo(SearchInput);
