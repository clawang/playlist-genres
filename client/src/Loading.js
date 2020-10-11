import React, {useEffect, useState} from 'react';

function Loading(props) {
	return (
		<div className="loading">
			{props.state === 0 ? 
				<h2>Gathering your Spotify data...</h2>
				: 
				<div>
					<h2>Looks like your authorization token has expired.</h2>
					<button><a href="/">Try Again</a></button>
				</div>
			}
		</div>
	)
}

export default Loading;