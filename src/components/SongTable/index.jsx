import React, { useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import * as musicAction from "store/music/action";
import { Table } from "antd";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import Icon from "components/Icon";
import PlayIcon from "components/PlayIcon";
import { formatTime, pad } from "utils";
import "./index.scss";

const { Column } = Table;

function SongTable(props) {
	const {
		showHeader,
		showPagination,
		songs,
		hideColumns,
		currentSong,
		stripe,
		musicAction: { setPlayList, startSong }
	} = props;

	const columns = [
		{
			dataIndex: "index",
			title: "",
			key: "index",
			width: "70px",
			render: (text, record) => {
				return (
					<div className='index-wrap'>
						{isActiveSong(record.id) ? (
							<Icon type='horn' color='theme' />
						) : (
							<span>{pad(record.index + 1)}</span>
						)}
					</div>
				);
			}
		},
		{
			dataIndex: "img",
			key: "img",
			title: "",
			width: "100px",
			render: (text, record) => {
				return (
					<div className='img-wrap'>
						<LazyLoad overflow={true}>
							<img src={record.img} alt='' />
						</LazyLoad>
						<div className='img-play-icon'>
							<PlayIcon />
						</div>
					</div>
				);
			}
		},
		{
			dataIndex: "name",
			key: "name",
			title: "音乐标题",
			ellipsis: true,
			render: (text, record) => {
				const { name, mvId } = record;

				const handleGoMv = e => {
					e.stopPropagation();
				};

				return (
					<div>
						<div className='song-table-name-cell song-active'>
							<span className='song-table-name'>{name}</span>
							{mvId ? (
								<div onClick={handleGoMv}>
									<Icon type='mv' color='theme' size={18} />
								</div>
							) : null}
						</div>
					</div>
				);
			}
		},
		{
			dataIndex: "artistsText",
			key: "artistsText",
			title: "歌手",
			ellipsis: true
		},
		{
			dataIndex: "albumName",
			key: "albumName",
			title: "专辑"
		},
		{
			dataIndex: "durationSecond",
			key: "durationSecond",
			title: "时长",
			width: "100px",
			render: (text, record) => {
				return <span>{formatTime(record.durationSecond)}</span>;
			}
		}
	];

	const showColumn = useMemo(() => {
		const isHideColumns = hideColumns.slice();

		if (songs.length) {
			const reference = songs[0];
			const { img } = reference;

			if (!img) {
				isHideColumns.push("img");
			}
			return columns.filter(column => {
				return !isHideColumns.find(isHideColumn => isHideColumn === column.dataIndex);
			});
		}
		return columns;
	}, [columns, hideColumns, songs]);

	// 给每条数据新增index属性
	const computedSongs = useMemo(() => {
		return songs.map((song, index) => {
			return {
				index,
				...song
			};
		});
	}, [songs]);

	const handleRowClick = song => {
		startSong(song);
		setPlayList(songs);
	};

	const isActiveSong = useCallback(
		id => {
			return id === currentSong.id;
		},
		[currentSong.id]
	);

	const setRowClassName = useCallback(
		(record, index) => {
			const cls = classnames({
				"table-row-active": currentSong.id === record.id,
				stripe: stripe && index % 2 === 1
			});
			return cls;
		},
		[currentSong.id, stripe]
	);

	if (songs.length) {
		return (
			<div className='song-table-wrap'>
				<Table
					dataSource={computedSongs}
					showHeader={showHeader}
					pagination={showPagination}
					rowKey='id'
					rowClassName={setRowClassName}
					onRow={record => {
						return {
							onClick: () => {
								handleRowClick(record);
							}
						};
					}}
				>
					{showColumn.map(column => {
						return <Column {...column} />;
					})}
				</Table>
			</div>
		);
	} else {
		return null;
	}
}

SongTable.defaultProps = {
	size: "default",
	showHeader: false,
	showPagination: false,
	songs: [],
	hideColumns: [],
	stripe: false
};

SongTable.propTypes = {
	size: PropTypes.string,
	showHeader: PropTypes.bool,
	showPagination: PropTypes.bool,
	songs: PropTypes.array,
	hideColumns: PropTypes.array,
	stripe: PropTypes.bool
};

const mapStateToProps = state => {
	return {
		currentSong: state.musicReducer.currentSong
	};
};

const mapDispatchToProps = dispatch => {
	return {
		musicAction: bindActionCreators(musicAction, dispatch)
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SongTable));
