import React, { memo, useState, useEffect } from "react";
import "../../style/pagination.scss";
import { Pagination } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as musicAction from "store/music/action";
import SongTable from "components/SongTable";
import { getSearch } from "api/search";
import { getPageOffset, createSong } from "utils";
const PAGE_SIZE = 30;

function SearchSongs(props) {
	const {
		match: { params: keywords },
		musicAction: { updateCount }
	} = props;

	const [songs, setSongs] = useState([]);
	const [count, setCount] = useState([]);
	const [pageIndex, setPageIndex] = useState([1]);

	const getSearchData = async () => {
		const { songs, songCount } = await getSearch({
			limit: 30,
			offset: getPageOffset(pageIndex, PAGE_SIZE),
			...keywords
		});

		const normalizeSongs = songs.map(song => {
			const { id, mvid, name, alias, artists, duration, album } = song;
			return createSong({
				id,
				name,
				alias,
				artists,
				duration,
				mvId: mvid,
				albumName: album.name,
				albumId: album.id
			});
		});

		setSongs(normalizeSongs);
		updateCount(songCount);
		setCount(songCount);
	};

	const handlePaginationChange = page => {
		setPageIndex(page);
	};

	useEffect(() => {
		getSearchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keywords, pageIndex]);

	return (
		<div className='search-song'>
			<SongTable showHeader={true} songs={songs} />
			<div className='pagination-wrap'>
				<Pagination
					size='small'
					total={count}
					pageSize={PAGE_SIZE}
					current={pageIndex}
					onChange={handlePaginationChange}
					showSizeChanger={false}
				/>
			</div>
		</div>
	);
}
const mapDispatchToProps = dispatch => {
	return {
		musicAction: bindActionCreators(musicAction, dispatch)
	};
};

export default connect(null, mapDispatchToProps)(memo(SearchSongs));
