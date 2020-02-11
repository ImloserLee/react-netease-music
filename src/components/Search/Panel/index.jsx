import React from 'react';
import './index.scss';

function Panel(props) {
    const { items } = props;
    return (
        <div className='search-panel'>
            <p className='panel-title'>热门搜索</p>
            <ul>
                {items.length
                    ? items.map((hot, index) => {
                          return (
                              <li className='panel-tag' key={index}>
                                  {hot.first}
                              </li>
                          );
                      })
                    : null}
            </ul>
        </div>
    );
}

export default React.memo(Panel);
