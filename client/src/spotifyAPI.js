import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';


const spotifyApi = new SpotifyWebApi();
spotifyApi.getMyRecentlyPlayedTracks()

