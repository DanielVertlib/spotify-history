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
  const { loading, token } = useAppSelector(state => state.application)

  if(loading) {
    return <div>Loading</div>
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
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
