import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Icon from "components/Icon";
import { formatDate } from "utils";
import "./index.scss";

function Header(props) {
	const { playlist } = props;

	const tagsText = useCallback(tags => {
		return tags.join("/");
	}, []);
	return (
		<div className='playlistdetail-header'>
			<div className='img-wrap'>
				<img src={playlist.coverImgUrl} alt='' />
			</div>
			<div className='content'>
				<div className='title-wrap'>
					<p className='title'>{playlist.name}</p>
				</div>
				<div className='creator-wrap'>
					<img src={playlist.creator.avatarUrl} alt='' className='avatar' />
					<p className='creator'>{playlist.creator.nickname}</p>
					<p className='create-time'>{formatDate(playlist.createTime, "yyyy-MM-dd")} 创建</p>
				</div>
				<div className='action-wrap'>
					<div className='button'>
						<Icon color='white' type='play-round' className='middle' />
						<span className='middle'>播放全部</span>
					</div>
				</div>
				<div className='desc-wrap'>
					<p className='desc'>
						<span>标签: {tagsText(playlist.tags)}</span>
					</p>
					{playlist.description ? (
						<p className='desc'>
							<span className='value'>简介: {playlist.description}</span>
						</p>
					) : null}
				</div>
			</div>
		</div>
	);
}

Header.defaultProps = {
	playlist: {},
	songs: []
};

Header.propTypes = {
	playlist: PropTypes.object,
	songs: PropTypes.array
};

export default React.memo(Header);
