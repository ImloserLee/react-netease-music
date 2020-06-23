import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.scss";

function TopPlaylistCard(props) {
	const { coverImgUrl, name, description, id, history } = props;

	const handleClickCard = () => {
		history.push(`/playlist/${id}`);
	};

	return (
		<div className='top-card-wrapper' onClick={handleClickCard}>
			<div className='main'>
				<div className='img-wrap'>
					<img src={coverImgUrl} alt='' />
				</div>
				<div className='content-wrap'>
					<div className='tag'>
						<span>精品歌单</span>
					</div>
					<p className='name'>{name}</p>
					<p className='desc'>{description}</p>
				</div>
			</div>
			<div className='background' style={{ backgroundImage: `url(${coverImgUrl})` }}></div>
			<div className='background-mask'></div>
		</div>
	);
}

TopPlaylistCard.propTypes = {
	coverImgUrl: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	id: PropTypes.number
};

export default withRouter(memo(TopPlaylistCard));
