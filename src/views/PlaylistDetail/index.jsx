import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "./components/header";
import SongTable from "components/SongTable";
import Comments from "components/Comments";
import Tabs from "components/Tabs";
import { createSong } from "utils";
import { getListDetail, getSongDetail } from "api/song";
import "./index.scss";

const TABS = ["歌曲列表", "评论"];
const MAX = 500;

function PlaylistDetail(props) {
	const {
		match: {
			params: { id }
		}
	} = props;

	const [playlist, setPlaylsit] = useState({});
	const [songs, setSongs] = useState([]);
	const [tabs, setTabs] = useState(TABS);
	const [tabIndex, setTableIndex] = useState(0);

	const handleTabChange = index => {
		setTableIndex(index);
	};

	const _getListDetail = async () => {
		const { playlist } = await getListDetail({ id });

		setPlaylsit(playlist);
		genSonglist(playlist);
	};

	const genSonglist = async playlist => {
		const trackIds = playlist.trackIds.map(({ id }) => id);

		const songDetails = await getSongDetail(trackIds.slice(0, MAX));

		const songs = songDetails.songs.map(({ id, name, al, ar, mv, dt }) => {
			return createSong({
				id,
				name,
				artists: ar,
				duration: dt,
				mvId: mv,
				albumName: al.name,
				img: al.picUrl
			});
		});

		setSongs(songs);
	};

	const handleUpdate = total => {
		const copy = tabs.slice();
		copy.splice(1, 1, `评论(${total})`);

		setTabs(copy);
	};

	useEffect(() => {
		_getListDetail();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (playlist.id) {
		return (
			<div className='playlist-detail'>
				<Header playlist={playlist} songs={songs} />
				<div className='tabs-wrap'>
					<Tabs tabs={tabs} tabChange={handleTabChange} type='theme' />
				</div>
				{tabIndex === 0 ? (
					<SongTable songs={songs} showHeader={true} />
				) : (
					<div className='comments'>
						<Comments id={id} type='playlist' update={handleUpdate} />
					</div>
				)}
			</div>
		);
	}
	return null;
}

export default React.memo(withRouter(PlaylistDetail));
