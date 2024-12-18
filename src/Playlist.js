import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {sortGenres, updateObj, propToArr} from './analyzeData';

function Playlist(props) {

	const spotifyApi = new SpotifyWebApi();
	const allGenres = props.allGenres;

	const [percent, setPercent] = useState(-1);
	const [appState, setAppState] = useState({
		loading: true,
		error: false,
		genres: [],
		genreObj: {}
	});

	useEffect(() => {
		setAppState({...appState, loading: true});
		addPercent(0);
		getTracks();
	}, [props.pl]);

	const displayAlbumCover = () => {
		if(props.pl.images) {
			return props.pl.images[0].url;
		}
	}

	const getTracks = () => {
		//console.log(props.pl);
		spotifyApi.getPlaylistTracks(props.pl.id)
	      .then((response) => {
	        let ids = response.items.map((song) => {
				if(song.track !== null) {
					return song.track.artists[0].id;
				} else {
					return null;
				}
			});
			ids = ids.filter(id => id !== null);
			//console.log(props.pl.name);
    		getArtist({}, ids, 0, ids.length, props.pl.name);
      	})
      	.catch((err) => {
      		setAppState({...appState, error: true});
      	});
	}

	const getArtist = (genres, ids, index, n, name) => {
		if(index < n) {
			spotifyApi.getArtists(ids.slice(index, index + 50))
				.then((response) => {
					// console.log(name);
					// console.log(response);
					response.artists.forEach((artist) => {
						artist.genres.forEach(g => {
							updateObj(genres, g);
							updateObj(props.allGenres, g);
						});
					});
					props.setGenres(props.allGenres);
					getArtist(genres, ids, index+50, n, name);
				})
				.catch((err) => {
		      		setAppState({...appState, error: true});
		      	});
		} else {
			setGenres(genres);
		}
	}

	const setGenres = (genres) => {
		let str = [];
        let newGenres = {};

		if(Object.keys(genres).length > 0) {
	        newGenres = sortGenres(genres);
	        str = propToArr(newGenres, 3);
		} else {
			str = ["N/A"];
		}
        setAppState({loading: false, genres: str, genreObj: newGenres, error: false});
        props.setGenres(allGenres);
	}

	const addPercent = (current) => {
		setPercent(current+1);
		if(current < 110) {
			setTimeout(() => {
			    addPercent(current+1);
			}, 15);
		}
	}

	if (appState.loading || percent < 110) {
		return (
			<div>
				<p>Loading... ({Math.min(percent, 100)}%)</p>
				<div className="loading-bar">
					<div className="loading-bar-inner"></div>
				</div>
				<div className="button-wrapper"><div className="button" onClick={()=>props.setFeatured(-1)}>Cancel</div></div>
			</div>
		);
	} else {
		return (
			<div className="playlist">
				<img src={displayAlbumCover()} />
				<a href={props.pl.external_urls.spotify}><h3>{props.pl.name}</h3></a>
				{appState.genres.map((g, i) => <p className="genres" key={i}>{g}</p>)}
			</div>
		);
	}
}

export default Playlist;