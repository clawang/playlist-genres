import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {arrToList} from './analyzeData';

function TopSongs(props) {
  const [appState, setAppState] = useState({
    topSongs: [{}]
  });

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.token);

  const getTracks = () => {
    let options = {time_range: props.timeframe};
    spotifyApi.getMyTopTracks(options)
      .then((response) => {
        setAppState({topSongs: response.items});
        props.updateTracks(response.items);
      })
  }

  useEffect(() => {
    getTracks();
  }, [setAppState]);

  return (
    <div className="top-songs-wrapper">
      {appState.topSongs[0].name ?
        <div className="top-songs">
          <div className="song-art">
            <img src={appState.topSongs[0].album.images[0].url} />
          </div>
          <div className="songs">
            <h2>Your Top Songs</h2>
            <div className="songs-wrapper">
              {appState.topSongs.slice(0,5).map((song, index) => {
                return (
                  <div className="song-wrapper" key={index}>
                    <div className="song-number">
                      <h3>#{index + 1}</h3>
                    </div>
                    <div className="song-details">
                      <h3>"{(song.name.length > 19) ? song.name.substring(0, 19).concat('..') : song.name}"</h3>
                      <p className="pink">{arrToList(song.artists, "name")}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        :
        <p>Loading...</p>
      }
    </div>
  )
}

export default TopSongs;
