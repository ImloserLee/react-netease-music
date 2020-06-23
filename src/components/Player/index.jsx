import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as musicAction from "store/music/action";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classnames from "classnames";
import Scroll from "components/Scroll";
import Comments from "components/Comments";
import Icon from "components/Icon";
import PlayIcon from "components/PlayIcon";
import { getLyric, getSimiSongs } from "api/song";
import { getSimiPlaylists } from "api/playlist";
import { isDef, formatNumber, createSong } from "utils";
import lyricParser from "utils/lrcparse";
import playbarsupport from "../../img/play-bar-support.png";
import playbar from "../../img/play-bar.png";
import "./index.scss";

function Player(props) {
	const {
		isPlayerShow,
		currentSong,
		playingState,
		playList,
		history,
		musicAction: { setPlayerShow, startSong, setPlayList }
	} = props;

	const [nolyric, setNoLyric] = useState(false);
	const [lyric, setLyric] = useState([]);
	const [tlyric, setTlyric] = useState([]);
	const [simiPlaylists, setSimiPlaylists] = useState([]);
	const [simiSongs, setSimiSongs] = useState([]);

	const className = classnames({
		"img-outer": true,
		paused: !playingState
	});

	const playClassName = classnames({
		"play-bar": true,
		playing: playingState
	});

	const onClickSong = song => {
		startSong(song);

		const copy = playList.slice();

		if (!copy.find(({ id }) => id === song.id)) {
			copy.unshift(song);

			setPlayList(copy);
		}
	};

	const onClickPlaylist = id => {
		setPlayerShow(false);
		history.push(`/playlist/${id}`);
	};

	const updateLyric = async () => {
		const ret = await getLyric(currentSong.id);

		setNoLyric(!isDef(ret.lrc) || !ret.lrc.lyric);

		if (!nolyric) {
			const { lyric, tlyric } = lyricParser(ret);

			setLyric(lyric);
			setTlyric(tlyric);
		}
	};

	// 获取相似歌单
	const updateSimi = async () => {
		const [simiPlaylists, simiSongs] = await Promise.all([
			getSimiPlaylists(currentSong.id),
			getSimiSongs(currentSong.id)
		]);

		setSimiPlaylists(simiPlaylists.playlists);

		const songs = simiSongs.songs.map(song => {
			const {
				id,
				name,
				artists,
				mvid,
				album: { picUrl },
				duration
			} = song;
			return createSong({
				id,
				name,
				artists,
				duration,
				img: picUrl,
				mvId: mvid
			});
		});

		setSimiSongs(songs);
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
			updateSimi();
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
															<p key={contentIndex} className='lyric-text'>
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
					<div className='comment'>
						<div className='left'>
							<Comments id={currentSong.id} />
						</div>
						<div className='right'>
							<div className='simi-playlists'>
								<p className='title'>包含这首歌的歌单</p>
								{simiPlaylists.length
									? simiPlaylists.map(list => {
											return (
												<div
													className='simi-item'
													key={list.id}
													onClick={() => {
														onClickPlaylist(list.id);
													}}
												>
													<div className='horizontal-card'>
														<div className='img-wrap'>
															<img src={list.coverImgUrl} alt='' />
														</div>
														<div className='content'>
															<div className='name'>{list.name}</div>
															<div className='desc'>
																<Icon size={12} type='play' />
																<p className='count'>{formatNumber(list.playCount)}</p>
															</div>
														</div>
													</div>
												</div>
											);
									  })
									: null}
							</div>
							<div className='simi-songs'>
								<p className='title'>相似歌曲</p>
								{simiSongs.length
									? simiSongs.map(song => {
											return (
												<div
													className='simi-item'
													key={song.id}
													onClick={() => {
														onClickSong(song);
													}}
												>
													<div className='horizontal-card'>
														<div className='img-wrap'>
															<img src={song.img} alt='' />
															<PlayIcon />
														</div>
														<div className='content'>
															<div className='name'>{song.name}</div>
															<div className='desc'>{song.artistsText}</div>
														</div>
													</div>
												</div>
											);
									  })
									: null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
}

const mapStateToProps = state => {
	return {
		isPlayerShow: state.musicReducer.isPlayerShow,
		currentSong: state.musicReducer.currentSong,
		playingState: state.musicReducer.playingState,
		playList: state.musicReducer.playList
	};
};

const mapDispatchToProps = dispatch => {
	return {
		musicAction: bindActionCreators(musicAction, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(Player)));
