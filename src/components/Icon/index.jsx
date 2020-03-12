import React, { memo, useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { toRem } from 'utils/rem';
import './index.scss';

function Icon(props) {
    const { type, className, size, backdrop, color, click } = props;

    const cls = classnames(
        {
            iconfont: true,
            [`icon-${type}`]: true,
            [`icon-color-${color}`]: color ? true : false
        },
        className
    );

    const getIconStyle = useMemo(() => {
        const chromeMinSize = 12;
        const retStyle = { fontSize: toRem(size) };
        if (size < chromeMinSize) {
            const ratio = size / chromeMinSize;
            retStyle.transform = `scale(${ratio})`;
        }
        return retStyle;
    }, [size]);

    const handleClick = e => {
        if (click) {
            click(e);
        }
    };

    const MyIcon = <i className={cls} style={getIconStyle} onClick={handleClick}></i>;

    if (backdrop) {
        const backdropSizeRatio = 1.56;
        const backdropSize = toRem(backdropSizeRatio * size);
        return (
            <span style={{ width: backdropSize, height: backdropSize }} className='backdrop'>
                {MyIcon}
            </span>
        );
    }

    return MyIcon;
}

Icon.defaultProps = {
    size: 16,
    backdrop: false,
    type: '',
    color: ''
};

Icon.propTypes = {
    size: PropTypes.number,
    className: PropTypes.string,
    backdrop: PropTypes.bool,
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
    click: PropTypes.func
};

export default memo(Icon);
