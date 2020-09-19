import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Playlist from './Playlist';
import {sortGenres, propToArr} from './analyzeData';

function PlaylistPage(props) {
  const [appState, setAppState] = useState({
    playlists: [{}],
    genres: {}
  });

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.token);

  const getPlaylists = () => {
    spotifyApi.getUserPlaylists()
      .then((response) => {
        setAppState({playlists: response.items, genres: appState.genres});
      })
  }

  useEffect(() => {
    getPlaylists();
  }, [setAppState]);

  const setGenres = (obj) => {
    let newObj = sortGenres(obj);
    setAppState({playlists: appState.playlists, genres: newObj});
  }

  const strGenres = (genres) => {
    if(Object.keys(genres).length > 0) {
      let arr = [];
      let g = propToArr(genres, 5).map(genre => <div className="genre-level"><p>{genre}</p></div>);
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
        <h2>Your Top Genres:</h2>
        <div className="genre-level-wrapper">
          {strGenres(appState.genres)}
        </div>
      </div>
      <div className="playlist-wrapper">
        {appState.playlists.map((pl) => {
            return <Playlist pl={pl} allGenres={appState.genres} setGenres={setGenres} />;
          })
        }
      </div>
    </div>
  )
}

export default PlaylistPage;
