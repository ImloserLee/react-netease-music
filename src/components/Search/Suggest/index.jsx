import React, { Fragment, memo } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as musicAction from "store/music/action";
import Icon from "components/Icon";
import { createSong } from "utils";
import "./index.scss";

function Suggest(props) {
	const {
		items,
		history,
		musicAction: { startSong }
	} = props;

	const handleItemClick = (item, childItem) => {
		if (item.type === "song") {
			onClickSong(childItem);
		}
		if (item.type === "mv") {
			onClickMv(childItem);
		}

		if (item.type === "playlist") {
			onClickPlaylist(childItem);
		}
	};
	const onClickPlaylist = item => {
		const { id } = item;

		history.push(`/playlist/${id}`);
	};

	const onClickSong = item => {
		const {
			id,
			name,
			artists,
			duration,
			mvid,
			album: { id: albumId, name: albumName }
		} = item;
		const song = createSong({
			id,
			name,
			artists,
			duration,
			albumId,
			albumName,
			mvId: mvid
		});

		startSong(song);
	};
	const onClickMv = item => {
		const { id } = item;

		history.push(`/mv/${id}`);
	};

	return (
		<Fragment>
			{items.map((item, index) => {
				return (
					<div className='search-result-wrapper' key={index}>
						{item.data && item.data.length && (
							<div className='result-title'>
								<Icon type={item.icon} size={14} />
								<span className='song'>{item.title}</span>
							</div>
						)}
						<ul>
							{item.data &&
								item.data.length &&
								item.data.map((childItem, childIndex) => {
									return (
										<li
											className='result-item'
											key={childIndex}
											onClick={() => handleItemClick(item, childItem)}
										>
											<span>{item.renderName ? item.renderName(childItem) : childItem.name}</span>
										</li>
									);
								})}
						</ul>
					</div>
				);
			})}
		</Fragment>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		musicAction: bindActionCreators(musicAction, dispatch)
	};
};

export default connect(null, mapDispatchToProps)(withRouter(memo(Suggest)));
