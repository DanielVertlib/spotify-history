import React from 'react'

import './index.scss'

const PlaylistFooter = ({ title, subtitle, onClick }) => {
  return (
    <div className="playlist-footer">
      <div className="playlist-text">
        <div className="playlist-title">{title}</div>
        <div className="playlist-subtitle">{subtitle}</div>
      </div>
      <div className="playlist-button" onClick={() => onClick()}>
        <span className="playlist-button__text">Create Playlist</span>
      </div>
    </div>
    )
  }

export default PlaylistFooter