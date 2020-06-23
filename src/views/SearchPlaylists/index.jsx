import React, { memo, useState, useEffect } from "react";
import "../../style/pagination.scss";
import "./index.scss";
import { Pagination } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as musicAction from "store/music/action";
import PlaylistCard from "components/PlaylistCard";
import { getSearch } from "api/search";
import { getPageOffset, formatNumber } from "utils";
const PAGE_SIZE = 30;

function SearchPlaylists(props) {
	const {
		match: { params: keywords },
		musicAction: { updateCount }
	} = props;

	const [playlists, setPlaylists] = useState([]);
	const [count, setCount] = useState([]);
	const [pageIndex, setPageIndex] = useState([1]);

	const getSearchData = async () => {
		const { playlists, playlistCount } = await getSearch({
			limit: PAGE_SIZE,
			offset: getPageOffset(pageIndex, PAGE_SIZE),
			...keywords,
			type: 1000
		});

		updateCount(playlistCount);
		setCount(playlistCount);
		setPlaylists(playlists);
	};

	const handlePaginationChange = page => {
		setPageIndex(page);
	};

	useEffect(() => {
		getSearchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keywords, pageIndex]);

	return (
		<div className='search-playlist'>
			<div className='list-wrap'>
				{playlists.length
					? playlists.map(list => {
							return (
								<PlaylistCard
									picUrl={list.coverImgUrl}
									id={list.id}
									key={list.id}
									name={list.name}
									copywriter={`播放量: ${formatNumber(list.playCount)}`}
								/>
							);
					  })
					: null}
			</div>
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

export default connect(null, mapDispatchToProps)(memo(SearchPlaylists));
