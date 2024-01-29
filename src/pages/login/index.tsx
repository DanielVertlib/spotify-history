import React from 'react'

import './index.scss'

const clientId = 'f6fb11fc92c64dc491d0bd2b5473ae12'
const authEndpoint = 'https://accounts.spotify.com/authorize'
// const redirectUri = 'http://spotifyist.netlify.app'
const devRedirectUri = 'http://localhost:3000'
const scopes = [
  'user-top-read',
  'user-read-private',
  'user-read-recently-played',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'playlist-modify-public'
]

const authParams = {
  client_id : clientId,
  scope: scopes.join('%20'),
  redirect_uri: devRedirectUri,
  response_type: 'token',
  show_dialog: 'true'
}

// build auth link from params object
const buildAuthLink = () => {
  const authLink = Object.entries(authParams).map(([key, value]) => `${key}=${value}`).join('&')
  return authLink
}

const LoginPage = () => {
  let login = () => {
    const authLink = `${authEndpoint}?${buildAuthLink()}`
    window.location.replace(authLink)
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url('assets/login.jpg')` }}>
      <div className="login-page__button" onClick={login}>
        <span className="login-page__text">Sign In With Spotify</span>
      </div>
    </div>
  );
}

export default LoginPage