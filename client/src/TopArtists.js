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
        setAppState({topSongs: appState.topSongs, topArtists: response.items});
        props.updateArtists(response.items);
      })
  }

  useEffect(() => {
    getArtists();
  }, [setAppState]);

  const resizeImgs = () => {
    document.querySelectorAll('.img3, .img2, .img1').forEach(img => {
      console.log(img);
      let w = img.clientWidth;
      img.style.height = w + 'px';
    });
  }

  window.addEventListener('load', function() {
    resizeImgs();
  });

  window.addEventListener('resize', () => {
    resizeImgs();
  });

  return (
    <div className="top-artists-wrapper">
      {appState.topArtists[0].name ?
        <div className="top-artists">
          <h1>Top Artists</h1>
          <div className="artists-wrapper">
          {appState.topArtists.slice(0,3).map((artist, index) => {
            return(
              <div className="artist-wrapper" key={index}>
                <div className="artist-images">
                  <img src={artist.images[0].url} className="img1" />
                  <img src={artist.images[0].url} className="img2" />                  
                  <img src={artist.images[0].url} className="img3"/>
                </div>
                <div className="artist-desc">
                  <h3 className="black">#{index+1}</h3>
                  <h3 className="green">{artist.name}</h3>
                </div>
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
