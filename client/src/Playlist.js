import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {sortGenres, updateObj, propToArr} from './analyzeData';

function Playlist(props) {

	const spotifyApi = new SpotifyWebApi();
	const allGenres = props.allGenres;

	const [appState, setAppState] = useState({
	    loading: true,
	    genres: '',
	    genreObj: {}
	  });

	const displayAlbumCover = () => {
		if(props.pl.images) {
			return props.pl.images[0].url;
		}
	}

	const getTracks = () => {
		console.log(props.pl);
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
	}

	const getArtist = (genres, ids, index, n, name) => {
		if(index < n) {
			spotifyApi.getArtists(ids.slice(index, index + 50))
				.then((response) => {
					console.log(name);
					console.log(response);
					response.artists.forEach((artist) => {
						artist.genres.forEach(g => {
							updateObj(genres, g);
							updateObj(props.allGenres, g);
						});
					});
					props.setGenres(props.allGenres);
					getArtist(genres, ids, index+50, n, name);
				});
		} else {
			setGenres(genres);
		}
	}

	const setGenres = (genres) => {
		let str = '';
        let newGenres = {};

		if(Object.keys(genres).length > 0) {
	        newGenres = sortGenres(genres);
	        str = propToArr(newGenres, 3).join(', ');
		} else {
			str = "N/A";
		}

        setAppState({loading: false, genres: str, genreObj: newGenres});
        props.setGenres(allGenres);
	}

	useEffect(() => {
		getTracks();
	}, [props.pl]);

	if (appState.loading) return <p>Loading...</p>;
	return (
		<div className="playlist">
			<img src={displayAlbumCover()} />
			<h3>{props.pl.name}</h3>
			<p className="genres">{appState.genres}</p>
		</div>
	);
}

export default Playlist;