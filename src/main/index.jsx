import React, { useEffect } from 'react'

import * as ApplicationActions from 'actions/application'

import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import LoginPage from 'pages/login'
import RecentPage from 'pages/recent'
import TopArtistsPage from 'pages/top-artists'
import TopTracksPage from 'pages/top-tracks'


import './index.scss'

// App's client ID, redirect URI and desired scopes



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
  }, [dispatch, token])

  return (
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
  )
}


export default connect(state => ({
  token: state.application.token
}))(App)
