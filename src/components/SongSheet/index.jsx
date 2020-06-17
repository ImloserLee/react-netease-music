import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar } from "antd";
import "./index.scss";
function SongSheet(props) {
	const { userPlaylist } = props;

	return (
		<Fragment>
			{userPlaylist.map((playlist, index) => {
				return (
					<div className='song-sheet-wrapper' key={index}>
						<p className='song-sheet-title'>{playlist.title}</p>
						<ul>
							{playlist.children.map((child, childIndex) => {
								return (
									<li className='sont-sheet-item' key={childIndex}>
										<NavLink exact to={child.path}>
											<Avatar shape='square' src={child.avatar} className='item-avatar' />
											<div className='item-name'>
												<p className='name'>{child.title}</p>
												<p className='num'>{child.num}首</p>
											</div>
										</NavLink>
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

const mapStateToprops = state => {
	return {
		userPlaylist: state.userReducer.userPlaylist
	};
};

export default connect(mapStateToprops, null)(React.memo(SongSheet));
