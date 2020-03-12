import React, { memo, useEffect, useState } from 'react';
import Title from 'components/Title';
import MvCard from 'components/MvCard';
import { getPersonalizedMv } from 'api/discovery';
import './index.scss';

function NewMvs() {
    const [mvList, setMvList] = useState([]);

    const getMvList = async () => {
        const res = await getPersonalizedMv();

        setMvList(res);
    };

    useEffect(() => {
        getMvList();
    }, []);

    if (mvList.length) {
        return (
            <div className='new-mvs'>
                <Title name='推荐mv' />
                <ul className='list-wrap'>
                    {mvList.map(list => {
                        return (
                            <li key={list.id} className='list-item'>
                                <MvCard {...list} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    } else {
        return null;
    }
}

export default memo(NewMvs);
