import React, { memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as musicAction from 'store/music/action';
import Icon from 'components/Icon';
import History from 'components/History';
import Search from 'components/Search';
import Theme from 'components/Theme';
import './index.scss';

function Header(props) {
    const { isPlayerShow } = props;

    const togglePlayerShow = () => {
        props.musicAction.setPlayerShow(!isPlayerShow);
    };
    return (
        <header className='header'>
            <div className='header-left'>
                <div className='header-left__buttons'>
                    <div className='mac-button red'>
                        <Icon type={'home'} size={9} />
                    </div>
                    <div className='mac-button yellow'>
                        <Icon type={'minus'} size={9} />
                    </div>
                    <div className='mac-button green'>
                        <Icon type={'fullscreen'} size={9} />
                    </div>
                </div>
                {isPlayerShow ? (
                    <div className='header-left__shrink' onClick={togglePlayerShow}>
                        <Icon backdrop={true} type='down' />
                    </div>
                ) : (
                    <div className='header-left__history'>
                        <History />
                    </div>
                )}
            </div>
            <div className='header-right'>
                <div className='header-right__search'>
                    <Search />
                </div>
                <div className='header-right__theme'>
                    <Theme />
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = state => {
    return {
        isPlayerShow: state.musicReducer.isPlayerShow
    };
};

const mapDispatchToProps = dispatch => {
    return {
        musicAction: bindActionCreators(musicAction, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Header));
