import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import { scrollInto } from "utils";
import Comment from "../Comment/index.jsx";
import "./index.scss";

import { getSongComment, getPlaylistComment, getHotComment, getMvComment } from "api/comment";

import { getPageOffset } from "utils";

const SONG_TYPE = "song";
const PLAYLIST_TYPE = "playlist";
const MV_TYPE = "mv";

const PAGE_SIZE = 20;

function Comments(props) {
	const { type, id, update } = props;
	const [currentPage, setCurrentPage] = useState(1);
	const [hotComments, setHotComments] = useState([]);
	const [comments, setComments] = useState([]);
	const [total, setTotal] = useState([]);
	const commentsRef = useRef(null);

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

		if (update) {
			update(total);
		}
	};

	const handlePaginationChange = page => {
		setCurrentPage(page);
		setTimeout(() => {
			scrollInto(commentsRef.current);
		}, 20);
	};

	const showHotCommentShow = useMemo(() => {
		return hotComments.length > 0 && currentPage === 1;
	}, [hotComments, currentPage]);

	const shouldCommentShow = useMemo(() => {
		return comments.length > 0;
	}, [comments]);

	useEffect(() => {
		getComment();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, currentPage]);

	return (
		<div className='comments-wrap'>
			{showHotCommentShow ? (
				<div className='block'>
					<p className='title'>精彩评论</p>
					{hotComments.map(comment => {
						return <Comment key={comment.commentId} comment={comment} />;
					})}
				</div>
			) : null}
			{shouldCommentShow ? (
				<div className='block'>
					<p className='title' ref={commentsRef}>
						最新评论
						<span className='count'>(89962)</span>
					</p>
					{comments.map(comment => {
						return <Comment key={comment.commentId} comment={comment} />;
					})}
				</div>
			) : null}

			{total > PAGE_SIZE ? (
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
			) : null}
			{!shouldCommentShow && !showHotCommentShow ? <div className='empty'>还没有评论哦</div> : null}
		</div>
	);
}

Comments.defaultProps = {
	type: SONG_TYPE
};

Comments.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	type: PropTypes.string,
	update: PropTypes.func
};

export default React.memo(Comments);
