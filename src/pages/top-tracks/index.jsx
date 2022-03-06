import React from 'react'
import { connect } from 'react-redux'

import Sidebar from 'containers/sidebar'
import Card from 'components/card'

import './index.scss'

const TopTracksPage = ({ tracks }) => {
  const getAlbumCover = (album) => {
    const cover = album.images.find(image => image.url).url
    return cover
  } 

  const getArtists = (artists) => {
    const artistNames = []
    artists.forEach(artist => {
      artistNames.push(artist.name)
    })
    return artistNames.join(', ')
  }
  return (
    <div className="authenticated-page">
      <Sidebar />
      <div className="tracks-page">
        <div className="tracks-header">
          <img className="tracks-image" src="/top-tracks.jpg" />
          <span className="tracks-header__text">Top Tracks</span>
        </div>
        <div className="list">
          {tracks.map((track, index) =>
            <Card
              key={`track-card-${index}`}
              index={index + 1}
              image={getAlbumCover(track.album)}
              title={track.name}
              subtitle={getArtists(track.artists)}
              href={track.uri} />
          )}
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  tracks: state.application.tracks
}))(TopTracksPage)
