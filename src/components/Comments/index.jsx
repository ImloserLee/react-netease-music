import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import Comment from "../Comment/index.jsx";
import "./index.scss";

import { getSongComment, getPlaylistComment, getHotComment, getMvComment } from "api/comment";

import { getPageOffset } from "utils";

const SONG_TYPE = "song";
const PLAYLIST_TYPE = "playlist";
const MV_TYPE = "mv";

const PAGE_SIZE = 20;

function Comments(props) {
	const { type, id } = props;
	const [currentPage, setCurrentPage] = useState(1);
	const [hotComments, setHotComments] = useState([]);
	const [comments, setComments] = useState([]);
	const [total, setTotal] = useState([]);

	const getComment = async () => {
		const commentRequestMap = {
			[PLAYLIST_TYPE]: getPlaylistComment,
			[SONG_TYPE]: getSongComment,
			[MV_TYPE]: getMvComment
		};

		const commentRequest = commentRequestMap[type];
		const { hotComments = [], comments = [], total } = await commentRequest({
			id,
			pageSize: PAGE_SIZE,
			offset: getPageOffset(currentPage, PAGE_SIZE)
		});

		if (type === PLAYLIST_TYPE && currentPage === 1) {
			const { hotComments: exacHotComments = [] } = await getHotComment({
				id,
				type: 2
			});

			setHotComments(exacHotComments);
		} else {
			setHotComments(hotComments);
		}

		setComments(comments);
		setTotal(total);
	};

	const handlePaginationChange = page => {
		setCurrentPage(page);
	};

	useEffect(() => {
		getComment();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<div className='comments-wrap'>
			<div className='block'>
				<p className='title'>精彩评论</p>
				{hotComments.length
					? hotComments.map(comment => {
							return <Comment key={comment.commentId} comment={comment} />;
					  })
					: null}
			</div>
			<div className='block'>
				<p className='title'>
					最新评论
					<span className='count'>(89962)</span>
				</p>
				{comments.length
					? comments.map(comment => {
							return <Comment key={comment.commentId} comment={comment} />;
					  })
					: null}
			</div>
			<div className='pagination-wrap'>
				<Pagination
					size='small'
					total={total}
					pageSize={PAGE_SIZE}
					current={currentPage}
					onChange={handlePaginationChange}
					showSizeChanger={false}
				/>
			</div>
		</div>
	);
}

Comments.defaultProps = {
	type: SONG_TYPE
};

Comments.propTypes = {
	id: PropTypes.number,
	type: PropTypes.string
};

export default React.memo(Comments);
