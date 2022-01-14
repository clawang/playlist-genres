import React, {useEffect, useState} from 'react';
import './App.scss';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistPage from './PlaylistPage';
import Div100vh from 'react-div-100vh';
import cd from './cd.gif';

function App() {
  const [appState, setAppState] = useState({
    loggedIn: false,
    token: '',
    id: ''
  });
  const [creditsOpen, setOpen] = useState(false);

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

  const logOut = () => {
    setAppState({...appState, loggedIn: false});
  }

  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    setAppState({loggedIn: token ? true : false, token: token, id: params.id});
  }, [setAppState]);

  return (
    <div className='App'>
      {appState.loggedIn ?
        <div className="wrapper">
          <PlaylistPage token={appState.token} id={appState.id} logOut={logOut} />
        </div>
        :
        <div className="wrapper">
          {creditsOpen ? 
            <div className="main-window" id="credits">
              <div className="window-title-bar">
                <p>Note Pad</p>
                <p className="close" onClick={() => setOpen(false)}>X</p>
              </div>
              <div className="inner-window">
                <div className="window-nav-bar">
                  <ul>
                    <li>file</li>
                    <li>edit</li>
                    <li>format</li>
                    <li>view</li>
                    <li>help</li>
                  </ul>
                </div>
                <div className="content-window">
                  <h3 style={{cursor: 'pointer'}} onClick={() => setOpen(false)}>&lt;&lt; Go back</h3>
                  <p><a href="https://clawang.github.io/">Made by Claire Wang</a></p>
                  <p><a href="https://open.spotify.com/user/1241364699?si=5278203f6e2942e6">Follow me on Spotify!</a></p>
                </div>
              </div>
            </div>
          :
            <div className="main-window" id="login">
              <div className="window-title-bar">
                <p>Internet Explorer</p>
                <p className="close">X</p>
              </div>
              <div className="inner-window">
                <div className="window-nav-bar">
                  <ul>
                    <li>file</li>
                    <li>edit</li>
                    <li>view</li>
                    <li>favorites</li>
                    <li>help</li>
                  </ul>
                </div>
                <div className="address-bar">
                  <p>Address:</p>
                  <div className="url">https://genre-analyzer.herokuapp.com/</div>
                  <p>Links</p>
                </div>
                <div className="content-window">
                  <img src={cd} />
                  <h1>Playlist Genre Analyzer</h1>
                  <div className="start-descrip">
                    <div className="button-wrapper"><div className="button"><a href="http://localhost:8888/login"> Connect Spotify </a></div></div>
                  </div>
                </div>
              </div>
              <div className="bottom-bar">
                <p id="credits-link" onClick={() => setOpen(true)}>Credits</p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default App;
