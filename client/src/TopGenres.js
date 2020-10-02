import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Playlist from './Playlist';
import {sortGenres, propToArr, updateObj} from './analyzeData';

function TopGenres(props) {
  const [appState, setAppState] = useState({
    genres: {}
  });

  let artists = [{}];

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.token);

  const getArtists = () => {
    let options = {time_range: props.timeframe};
    spotifyApi.getMyTopArtists(options)
      .then((response) => {
        artists = response.items;
        setAppState({genres: appState.genres});
        analyzeGenres();
      })
  }

  useEffect(() => {
    getArtists();
  }, [setAppState]);

  const analyzeGenres = () => {
    artists.forEach((artist) => {
      if(artist.genres) {
        artist.genres.forEach((g) => {
          let obj = appState.genres;
          updateObj(obj, g);
          setAppState({genres: obj});
        });
      }
    });
    props.updateGenres(appState.genres);
  }

  const strGenres = (genres) => {
    if(Object.keys(genres).length > 0) {
      let newGenres = sortGenres(genres);
      let arr = [];
      let g = propToArr(newGenres, 5).map((genre, index) => <div className="genre-level" key={index}><div className="genre-level-front"><h3>{genre}</h3></div><div className="genre-level-side"></div></div>);
      arr[0] = g[4];
      arr[1] = g[3];
      arr[2] = g[1];
      arr[3] = g[0];
      arr[4] = g[2];
      return arr;
    } else {
      return <p>N/A</p>;
    }
  }

  return (
    <div className="genres-wrapper">
      <div className="genres">
        <h2>Your Top Niche Genres</h2>
        <p>Ever wondered what subgenres of music you listen to most often?</p>
        <div className="genre-level-wrapper">
            {strGenres(appState.genres)} 
        </div>
      </div>
    </div>
  )
}

export default TopGenres;
