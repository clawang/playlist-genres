import React, {useEffect, useState} from 'react';
import './App.scss';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistPage from './PlaylistPage';
import SummaryPage from './SummaryPage';
import Div100vh from 'react-div-100vh';

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
          {<SummaryPage token={appState.token} />}
          {/*<PlaylistPage token={appState.token} />*/}
        </div>
        :
        <Div100vh>
          <div className="start-screen">
            <div>
              <div className="heading-1"><h1>Ready for your</h1></div>
              <div className="heading-2"><h1>Quarantine Wrapped?</h1></div>
              <div className="start-descrip">
                <h3 className="green">Relive and discover the artists and music that have gotten you through.</h3>
                <button><a href='/login'> Login to Spotify </a></button>
              </div>
              <p className="disclaimer">* NOT affiliated with Spotify</p>
            </div>
          </div>
        </Div100vh>
      }
    </div>
  )
}

export default App;
