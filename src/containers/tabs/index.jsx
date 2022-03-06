import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.scss'

class Menu extends Component {

  constructor(props) {
    super(props)
    
    this.showTopArtists = this.showTopArtists.bind(this)
    this.showTopTracks = this.showTopTracks.bind(this)
    this.showRecentTracks = this.showRecentTracks.bind(this)
  }

  showTopArtists() {
    console.log('top artists ', this.props.artists)
  }

  showTopTracks() {
    console.log('top tracks ', this.props.tracks)
  }

  showRecentTracks() {
    console.log('recent tracks ', this.props.recent)
  }

  render() {
    return (
      <div className="tab__container">
        Menu
        <div className="tab__item" onClick={this.showTopArtists}>All time</div>
        <div className="tab__item" onClick={this.showTopTracks}>Last 6 months</div>
        <div className="tab__item" onClick={this.showRecentTracks}>Last month</div>
      </div>
    )
  }
}

export default connect(state => ({
  artists: state.application.artists,
  tracks: state.application.tracks,
  recent: state.application.recent
}))(Menu)
