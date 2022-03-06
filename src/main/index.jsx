import React, { Component, useEffect } from 'react'

import * as ApplicationActions from 'actions/application'

import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import { ProvideAuth, useAuth } from "hooks/use-auth.js";


import Menu from 'containers/menu'
import MainPage from 'pages/main'
import RecentPage from 'pages/recent'
import TopArtistsPage from 'pages/top-artists'
import TopTracksPage from 'pages/top-tracks'
import Sidebar from 'containers/sidebar'


import './index.scss'

export const authEndpoint = 'https://accounts.spotify.com/authorize'

// App's client ID, redirect URI and desired scopes
const clientId = 'f6fb11fc92c64dc491d0bd2b5473ae12'
const redirectUri = 'http://localhost:3000'
const scopes = [
  'user-top-read',
  'user-read-recently-played'
]

const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial, param) => {
    if(param) {
      const item = param.split('=')
      initial[item[0]] = decodeURIComponent(item[1])
    }
    return initial
  }, {})

window.location.hash = ''

const LoginPage = () => {
  let login = () => {
    const authLink = `${authEndpoint}?client_id=${clientId}&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`
    window.location.replace(authLink)
  }

  return (
    <div className="login-page">
      <button onClick={login}>Log in</button>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const App = ({ token, dispatch }) => {
  useEffect(() => {
    let hashToken = hash.access_token
    if(hashToken && !token) {
      dispatch(ApplicationActions.setToken(hashToken))
      dispatch(ApplicationActions.init(hashToken))
    }
  }, [])

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/top-artists" />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/top-artists" token={token}>
            <TopArtistsPage />
          </PrivateRoute>
          <PrivateRoute path="/top-tracks" token={token}>
            <TopTracksPage />
          </PrivateRoute>
          <PrivateRoute path="/recent" token={token}>
            <RecentPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  )
}


export default connect(state => ({
  token: state.application.token
}))(App)
