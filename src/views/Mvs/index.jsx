import React, { useState, useEffect, useCallback } from 'react';
import Tabs from 'components/Tabs';
import { Pagination } from 'antd';
import MvCard from 'components/MvCard';
import { getAllMvs } from 'api/mv';
import { getPageOffset, formatNumber } from 'utils';
import './index.scss';

const areaTabs = ['全部', '内地', '港台', '欧美', '日本', '韩国'];
const typeTabs = ['全部', '官方版', '原声', '现场版', '网易出品'];
const sortTabs = ['上升最快', '最热', '最新'];

const PAGE_SIZE = 40;

function Mvs() {
    const [mvTotal, setMvTotal] = useState(0); // 歌单总数
    const [pageIndex, setPageIndex] = useState(1); // 当前的页数
    const [mvList, setMvList] = useState([]); // 当前的页数
    const [areaActiveIndex, setAreaActiveIndex] = useState(0); // tab高亮的下标
    const [typeActiveIndex, setTypeActiveIndex] = useState(0); // tab高亮的下标
    const [sortActiveIndex, setSortActiveIndex] = useState(0); // tab高亮的下标

    const handlePaginationChange = page => {
        setPageIndex(page);
    };

    const handleTabChange = useCallback((index, type) => {
        switch (type) {
            case 'area':
                setAreaActiveIndex(index);
                break;
            case 'type':
                setTypeActiveIndex(index);
                break;
            case 'sort':
                setSortActiveIndex(index);
                break;
            default:
        }
    }, []);

    const getAllMvsData = async () => {
        const { data, count } = await getAllMvs({
            limit: PAGE_SIZE,
            offset: getPageOffset(pageIndex, PAGE_SIZE),
            area: areaTabs[areaActiveIndex],
            type: typeTabs[typeActiveIndex],
            order: sortTabs[sortActiveIndex]
        });

        setMvList(data);
        if (count) {
            setMvTotal(count);
        }
    };

    useEffect(() => {
        getAllMvsData();
        // eslint-disable-next-line
    }, [pageIndex, areaActiveIndex, typeActiveIndex, sortActiveIndex]);

    return (
        <div className='mvs-wrapper'>
            <div className='tabs-wrap'>
                <span className='tabs-type'>地区: </span>
                <Tabs
                    tabs={areaTabs}
                    type='split'
                    tabChange={index => {
                        handleTabChange(index, 'area');
                    }}
                />
            </div>
            <div className='tabs-wrap'>
                <span className='tabs-type'>类型: </span>
                <Tabs
                    tabs={typeTabs}
                    type='split'
                    tabChange={index => {
                        handleTabChange(index, 'type');
                    }}
                />
            </div>
            <div className='tabs-wrap'>
                <span className='tabs-type'>排序: </span>
                <Tabs
                    tabs={sortTabs}
                    type='split'
                    tabChange={index => {
                        handleTabChange(index, 'sort');
                    }}
                />
            </div>
            <ul className='list-wrap'>
                {mvList.length
                    ? mvList.map(mv => {
                          return (
                              <li className='list-item' key={mv.id}>
                                  <MvCard
                                      picUrl={mv.cover}
                                      name={mv.name}
                                      artistName={mv.artistName}
                                      playCount={formatNumber(mv.playCount)}
                                  />
                              </li>
                          );
                      })
                    : null}
            </ul>
            {mvTotal > 0 && (
                <div className='pagination-wrap'>
                    <Pagination
                        size='small'
                        total={mvTotal}
                        pageSize={PAGE_SIZE}
                        current={pageIndex}
                        onChange={handlePaginationChange}
                    />
                </div>
            )}
        </div>
    );
}

export default React.memo(Mvs);
