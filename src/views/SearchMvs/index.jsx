import React, { memo, useState, useEffect } from "react";
import "../../style/pagination.scss";
import "./index.scss";
import { Pagination } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as musicAction from "store/music/action";
import MvCard from "components/MvCard";
import { getSearch } from "api/search";
import { getPageOffset } from "utils";
const PAGE_SIZE = 30;

function SearchMvs(props) {
	const {
		match: { params: keywords },
		musicAction: { updateCount }
	} = props;

	const [mvs, setMvs] = useState([]);
	const [count, setCount] = useState([]);
	const [pageIndex, setPageIndex] = useState([1]);

	const getSearchData = async () => {
		const { mvs, mvCount } = await getSearch({
			limit: PAGE_SIZE,
			offset: getPageOffset(pageIndex, PAGE_SIZE),
			...keywords,
			type: 1004
		});

		updateCount(mvCount);
		setCount(mvCount);
		setMvs(mvs);
	};

	const handlePaginationChange = page => {
		setPageIndex(page);
	};

	useEffect(() => {
		getSearchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keywords, pageIndex]);

	return (
		<div className='search-mvs'>
			<ul className='list-wrap'>
				{mvs.length
					? mvs.map(mv => {
							return (
								<li key={mv.id} className='list-item'>
									<MvCard
										picUrl={mv.cover}
										id={mv.id}
										artistName={mv.artistName}
										name={mv.name}
										playCount={mv.playCount}
									/>
								</li>
							);
					  })
					: null}
			</ul>
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

export default connect(null, mapDispatchToProps)(memo(SearchMvs));
