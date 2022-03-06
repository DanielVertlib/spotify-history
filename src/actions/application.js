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

    dispatch(getUser(fetchSettings))
    dispatch(getTopArtists(fetchSettings))
    dispatch(getTopTracks(fetchSettings))
    dispatch(getRecentTracks(fetchSettings))
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
          userId: result.id
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
