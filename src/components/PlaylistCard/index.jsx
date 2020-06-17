import React, { memo } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import { withRouter } from "react-router-dom";
import PlayIcon from "components/PlayIcon";
import "./index.scss";

function PlaylistCard(props) {
	const { picUrl, copywriter, name, id, history } = props;

	const handleClickCard = () => {
		history.push(`/playlist/${id}`);
	};

	return (
		<div className='playlist-card' onClick={handleClickCard}>
			<div className='card-img'>
				<LazyLoad overflow={true} offset={100}>
					<img src={picUrl} alt='' />
				</LazyLoad>
				<div className='card-desc'>
					<span className='desc'>{copywriter}</span>
				</div>
				<div className='card-icon'>
					<PlayIcon size={36} />
				</div>
			</div>
			<div className='card-name'>{name}</div>
		</div>
	);
}

PlaylistCard.propTypes = {
	picUrl: PropTypes.string,
	copywriter: PropTypes.string,
	id: PropTypes.number,
	name: PropTypes.string
};

export default withRouter(memo(PlaylistCard));
