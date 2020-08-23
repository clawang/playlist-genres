import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Playlist from './Playlist';
import {sortGenres, propToArr} from './analyzeData';

function PlaylistPage() {
  const [appState, setAppState] = useState({
    loggedIn: false,
    nowPlaying: {
      name: 'Not Checked',
      albumArt: ''
    },
    playlists: [{}],
    genres: {}
  });

  const spotifyApi = new SpotifyWebApi();

  const getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  const getPlaylists = () => {
    spotifyApi.getUserPlaylists()
      .then((response) => {
        setAppState({playlists: response.items, loggedIn: appState.loggedIn, genres: appState.genres});
      })
  }

  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    setAppState({loggedIn: token ? true : false, nowPlaying: {name: 'Not Checked', albumArt: ''}, genres: appState.genres});
  }, [setAppState]);

  const setGenres = (obj) => {
    let newObj = sortGenres(obj);
    setAppState({loggedIn: appState.loggedIn, nowPlaying: appState.nowPlaying, playlists: appState.playlists, genres: newObj});
  }

  const strGenres = (genres) => {
    if(Object.keys(genres).length > 0) {
      return propToArr(genres, 5).map(genre => <p>{genre}</p>);
    } else {
      return <p>N/A</p>;
    }
  }

  return (
    <div className='App'>
      {appState.loggedIn ?
        <div>
          <button onClick={getPlaylists}>
            get playlists
          </button>
          <div>
            <h2>Top Genres</h2>
            <p>{strGenres(appState.genres)}</p>
          </div>
          <div className="playlist-wrapper">
            {appState.playlists ? 
              appState.playlists.map((pl) => {
                return <Playlist pl={pl} allGenres={appState.genres} setGenres={setGenres} />;
              })
              //<Playlist pl={appState.playlists[0]} />
              :
              <p>No playlists</p>
            }
          </div>
        </div>
        :
        <button><a href='http://localhost:8888'> Login to Spotify </a></button>
      }
    </div>
  )
}

export default PlaylistPage;
