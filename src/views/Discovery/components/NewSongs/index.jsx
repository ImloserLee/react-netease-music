import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as musicAction from "store/music/action";
import SongCard from "components/SongCard";
import Title from "components/Title";
import "./index.scss";
import { getNewSongs } from "api/discovery";
import { createSong } from "utils";

const songsLimit = 10;

function NewSongs(props) {
	const {
		musicAction: { startSong, setPlayList }
	} = props;

	const [list, setList] = useState([]);
	const [chunkLimit] = useState(songsLimit / 2);

	// 获取最新音乐数据
	const getList = async () => {
		const res = await getNewSongs();

		setList(res);
	};

	// 组织最新音乐外层循环的数组
	const thunkedList = useMemo(() => {
		return [list.slice(0, chunkLimit), list.slice(chunkLimit, list.length)];
	}, [chunkLimit, list]);

	// 前面排序数值
	const getSongOrder = useCallback(
		(thunkedIndex, index) => {
			return thunkedIndex * chunkLimit + index + 1;
		},
		[chunkLimit]
	);

	// 组织歌曲数据格式
	const nomalizeSong = song => {
		const {
			id,
			name,
			song: {
				mvid,
				artists,
				album: { blurPicUrl },
				duration
			}
		} = song;

		return createSong({
			id,
			name,
			img: blurPicUrl,
			artists,
			mvid,
			duration
		});
	};

	// 组织歌单列表
	const normalizedSongs = useMemo(() => {
		return list.map(song => nomalizeSong(song));
	}, [list]);

	const handleClick = (thunkedIndex, index) => {
		const nomalizedSongIndex = getSongOrder(thunkedIndex, index) - 1;
		const song = normalizedSongs[nomalizedSongIndex];

		startSong(song);
		setPlayList(normalizedSongs);
	};

	useEffect(() => {
		getList();
	}, []);

	if (list.length) {
		return (
			<div className='new-songs'>
				<Title name='最新音乐' />
				<div className='list-wrap'>
					{thunkedList.map((thunked, thunkedIndex) => {
						return (
							<div className='list' key={thunkedIndex}>
								{thunked.map((item, index) => {
									return (
										<div key={item.id} onClick={() => handleClick(thunkedIndex, index)}>
											<SongCard {...nomalizeSong(item)} order={getSongOrder(thunkedIndex, index)} />
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		);
	} else {
		return null;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		musicAction: bindActionCreators(musicAction, dispatch)
	};
};

export default connect(null, mapDispatchToProps)(memo(NewSongs));
