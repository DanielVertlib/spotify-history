import * as constants from 'constants/spotify-constants'

const initialState = {
  artists: [],
  tracks: [],
  recent: [],
  token: null,
  user: null,
  loading: true
}

export default function application(state = initialState, action : any) {
  switch (action.type) {

    case constants.SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
        loading: false
      })
    case constants.SET_LOADING:
      return Object.assign({}, state, {
        loading: false
      })
    case constants.GET_USER:
      return Object.assign({}, state, {
        user: action.user
      })

    case constants.SET_TOP_ARTISTS:
      return Object.assign({}, state, {
        artists: action.artists
      })

    case constants.SET_TOP_TRACKS:
      return Object.assign({}, state, {
        tracks: action.tracks
      })
    
    case constants.SET_RECENT_TRACKS:
      return Object.assign({}, state, {
        recent: action.recent
      })

    default:
      return state

  }
}