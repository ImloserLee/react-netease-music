import React, { memo, useMemo, useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

function Tabs(props) {
    const { tabs, align, tabChange, type } = props;
    const [current, setCurrent] = useState(0);
    const cls = classnames(
        {
            [`${align}`]: true
        },
        'tab-wrapper'
    );

    const liCls = useCallback(
        index => {
            const cls = ['tab-item'];
            if (current === index) {
                cls.push('active');
            }
            if (type) {
                cls.push(type);
            }
            return cls.join(' ');
        },
        [type, current]
    );

    const handleChangeTab = index => {
        setCurrent(index);
        tabChange(index);
    };

    const normalizedTabs = useMemo(() => {
        return typeof tabs[0] === 'string' ? tabs.map(tab => ({ title: tab })) : tabs;
    }, [tabs]);

    return (
        <ul className={cls}>
            {normalizedTabs.map((tab, index) => {
                return (
                    <li key={index} className={liCls(index)} onClick={() => handleChangeTab(index)}>
                        <span className='title'>{tab.title}</span>
                    </li>
                );
            })}
        </ul>
    );
}

Tabs.defaultProps = {
    align: 'left'
};

Tabs.propTypes = {
    tabs: PropTypes.array,
    align: PropTypes.string,
    // 不传的话对应大号字体 高亮加粗
    // small对应小号字体 高亮红色
    // split对应小号字体 分割线分隔 高亮背景色变灰文字变红
    type: PropTypes.string,
    tabChange: PropTypes.func
};

export default memo(Tabs);
