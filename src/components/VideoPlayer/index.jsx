import React, { useRef, useEffect, memo, forwardRef, useState } from "react";
import Player from "xgplayer";

const VideoPlayer = forwardRef((props, ref) => {
	const { url } = props;
	const player = useRef(ref);

	const [playerCor, setPlayerCor] = useState(null);

	const initPlayer = () => {
		if (!url) return;
		const playerCor = new Player({
			el: player.current,
			url,
			videoInit: true,
			lang: "zh-cn",
			width: "100%",
			playbackRate: [0.5, 0.75, 1, 1.5, 2]
		});

		setPlayerCor(playerCor);
	};

	useEffect(() => {
		initPlayer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	useEffect(() => {
		if (playerCor) {
			playerCor.on("resourceReady", () => {
				console.log(222);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerCor]);

	return <div ref={player}></div>;
});

export default memo(VideoPlayer);
