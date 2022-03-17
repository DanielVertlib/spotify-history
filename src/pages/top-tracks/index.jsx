import React from 'react'
import { connect } from 'react-redux'

import Sidebar from 'containers/sidebar'
import PlaylistFooter from 'containers/playlist-footer'
import Card from 'components/card'

import * as ApplicationActions from 'actions/application'

import './index.scss'

const TopTracksPage = ({ tracks, dispatch }) => {
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

  const uris = tracks.map(track => track.uri)

  return (
    <div className="authenticated-page">
      <Sidebar />
      <div className="tracks-page">
        <div className="tracks-header">
          <img className="tracks-image" src="assets/top-tracks.jpg" alt="" />
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
          <PlaylistFooter
            title="Create Most Played Tracks playlist"
            subtitle="This will create a playlist with your 50 most played tracks"
            onClick={() =>
              dispatch(ApplicationActions.createPlaylist('Top 50 Most Played Tracks', uris))} />
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  tracks: state.application.tracks
}))(TopTracksPage)
