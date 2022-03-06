import React, { Component } from 'react'
import Menu from 'containers/menu'
import { connect } from 'react-redux'
import './index.scss'

const pages = [
  {
    id: 'artists',
    display: 'Top Artists'
  },
  {
    id: 'tracks',
    display: 'Top Tracks'
  },
  {
    id: 'recent',
    display: 'Recent'
  }
]

class MainPage extends Component {

  constructor() {
    super()

    this.state = {
      currentPage: 'artists'
    }

    this.onPageChange = this.onPageChange.bind(this)
  }

  onPageChange(page) {
    this.setState({ currentPage: page })
  }

  render() {
    const { artists, tracks, recent } = this.props
    console.log('test', this.state.currentPage, artists, tracks, recent)
    return (
      <div className="main__page">
        <Menu pages={pages} currentPage={this.state.currentPage} onPageChange={this.onPageChange} />
      </div>
    )
  }
}

export default connect(state => ({
  artists: state.application.artists,
  tracks: state.application.tracks,
  recent: state.application.recent
}))(MainPage)
