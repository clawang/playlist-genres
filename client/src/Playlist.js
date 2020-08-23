import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

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
    		getArtist({}, ids, 0, ids.length);
      	})
	}

	const getArtist = (genres, ids, index, n) => {
		if(index < n) {
			spotifyApi.getArtists(ids.slice(index, index + 50))
				.then((response) => {
					response.artists.forEach((artist) => {
						artist.genres.forEach(g => updateObj(genres, g));
					});
					getArtist(genres, ids, index+50, n);
				});
		} else {
			console.log(props.pl.name);
			setGenres(genres);
		}
	}

	const updateObj = (genres, genre) => {
		if(genres.hasOwnProperty(genre)) {
  			genres[genre]++;
  		} else {
  			genres[genre] = 1;
  		}
	}

	const setGenres = (genres) => {
		let str = '';
        let newGenres = {};

		if(Object.keys(genres).length > 0) {
	        newGenres = sortGenres(genres);
	        let index = 0;
        	let i = 0;
	        
	        while(index < 3) {
	        	let g = newGenres[i][0];
	        	if(g !== "pop") {
	        		if(index > 0) {
		        		str += ", ";
		        	}
	        		str += g;
	        		index++;
	        	}
		        i++;
		    }
		} else {
			str = "N/A";
		}

        setAppState({loading: false, genres: str, genreObj: newGenres});
        props.setGenres(allGenres);
	}

	const sortGenres = (genres) => {
		var sortable = [];
		for (var g in genres) {
		    sortable.push([g, genres[g]]);
		}

		sortable.sort(function(a, b) {
		    return b[1] - a[1];
		});	

		return sortable;
	}

	useEffect(() => {
		getTracks();
	}, [setAppState]);

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