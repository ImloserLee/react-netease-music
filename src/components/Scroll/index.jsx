import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import BScroll from '@better-scroll/core';
import classnames from 'classnames';
import './index.scss';
import Scrollbar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';

BScroll.use(Scrollbar);
BScroll.use(MouseWheel);

const Scroll = forwardRef((props, ref) => {
    const { direction, onScroll, refresh, className } = props;

    const [bScroll, setBScroll] = useState();
    const scrollContainerRef = useRef();

    const cls = classnames(
        {
            'scroll-wrap': true
        },
        className
    );

    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current, {
            direction,
            scrollY: true,
            probeType: 3,
            mouseWheel: true,
            scrollbar: true
        });

        setBScroll(scroll);

        return () => {
            setBScroll(null);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', scroll => {
            onScroll(scroll);
        });
        return () => {
            bScroll.off('scroll');
        };
    }, [onScroll, bScroll]);

    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    return (
        <div className={cls} ref={scrollContainerRef}>
            {props.children}
        </div>
    );
});

Scroll.defaultProps = {
    direction: 'vertical',
    refresh: true,
    onScroll: null
};

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    className: PropTypes.string
};

export default Scroll;
