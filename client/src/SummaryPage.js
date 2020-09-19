import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import TopArtists from './TopArtists';
import TopSongs from './TopSongs';
import TopGenres from './TopGenres';
import {arrToList, propToArr} from './analyzeData';

function SummaryPage(props) {
  const [appState, setAppState] = useState({
    timeframe: 0
  });

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.token);

  const ranges = {
    1: 'short_term',
    2: 'medium_term',
    3: 'long_term'
  };

  useEffect(() => {
    setAppState({timeframe:0});
  }, [setAppState]);

  return (
    <div>
      {(appState.timeframe === 0) ?
        <div className="options">
          <div onClick={() => setAppState({timeframe:1})}><h2>4 Weeks</h2></div>
          <div onClick={() => setAppState({timeframe:2})}><h2>6 months</h2></div>
          <div onClick={() => setAppState({timeframe:3})}><h2>All Time</h2></div>
        </div>
        :
        <div className="summary">
          <TopArtists token={props.token} timeframe={ranges[appState.timeframe]} />
          <TopSongs token={props.token} timeframe={ranges[appState.timeframe]} />
          <TopGenres token={props.token} timeframe={ranges[appState.timeframe]} />
        </div>
      }
    </div>
  )
}

export default SummaryPage;
