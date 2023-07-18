import React, {useEffect, useState} from 'react';
import './App.scss';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistPage from './PlaylistPage';
import Window from './Window';
import Div100vh from 'react-div-100vh';
import cd from './cd.gif';

function App() {
  const [appState, setAppState] = useState({
    loggedIn: false,
    token: '',
    id: ''
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

  const notePadOptions = ['file', 'edit', 'format', 'view', 'help'];
  const internetOptions = ['file','edit','view','favorites','help'];

  return (
    <div className='App'>
      <Div100vh>
        {appState.loggedIn ?
          <div className="wrapper">
            <PlaylistPage 
              token={appState.token} 
              id={appState.id} 
              logOut={logOut} 
              notePadOptions={notePadOptions}
            />
          </div>
          :
          <div className="wrapper">
              <Window 
                id="login" 
                title="Internet Explorer" 
                options={internetOptions} 
                addressBar={true} 
                bottomBar={true} 
              >            
                <img src={cd} />
                <h1>Playlist Genre Analyzer</h1>
                <div className="start-descrip">
                  <p>Made by <a href="https://linktr.ee/claireyw">Claire Wang</a></p>
                  <div className="button-wrapper"><div className="button"><a href="/login"> Connect Spotify </a></div></div>
                </div>
              </Window>
          </div>
        }
      </Div100vh>
    </div>
  )
}

export default App;
