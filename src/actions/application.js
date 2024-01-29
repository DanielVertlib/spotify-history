import * as constants from 'constants/spotify-constants'

export function setToken(token) {
  return (dispatch) => {
    dispatch({ type: constants.SET_TOKEN, token })
  }
}

export function init(token) {
  return (dispatch) => {
    const fetchSettings = {
      method: 'GET',
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${token}` }
    }

    Promise.all([
      dispatch(getUser(fetchSettings)),
      dispatch(getTopArtists(fetchSettings)),
      dispatch(getTopTracks(fetchSettings)),
      dispatch(getRecentTracks(fetchSettings))
    ]).then(() => {
      dispatch({ type: constants.SET_LOADED })
    })
  }
}

function getUser(fetchSettings) {
  return dispatch => {
    fetch(`https://api.spotify.com/v1/me`, fetchSettings)
    .then(res => res.json())
    .then(
      (result) => {
        dispatch({
          type: constants.GET_USER,
          user: result
        })
      },
      (error) => {
        console.log('ERROR = ', error)
      }
    )
  }
}

function getTopArtists(fetchSettings, limit = 50, timeRange = 'long_term') {
  return dispatch => {
    fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`, fetchSettings)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({
            type: constants.SET_TOP_ARTISTS,
            artists: result.items
          })
        },
        (error) => {
          console.log('ERROR = ', error)
        }
      )
  }
}

export function getArtistsSongsUris(name) {
  let artistUris = []
  return (dispatch, state) => {
    const { artists, user, token } = state().application
    const getReq = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    }

    const artistsObject = Object.assign([], artists)
    
    artistsObject.splice(0, 20).forEach((artist, index) => {
      fetch(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=${user.country}`, getReq)
      .then(res => res.json())
      .then(
        (result) => {
          const uris = result.tracks.splice(0, 5).map(track => track.uri)
          artistUris = artistUris.concat(uris)
        },
        (error) => {
          console.log('ERROR = ', error)
        }
      )
      .then(() => {
        if(index === 19) dispatch(createPlaylist(name, artistUris))
      })
    })
  }
}


function getTopTracks(fetchSettings, limit = 50, timeRange = 'long_term') {
  return dispatch => {
    fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`, fetchSettings)
    .then(res => res.json())
    .then(
      (result) => {
        dispatch({
          type: constants.SET_TOP_TRACKS,
          tracks: result.items
        })
      },
      (error) => {
        console.log('ERROR = ', error)
      }
    )
  }
}

function getRecentTracks(fetchSettings, limit = 50) {
  return dispatch => {
    fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, fetchSettings)
    .then(res => res.json())
    .then(
      (result) => {
        dispatch({
          type: constants.SET_RECENT_TRACKS,
          recent: result.items
        })
      },
      (error) => {
        console.log('ERROR = ', error)
      }
    )
  }
}

export function createPlaylist(name, songURIs) {
  return (dispatch, state) => {
    const { user, token } = state().application
    const postReq = {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        name,
        description: `${name} created from spotify songs app`,
        public: false
      })
    }
    fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, postReq)
    .then(res => res.json())
    .then(
      (result) => {
        dispatch(addSongsToPlaylist(result.id, songURIs))
      },
      (error) => {
        console.log('ERROR = ', error)
      }
    )
  }
}

export function addSongsToPlaylist(playlistId, songURIs) {
  return (dispatch, state) => {
    const { token } = state().application
    const postReq = {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        uris: songURIs
      })
    }
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, postReq)
    .then(res => res.json())
    .then(
      (result) => {
        console.log('add songs', result)
      },
      (error) => {
        console.log('ERROR = ', error)
      }
    )
  }
}
