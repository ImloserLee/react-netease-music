import React from "react";
import "./index.scss";

function Panel(props) {
	const { items, title, clickTag } = props;

	const handleClickTag = word => {
		clickTag(word);
	};

	return (
		<div className='search-panel'>
			{items.length ? <p className='panel-title'>{title}</p> : null}
			<ul>
				{items.length
					? items.map((hot, index) => {
							return (
								<li className='panel-tag' key={index} onClick={() => handleClickTag(hot.first)}>
									{hot.first}
								</li>
							);
					  })
					: null}
			</ul>
		</div>
	);
}

export default React.memo(Panel);
