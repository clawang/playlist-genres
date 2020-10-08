import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {arrToList} from './analyzeData';

function TopSongs(props) {
  const [appState, setAppState] = useState({
    topSongs: [{}]
  });

  const [songDetails, setSong] = useState({
    name: '',
    artists: [{}],
    number: 0
  });

  const [mobile, setMobile] = useState(false);

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

  const handleHover = (n, a, i) => {
    setSong({name: n, artists: a, number: i});
  }

  useEffect(() => {
    getTracks();
    if(window.outerWidth < 800) {
      setMobile(true);
    }
  }, [setAppState]);

  window.addEventListener('resize', () => {
    if(window.outerWidth < 800) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  });

  return (
    <div className="top-songs-wrapper">
      {appState.topSongs[0].name ?
        <div className="top-songs">
          <div className="songs-header">
            <div className="songs-header-wrapper">
              <h2>You loved these songs the most.</h2>
            </div>
            </div>
            <div className="songs-text-wrapper">
            { (mobile) ?
              appState.topSongs.slice(0, 5).map((song, index) => {
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
                )
              })
              :
              <p></p>
            }
            </div>
            <div className="songs-wrapper">
              <div className="songs-3d">
              {appState.topSongs.slice(0,mobile ? 5 : 10).map((song, index) => {
                return (
                  <SongCover src={song.album.images[0].url} index={index} key={index} handleHover={() => handleHover(song.name, song.artists, index)} handleMouseLeave={() => handleHover('', [{}], 0)}/>
                );
              })}
            </div>
          </div>
          <div className="featured-song-container">
          {songDetails.name ?
            <div className="featured-song">
              <h3 className="featured-song-number">{songDetails.number + 1}</h3>
              <h3>{(songDetails.name.length > 24) ? songDetails.name.substring(0, 24).concat('..') : songDetails.name}</h3>
              <p>{arrToList(songDetails.artists, 'name')}</p>
            </div>
            :
            <p></p>
          }
          </div>
        </div>
        :
        <p>Loading...</p>
      }
    </div>
  )
}


function SongCover(props) {
  return (
    <div className={"song-cover " + "song-" + props.index} onMouseOver={props.handleHover} onMouseLeave={props.handleMouseLeave}>
      <img src={props.src} />
    </div>
  );
}

export default TopSongs;
