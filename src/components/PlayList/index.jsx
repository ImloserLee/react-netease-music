import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as musicAction from "store/music/action";
import Tabs from "components/Tabs";
import Icon from "components/Icon";
import SongTable from "components/SongTable";
import "./index.scss";

const TABS = ["播放列表", "历史记录"];

function PlayList(props) {
	const {
		isPlayListShow,
		playList,
		playHistory,
		musicAction: { clearPlayList, clearPlayHistory }
	} = props;
	const [tabIndex, setTabIndex] = useState(0);

	const handleClear = () => {
		if (tabIndex === 0) {
			clearPlayList();
		} else {
			clearPlayHistory();
		}
	};

	const handleTabChange = index => {
		setTabIndex(index);
	};

	const dataSource = useMemo(() => {
		return tabIndex === 0 ? playList : playHistory;
	}, [tabIndex, playHistory, playList]);

	return isPlayListShow ? (
		<div className='playlist-wrap'>
			<Tabs tabs={TABS} align='center' tabChange={handleTabChange} />
			<div className='play-header'>
				<p className='total'>{`总共${dataSource.length}首`}</p>
				{dataSource.length ? (
					<div className='remove' onClick={handleClear}>
						<Icon type='remove' />
						<span className='text'>清空</span>
					</div>
				) : null}
			</div>
			{dataSource.length ? (
				<div className='playlist-table'>
					<SongTable
						showHeader={true}
						songs={dataSource}
						hideColumns={["index", "img", "albumName"]}
					/>
				</div>
			) : (
				<div className='playlist-tips'>你还没有添加任何歌曲</div>
			)}
		</div>
	) : null;
}

const mapStateToProps = state => {
	return {
		isPlayListShow: state.musicReducer.isPlayListShow,
		playList: state.musicReducer.playList,
		playHistory: state.musicReducer.playHistory
	};
};

const mapDispatchToProps = dispatch => {
	return {
		musicAction: bindActionCreators(musicAction, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList));
