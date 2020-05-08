import React, { Fragment } from 'react';
import Icon from 'components/Icon';
import './index.scss';

function Suggest(props) {
    const { items } = props;

    return (
        <Fragment>
            {items.map((item, index) => {
                return (
                    <div className='search-result-wrapper' key={index}>
                        {item.data && item.data.length && (
                            <div className='result-title'>
                                <Icon type={item.icon} size={14} />
                                <span className='song'>{item.title}</span>
                            </div>
                        )}
                        <ul>
                            {item.data &&
                                item.data.length &&
                                item.data.map((childItem, childIndex) => {
                                    return (
                                        <li className='result-item' key={childIndex}>
                                            <a href='www.baidu.com'>
                                                {item.renderName
                                                    ? item.renderName(childItem)
                                                    : childItem.name}
                                            </a>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                );
            })}
        </Fragment>
    );
}

export default React.memo(Suggest);
