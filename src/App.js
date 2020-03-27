import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

export const authEndpoint = 'https://accounts.spotify.com/authorize'

// App's client ID, redirect URI and desired scopes
const clientId = 'f6fb11fc92c64dc491d0bd2b5473ae12'
const redirectUri = 'http://localhost:3000'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      token: null
    }
  }

  componentDidMount() {
    // Set token
    const hash = window.location.hash
    if(hash) {
      console.log(hash)
      const params = {}
      window.location.hash
        .substring(1)
        .split('&')
        .forEach(param => {
          const item = param.split('=')
          params[item[0]] = decodeURIComponent(item[1])
        })

      this.setState({ token: params })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        </header>
      </div>
    )
  }
}

export default App
