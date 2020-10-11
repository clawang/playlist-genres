import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

function TopArtists(props) {
  const [appState, setAppState] = useState({
    topArtists: [{}]
  });

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(props.token);

  const getArtists = () => {
    let options = {time_range: props.timeframe};
    spotifyApi.getMyTopArtists(options, (err, response) => {
      if(err) {
        props.setError(1);
      } else {
        setAppState({topSongs: appState.topSongs, topArtists: response.items});
        props.updateArtists(response.items);
      }
    });
  }

  useEffect(() => {
    getArtists();
  }, [setAppState]);

  return (
    <div className="top-artists-wrapper">
      {appState.topArtists[0].name ?
        <div className="top-artists">
          <h1>Top Artists</h1>
          <div className="artists-wrapper">
          {appState.topArtists.slice(0,3).map((artist, index) => {
            return(
              <div className="artist-wrapper" key={index}>
                <ArtistImages artist={artist} />
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

function ArtistImages(props) {
  useEffect(() => {
    resizeImgs();
  }, []);

  const resizeImgs = () => {
    document.querySelectorAll('.img3, .img2, .img1').forEach(img => {
      let w = img.clientWidth;
      img.style.height = w + 'px';
    });
  }

  window.addEventListener('resize', () => {
    resizeImgs();
  });

  return (
    <div className="artist-images">
      <img src={props.artist.images[0].url} className="img1" alt={props.artist.name} />
      <img src={props.artist.images[0].url} className="img2" alt={props.artist.name} />                  
      <img src={props.artist.images[0].url} className="img3" alt={props.artist.name} />
    </div>
  )
}

export default TopArtists;
