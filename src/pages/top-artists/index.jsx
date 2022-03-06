import React from 'react'
import { connect } from 'react-redux'

import Sidebar from 'containers/sidebar'
import Card from 'components/card'

import './index.scss'

const TopArtistsPage = ({ artists }) => {
  const getAlbumCover = (artist) => {
    const cover = artist.images.find(image => image.url).url
    return cover
  } 

  const getGenres = (artist) => {
    const genres = artist.genres.slice(0, 5)
    return genres.join(', ')
  }
  console.log(artists)
  return (
    <div className="authenticated-page">
      <Sidebar />
      <div className="artists-page">
        <div className="artists-header">
          <img className="artists-image" src="/top-artists.jpg" />
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
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  artists: state.application.artists
}))(TopArtistsPage)
