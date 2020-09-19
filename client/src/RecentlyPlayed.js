import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Playlist from './Playlist';
import {sortGenres, propToArr} from './analyzeData';

function RecentlyPlayed(props) {
  const [appState, setAppState] = useState({
    songs: {}
  });

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.token);

  const getTracks = () => {
    spotifyApi.getMyTopTracks()
      .then((response) => {
        console.log(response);
        setAppState({});
      })
  }

  useEffect(() => {
    getTracks();
    //setAppState({genres: appState.genres});
  }, [setAppState]);

  return (
    <div>
      <button onClick={getTracks}>
        get tracks
      </button>
    </div>
  )
}

export default RecentlyPlayed;
