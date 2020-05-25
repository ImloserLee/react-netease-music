import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import Scroll from 'components/Scroll';
import { getLyric } from 'api/song';
import { isDef } from 'utils';
import lyricParser from 'utils/lrcparse';
import playbarsupport from '../../img/play-bar-support.png';
import playbar from '../../img/play-bar.png';
import './index.scss';

function Player(props) {
    const { isPlayerShow, currentSong, playingState } = props;

    const [nolyric, setNoLyric] = useState(false);
    const [lyric, setLyric] = useState([]);
    const [tlyric, setTlyric] = useState([]);

    const className = classnames({
        'img-outer': true,
        paused: !playingState
    });

    const playClassName = classnames({
        'play-bar': true,
        playing: playingState
    });

    const updateLyric = async () => {
        const ret = await getLyric(currentSong.id);

        setNoLyric(!isDef(ret.lrc) || !ret.lrc.lyric);

        if (!nolyric) {
            const { lyric, tlyric } = lyricParser(ret);

            setLyric(lyric);
            setTlyric(tlyric);
        }
    };

    const lyricWithTranslation = useMemo(() => {
        let ret = [];
        // 空内容的去除
        const lyricFiltered = lyric.filter(({ content }) => Boolean(content));
        // content统一转换数组形式
        if (lyricFiltered.length) {
            lyricFiltered.forEach(l => {
                const { time, content } = l;
                const lyricItem = { time, content, contents: [content] };
                const sameTimeTLyric = tlyric.find(({ time: tLyricTime }) => tLyricTime === time);
                if (sameTimeTLyric) {
                    const { content: tLyricContent } = sameTimeTLyric;
                    if (content) {
                        lyricItem.contents.push(tLyricContent);
                    }
                }
                ret.push(lyricItem);
            });
        } else {
            ret = lyricFiltered.map(({ time, content }) => ({
                time,
                content,
                contents: [content]
            }));
        }

        return ret;
    }, [tlyric, lyric]);

    useEffect(() => {
        if (currentSong.id) {
            updateLyric();
        }
        // eslint-disable-next-line
    }, [currentSong]);

    return (
        <CSSTransition in={isPlayerShow} timeout={300} classNames='slide' unmountOnExit>
            <div className='player-wrap'>
                <div className='content'>
                    <div className='song'>
                        <div className='left'>
                            <img className='play-bar-support' src={playbarsupport} alt='' />
                            <img className={playClassName} src={playbar} alt='' />
                            <div className='img-outer-border'>
                                <div className={className}>
                                    <div className='img-wrap'>
                                        <img src={currentSong.img} alt='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='name-wrap'>
                                <p className='name'>{currentSong.name}</p>
                                {currentSong.mvId ? <span className='mv-tag'>MV</span> : null}
                            </div>
                            <div className='desc'>
                                <div className='desc-item'>
                                    <span className='label'>歌手:</span>
                                    <div className='value'>{currentSong.artistsText}</div>
                                </div>
                            </div>
                            {nolyric ? (
                                <div>还没有歌词哦</div>
                            ) : (
                                <Scroll className='lyric-wrap'>
                                    <div>
                                        {lyricWithTranslation.map((item, index) => {
                                            return (
                                                <div key={index} className='lyric-item'>
                                                    {item.contents.map((content, contentIndex) => {
                                                        return (
                                                            <p
                                                                key={contentIndex}
                                                                className='lyric-text'
                                                            >
                                                                {content}
                                                            </p>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Scroll>
                            )}
                        </div>
                    </div>
                    <div className='comment'></div>
                </div>
            </div>
        </CSSTransition>
    );
}

const mapStateToProps = state => {
    return {
        isPlayerShow: state.musicReducer.isPlayerShow,
        currentSong: state.musicReducer.currentSong,
        playingState: state.musicReducer.playingState
    };
};

export default connect(
    mapStateToProps,
    null
)(React.memo(Player));
