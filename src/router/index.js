import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
const SuspenseComponent = Component => props => {
	return (
		<Suspense fallback={null}>
			<Component {...props}></Component>
		</Suspense>
	);
};

const Layout = lazy(() => import("views/Layout"));
const Search = lazy(() => import("views/Search"));
const Discovery = lazy(() => import("views/Discovery"));
const Playlists = lazy(() => import("views/Playlists"));
const Songs = lazy(() => import("views/Songs"));
const Mvs = lazy(() => import("views/Mvs"));
const Mv = lazy(() => import("views/Mv"));
const PlaylistDetail = lazy(() => import("views/PlaylistDetail"));
const SearchSongs = lazy(() => import("views/SearchSongs"));
const SearchPlaylists = lazy(() => import("views/SearchPlaylists"));
const SearchMvs = lazy(() => import("views/SearchMvs"));

// 侧边栏显示的菜单
export const menuRoutes = [
	{
		path: "/discovery",
		component: SuspenseComponent(Discovery),
		title: "发现音乐",
		icon: "music"
	},
	{
		path: "/playlists",
		component: SuspenseComponent(Playlists),
		title: "推荐歌单",
		icon: "playlist-menu"
	},
	{
		path: "/songs",
		component: SuspenseComponent(Songs),
		title: "最新音乐",
		icon: "yinyue"
	},
	{
		path: "/mvs",
		component: SuspenseComponent(Mvs),
		title: "最新MV",
		icon: "mv"
	}
];

const routes = [
	{
		path: "/",
		component: SuspenseComponent(Layout),
		routes: [
			{
				path: "/",
				exact: true,
				render: () => <Redirect to={"/discovery"} />
			},
			{
				path: "/playlist/:id",
				component: SuspenseComponent(PlaylistDetail)
			},
			{
				path: "/search/:keywords",
				component: SuspenseComponent(Search),
				routes: [
					{
						path: "/search/:keywords/songs",
						component: SuspenseComponent(SearchSongs)
					},
					{
						path: "/search/:keywords/playlists",
						component: SuspenseComponent(SearchPlaylists)
					},
					{
						path: "/search/:keywords/mvs",
						component: SuspenseComponent(SearchMvs)
					}
				]
			},
			{
				path: "/mv/:id",
				component: SuspenseComponent(Mv)
			},
			...menuRoutes
		]
	}
];

export default routes;
