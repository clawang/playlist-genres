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
            {creditsOpen ? 
              <Window 
                id="credits" 
                title="Note Pad" 
                closeFunction={() => setOpen(false)}
                options={notePadOptions}
              >
                <h3 
                  style={{cursor: 'pointer'}} 
                  onClick={() => setOpen(false)}>
                  &lt;&lt; Go back
                </h3>
                <p><a href="https://clawang.github.io/">Made by Claire Wang</a></p>
                <p><a href="https://open.spotify.com/user/1241364699?si=5278203f6e2942e6">Follow me on Spotify!</a></p>
              </Window>
            :
              <Window 
                id="login" 
                title="Internet Explorer" 
                options={internetOptions} 
                addressBar={true} 
                bottomBar={true} 
                bottomBarId="credits-link" 
                bottomBarClick={() => setOpen(true)} 
                bottomBarContent="Credits"
              >            
                <img src={cd} />
                <h1>Playlist Genre Analyzer</h1>
                <div className="start-descrip">
                  <div className="button-wrapper"><div className="button"><a href="/login"> Connect Spotify </a></div></div>
                </div>
              </Window>
            }
          </div>
        }
      </Div100vh>
    </div>
  )
}

export default App;
