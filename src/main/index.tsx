import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'hooks'

// Import Actions
import * as ApplicationActions from 'actions/application'

// Import React, Redux Packages
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

// Import Pages
import LoginPage from 'pages/login'
import RecentPage from 'pages/recent'
import TopArtistsPage from 'pages/top-artists'
import TopTracksPage from 'pages/top-tracks'

// Import SCSS
import './index.scss'

interface Hash {
  [index: string] : string
}

interface PrivateProps {
  path: string,
  children?: React.ReactNode
}

const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial : Hash, param) => {
    if(param) {
      const item = param.split('=')
      initial[item[0]] = decodeURIComponent(item[1])
    }
    return initial
  }, {})

window.location.hash = ''

const PrivateRoute = ({ children, ...rest } : PrivateProps) => {
  const { token } = useAppSelector(state => state.application)
  const localToken = JSON.parse(localStorage.getItem('token') || 'null')

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token || localToken ? (
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

const App = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.application.token)

  useEffect(() => {
    // Get token from hash and parse local storage token
    const hashToken = hash.access_token
    const localToken = JSON.parse(localStorage.getItem('token') || 'null')

    // If token doesnt exist in global state, set it
    if(!token) {
      const tokenType = hashToken ? hashToken : localToken

      // Set token in global state and initialize spotify api data
      dispatch(ApplicationActions.setToken(tokenType))
      dispatch(ApplicationActions.init(tokenType))

      // Set token in local storage if it doesnt exist
      if(!localToken || localToken === null) {
        localStorage.setItem('token', JSON.stringify(tokenType))
      }
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
        <PrivateRoute path="/top-artists">
          <TopArtistsPage />
        </PrivateRoute>
        <PrivateRoute path="/top-tracks">
          <TopTracksPage />
        </PrivateRoute>
        <PrivateRoute path="/recent">
          <RecentPage />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}


export default App
