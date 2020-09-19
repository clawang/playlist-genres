import React, {useEffect, useState} from 'react';
import './App.scss';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistPage from './PlaylistPage';
import SummaryPage from './SummaryPage';

function App() {
  const [appState, setAppState] = useState({
    loggedIn: false,
    token: ''
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

  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    setAppState({loggedIn: token ? true : false, token: token});
  }, [setAppState]);

  return (
    <div className='App'>
      {appState.loggedIn ?
        <div>
          <SummaryPage token={appState.token} />
          <PlaylistPage token={appState.token} />
        </div>
        :
        <button><a href='http://localhost:8888'> Login to Spotify </a></button>
      }
    </div>
  )
}

export default App;
