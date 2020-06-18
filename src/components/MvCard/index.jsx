import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import PlayIcon from "../PlayIcon";
import Icon from "../Icon";
import { formatNumber } from "utils";
import "./index.scss";

function MvCard(props) {
	const {
		picUrl,
		name,
		artistName,
		playCount,
		id,
		history: { push }
	} = props;

	const goMv = () => {
		push(`/mv/${id}`);
	};

	return (
		<div className='mvcard-wrapper' onClick={goMv}>
			<div className='img-wrap'>
				<LazyLoad overflow={true} offset={100}>
					<img src={picUrl} alt='' />
				</LazyLoad>
				<div className='mvplay-count-wrap'>
					<Icon type='play' />
					{formatNumber(playCount)}
				</div>
				<div className='mvplay-icon-wrap'>
					<PlayIcon size={48} />
				</div>
			</div>
			<p className='name'>{name}</p>
			<p className='singer'>{artistName}</p>
		</div>
	);
}

MvCard.propTypes = {
	picUrl: PropTypes.string,
	name: PropTypes.string,
	artistName: PropTypes.string,
	id: PropTypes.number,
	playCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default memo(withRouter(MvCard));
