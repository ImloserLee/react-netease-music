import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

function Player(props) {
    const { isPlayerShow } = props;

    return (
        <CSSTransition in={isPlayerShow} timeout={300} classNames='alert' unmountOnExit>
            <div className='player-wrap'>播放器</div>
        </CSSTransition>
    );
}

const mapStateToProps = state => {
    return {
        isPlayerShow: state.musicReducer.isPlayerShow
    };
};

export default connect(
    mapStateToProps,
    null
)(React.memo(Player));
