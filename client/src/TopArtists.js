import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {arrToList} from './analyzeData';

function TopArtists(props) {
  const [appState, setAppState] = useState({
    topArtists: [{}]
  });

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.token);

  const getArtists = () => {
    let options = {time_range: props.timeframe};
    spotifyApi.getMyTopArtists(options)
      .then((response) => {
        console.log(response.items);
        setAppState({topSongs: appState.topSongs, topArtists: response.items});
      })
  }

  useEffect(() => {
    getArtists();
  }, [setAppState]);

  return (
    <div className="top-artists-wrapper">
      {appState.topArtists[0].name ?
        <div className="top-artists">
          <h2>Your Top Artists:</h2>
          <div className="artists-wrapper">
          {appState.topArtists.slice(0,3).map((artist, index) => {
            return(
              <div className="artist-wrapper">
                <div className="artist-images">
                  <img src={artist.images[0].url} className="img1" />
                  <img src={artist.images[0].url} className="img2"/>
                  <img src={artist.images[0].url} className="img3"/>
                </div>
                <h3 className="black">#{index+1}</h3>
                <h3 className="green">{artist.name}</h3>
              </div>
            );
          })}
          </div>
        </div>
        :
        <p>Loading...</p>
      }
    </div>
  )
}

export default TopArtists;
