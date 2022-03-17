import React from 'react'
import { connect } from 'react-redux'

import Sidebar from 'containers/sidebar'
import PlaylistFooter from 'containers/playlist-footer'
import Card from 'components/card'

import * as ApplicationActions from 'actions/application'

import './index.scss'

const TopArtistsPage = ({ artists, dispatch }) => {
  const getAlbumCover = (artist) => {
    const cover = artist.images.find(image => image.url).url
    return cover
  } 

  const getGenres = (artist) => {
    const genres = artist.genres.slice(0, 5)
    return genres.join(', ')
  }
  const getTopArtistsUris = () => {
    dispatch(ApplicationActions.getArtistsSongsUris('Top 20 Artists Playlist'))
    // dispatch(ApplicationActions.createPlaylist('Top 50 Most Played Tracks', []))
  }
  console.log(artists)
  return (
    <div className="authenticated-page">
      <Sidebar />
      <div className="artists-page">
        <div className="artists-header">
          <img className="artists-image" src="assets/top-artists.jpg" alt="" />
          <span className="artists-header__text">Top Artists</span>
        </div>
        {/* <div className="artists-page__divider" /> */}
        <div className="list">
          {artists.map((artist, index) =>
            <Card
              key={`artist-card-${index}`}
              index={index + 1}
              image={getAlbumCover(artist)}
              title={artist.name}
              subtitle={getGenres(artist)}
              href={artist.uri} />
          )}
          <PlaylistFooter
            title="Create Top Artists playlist"
            subtitle="This creates a playlist from your top 20 artists with the top 5 tracks of each artist"
            onClick={() => getTopArtistsUris()} />
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  artists: state.application.artists
}))(TopArtistsPage)
