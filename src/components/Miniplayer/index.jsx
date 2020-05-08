import React, { memo, useCallback, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Popover } from 'antd';
import Icon from 'components/Icon';
import Volume from 'components/Volume';
import * as musicAction from 'store/music/action';
import { playModeMap } from 'utils';
import './index.scss';
function Miniplayer(props) {
    const [visible, setVisible] = useState(false);

    const { playMode, isPlayListShow } = props;

    // 当前播放模式
    const currentMode = useMemo(() => {
        return playModeMap[playMode];
    }, [playMode]);

    const playModeText = useMemo(() => {
        return currentMode.name;
    }, [currentMode]);

    const playModeIcon = useMemo(() => {
        return currentMode.icon;
    }, [currentMode]);

    const handleMouseEvent = useCallback(() => {
        setVisible(!visible);
        // eslint-disable-next-line
    }, [visible]);

    const handleChangePlayMode = useCallback(() => {
        const modeKeys = Object.keys(playModeMap);
        const currentModeIndex = modeKeys.findIndex(key => playModeMap[key].code === playMode);

        const nextIndex = (currentModeIndex + 1) % modeKeys.length;
        const nextModeKey = modeKeys[nextIndex];
        const nextMode = playModeMap[nextModeKey];

        props.musicAction.setPlayMode(nextMode.code);
    }, [playMode, props.musicAction]);

    const togglePlayListShow = () => {
        props.musicAction.setPlayListShow(!isPlayListShow);
    };

    const content = <p className='miniplayer-pop-content'>{playModeText}</p>;

    return (
        <div className='mini-player-wrapper'>
            <div className='song'>
                <div className='img-wrap'>
                    <img src='' alt='' className='blur' />
                    <div className='player-control'>
                        <Icon size={24} type='shrink' color='white' />
                    </div>
                </div>
                <div className='content'>
                    <div className='top'>
                        <p className='name'>勇气</p>
                        <p className='split'>-</p>
                        <p className='artists'>梁静茹</p>
                    </div>
                    <div className='time'>
                        <span className='played-time'>00:00</span>
                        <span className='split'>/</span>
                        <span className='total-time'>03:00</span>
                    </div>
                </div>
            </div>
            <div className='control'>
                <Icon size={24} className='icon' type='prev' />
                <div className='play-icon'>
                    <Icon size={24} type='pause' />
                </div>
                <Icon size={24} className='icon' type='next' />
            </div>
            <div className='mode'>
                <Popover placement='top' content={content} visible={visible} trigger='hover'>
                    <Icon
                        size={20}
                        className='mode-item'
                        type={playModeIcon}
                        mouseEnter={handleMouseEvent}
                        mouseOut={handleMouseEvent}
                        click={handleChangePlayMode}
                    />
                </Popover>
                <Icon size={20} className='mode-item' type='playlist' click={togglePlayListShow} />
                <div className='volume-item'>
                    <Volume />
                </div>
            </div>
            <div className='progress-bar-wrap'></div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        playMode: state.musicReducer.playMode,
        isPlayListShow: state.musicReducer.isPlayListShow
    };
};

const mapDispatchToProps = dispatch => {
    return {
        musicAction: bindActionCreators(musicAction, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(Miniplayer));
