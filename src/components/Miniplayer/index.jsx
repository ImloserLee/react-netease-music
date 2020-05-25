import React, { memo, useCallback, useState, useMemo, useRef, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as musicAction from 'store/music/action';
import { Popover } from 'antd';
import Icon from 'components/Icon';
import Volume from 'components/Volume';
import ProgressBar from 'components/ProgressBar';
import { playModeMap, formatTime, isDef, nextSong, prevSong } from 'utils';
import './index.scss';
function Miniplayer(props) {
    const [visible, setVisible] = useState(false);
    const [songReady, setSongReady] = useState(false);
    const [volume, setVolume] = useState(0.75);
    const audio = useRef();

    const {
        playMode,
        isPlayListShow,
        isPlayerShow,
        currentSong,
        playList,
        currentTime,
        playingState,
        musicAction: {
            setPlayMode,
            setPlayListShow,
            setPlayerShow,
            startSong,
            setCurrentTime,
            setPlayingState
        }
    } = props;

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

    const hasCurrentSong = useMemo(() => {
        return isDef(currentSong.id);
    }, [currentSong]);

    // 进度条拖动的范围是1-100，需要将volume*100在传递
    const computedVolume = useMemo(() => {
        return volume * 100;
    }, [volume]);

    // 歌曲进度的数值
    const playedPercent = useMemo(() => {
        const { durationSecond } = currentSong;

        return Math.min(currentTime / durationSecond, 1) * 100 || 0;
    }, [currentTime, currentSong]);

    const handleMouseEvent = useCallback(() => {
        setVisible(!visible);
        // eslint-disable-next-line
    }, [visible]);

    const playIcon = useMemo(() => {
        return playingState ? 'pause' : 'play';
    }, [playingState]);

    const handleChangePlayMode = useCallback(() => {
        const modeKeys = Object.keys(playModeMap);
        const currentModeIndex = modeKeys.findIndex(key => playModeMap[key].code === playMode);
        const nextIndex = (currentModeIndex + 1) % modeKeys.length;
        const nextModeKey = modeKeys[nextIndex];
        const nextMode = playModeMap[nextModeKey];

        setPlayMode(nextMode.code);
        // eslint-disable-next-line
    }, [playMode]);

    const togglePlayListShow = () => {
        setPlayListShow(!isPlayListShow);
    };

    const togglePlayerShow = () => {
        setPlayerShow(!isPlayerShow);
    };

    // 上一首
    const prev = () => {
        const song = prevSong(playList, playMode, currentSong);

        startSong(song);
    };

    // 下一首
    const next = () => {
        const song = nextSong(playList, playMode, currentSong);

        startSong(song);
    };

    // 准备播放歌曲
    const ready = () => {
        setSongReady(true);
    };

    // 下一首
    const end = () => {
        next();
    };

    // 播放歌曲
    const play = async () => {
        if (songReady) {
            try {
                await audio.current.play();
                setPlayingState(true);
            } catch (error) {
                console.log(
                    '%c 🍅 error: ',
                    'font-size:20px;background-color: #B03734;color:#fff;',
                    error
                );
                setPlayingState(false);
            }
        }
    };

    // 暂停
    const pause = () => {
        audio.current.pause();
    };

    // 暂停/播放
    const togglePlaying = () => {
        if (!hasCurrentSong) {
            return;
        }
        setPlayingState(!playingState);
    };

    // 更新时长
    const updateTime = e => {
        setCurrentTime(e.target.currentTime);
    };

    const onVolumeInput = value => {
        setVolume(value / 100);
        audio.current.volume = value / 100;
    };

    const onVolumeChange = value => {
        setVolume(value / 100);
        audio.current.volume = value / 100;
    };

    const setTime = playedPercent => {
        const { durationSecond } = currentSong;
        const time = durationSecond * (playedPercent / 100);

        audio.current.currentTime = time;
        setCurrentTime(time);
    };

    const onProgressChange = value => {
        setTime(value);
    };

    const onProgressInput = value => {
        setTime(value);
    };

    useEffect(() => {
        play();
        // eslint-disable-next-line
    }, [currentSong, songReady]);

    useEffect(() => {
        playingState ? play() : pause();
        // eslint-disable-next-line
    }, [playingState]);

    useEffect(() => {
        audio.current.volume = volume;
    }, [volume]);

    const content = <p className='miniplayer-pop-content'>{playModeText}</p>;

    return (
        <div className='mini-player-wrapper'>
            {/* 歌曲内容 */}
            <div className='song'>
                {hasCurrentSong && (
                    <Fragment>
                        <div className='img-wrap' onClick={togglePlayerShow}>
                            <img src={currentSong.img} alt='' className='blur' />
                            <div className='player-control'>
                                <Icon
                                    size={24}
                                    type={isPlayerShow ? 'shrink' : 'open'}
                                    color='white'
                                />
                            </div>
                        </div>
                        <div className='content'>
                            <div className='top'>
                                <p className='name'>{currentSong.name}</p>
                                <p className='split'>-</p>
                                <p className='artists'>{currentSong.artistsText}</p>
                            </div>
                            <div className='time'>
                                <span className='played-time'>{formatTime(currentTime)}</span>
                                <span className='split'>/</span>
                                <span className='total-time'>
                                    {formatTime(currentSong.duration / 1000)}
                                </span>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
            {/* 控制台 */}
            <div className='control'>
                <Icon size={24} className='icon' type='prev' click={prev} />
                <div className='play-icon' onClick={togglePlaying}>
                    <Icon size={24} type={playIcon} />
                </div>
                <Icon size={24} className='icon' type='next' click={next} />
            </div>
            <div className='mode'>
                {/* 模式 */}
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
                {/* 播放列表 */}
                <Icon size={20} className='mode-item' type='playlist' click={togglePlayListShow} />
                {/* 音量 */}
                <div className='volume-item'>
                    <Volume
                        volume={computedVolume}
                        onVolumeInput={onVolumeInput}
                        onVolumeChange={onVolumeChange}
                    />
                </div>
            </div>
            {hasCurrentSong && (
                <div className='progress-bar-wrap'>
                    <ProgressBar
                        progressChange={onProgressChange}
                        progressInput={onProgressInput}
                        percent={playedPercent}
                        step='0.1'
                    />
                </div>
            )}
            <audio
                src={currentSong.url}
                ref={audio}
                onCanPlay={ready}
                onEnded={end}
                onTimeUpdate={updateTime}
            ></audio>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        playMode: state.musicReducer.playMode,
        isPlayListShow: state.musicReducer.isPlayListShow,
        isPlayerShow: state.musicReducer.isPlayerShow,
        currentSong: state.musicReducer.currentSong,
        playList: state.musicReducer.playList,
        currentTime: state.musicReducer.currentTime,
        playingState: state.musicReducer.playingState
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
