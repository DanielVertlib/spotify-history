import React from 'react'

import './index.scss'

const clientId = 'f6fb11fc92c64dc491d0bd2b5473ae12'
const devClientId = '42ecfc3241f14737acdf404cb8808cbb'
const authEndpoint = 'https://accounts.spotify.com/authorize'
const redirectUri = 'http://localhost:3000'
const scopes = [
  'user-top-read',
  'user-read-private',
  'user-read-recently-played',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'playlist-modify-public'
]

const LoginPage = () => {
  let login = () => {
    const authLink = `${authEndpoint}?client_id=${devClientId}&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`
    window.location.replace(authLink)
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url('assets/login.jpg')` }}>
      {/* <div  /> */}
      <div className="login-page__button" onClick={login}>
        <span className="login-page__text">Sign In With Spotify</span>
      </div>
    </div>
  );
}

export default LoginPage