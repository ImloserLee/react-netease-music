import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import Tabs from "components/Tabs";
import "./index.scss";
const TABS = [
	{
		title: "歌曲",
		to: "songs"
	},
	{
		title: "歌单",
		to: "playlists"
	},
	{
		title: "MV",
		to: "mvs"
	}
];
function Search(props) {
	const {
		route,
		history,
		match: {
			params: { keywords }
		},
		count
	} = props;

	const [currentIndex, setCurrentIndex] = useState(0);

	const OnTabChange = index => {
		if (index === currentIndex) return;
		setCurrentIndex(index);
		history.push(`/search/${keywords}/${TABS[index].to}`);
	};
	return (
		<div className='search-detail'>
			<div className='search-detail-header'>
				<span className='keyword'>{keywords}</span>
				<span className='found'>找到{count}个结果</span>
			</div>
			<div className='tab-wrap'>
				<Tabs tabs={TABS} tabChange={OnTabChange} />
			</div>
			{renderRoutes(route.routes)}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		count: state.musicReducer.count
	};
};

export default connect(mapStateToProps, null)(memo(Search));
