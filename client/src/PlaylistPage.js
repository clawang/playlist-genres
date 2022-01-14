import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Playlist from './Playlist';
import {sortGenres, propToArr} from './analyzeData';
import file from './file.png';
import folder from './folder.png';
import Window from './Window';

function PlaylistPage(props) {
  const [appState, setAppState] = useState({
    playlists: [{}],
    genres: {}
  });
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(-1);

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.token);

  const getPlaylists = () => {
    spotifyApi.getUserPlaylists(props.id, {limit: 50})
      .then((response) => {
        console.log(response.items);
        setAppState({playlists: response.items, genres: appState.genres});
      })
  }

  useEffect(() => {
    getPlaylists();
  }, [setAppState]);

  useEffect(() => {
    setLoading(false);
  }, [appState.playlists]);

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

  const fileManagerOptions = ['file', 'disk', 'tree', 'view', 'options'];

  return (
    <div className="genres-wrapper">
      {/*<div className="genres">
        <h2>Your Top Genres:</h2>
        <div className="genre-level-wrapper">
          {strGenres(appState.genres)}
        </div>
      </div>*/}
      <Window 
        id="playlists" 
        title="File Manager" 
        closeFunction={props.logOut} 
        options={fileManagerOptions} 
        bottomBar={true} 
        bottomBarContent={"Total "+ appState.playlists.length + " file(s)"}
      >
        <div className="folder-wrapper">
          <img src={folder} />
          <p className="playlist-name">my playlists</p>
        </div>
        <div className="folder-indent">
          {
            appState.playlists.map((pl, i) => {
              return (
                <div className="folder-wrapper" key={i}>
                  <div className="folder-line"></div>
                  <div className={"folder-placeholder "+(i === featured ? "selected" : "")}>
                    <img src={file} />
                    <p key={i} onClick={() => setFeatured(i)} className="playlist-name">{pl.name}</p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </Window>
      <div className="popup-wrapper">
        {
          featured >= 0 ?
            <Window 
              id="featured" 
              title="Note Pad" 
              options={props.notePadOptions} 
              closeFunction={() => setFeatured(-1)} 
              bottomBar={false}
            >
              <Playlist 
                pl={appState.playlists[featured]} 
                allGenres={appState.genres} 
                setGenres={setGenres} 
                setFeatured={setFeatured}
              />
            </Window>
          :
            <div></div>
        }
      </div>
    </div>
  )
}

export default PlaylistPage;
