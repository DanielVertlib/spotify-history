import React from 'react'

import { useAppDispatch, useAppSelector } from 'hooks'

import Sidebar from 'containers/sidebar'
import PlaylistFooter from 'containers/playlist-footer'
import Card from 'components/card'

import { getArtistsSongsUris } from 'actions/application'

import './index.scss'

interface Image {
  url: string
}

interface Artist {
  name: string
  images: Image[],
  genres: string[],
  uri: string
}

const TopArtistsPage = () => {
  const dispatch = useAppDispatch()

  const getAlbumCover = (artist : Artist) => {
    const cover = artist.images.find(image => image.url)

    if(cover) return cover.url

    return ''
  } 

  const getGenres = (artist : Artist) => {
    const genres = artist.genres.slice(0, 5)
    return genres.join(', ')
  }

  const getTopArtistsUris = () => {
    dispatch(getArtistsSongsUris('Top 20 Artists Playlist'))
  }

  const artists : Artist[] = useAppSelector((state) => state.application.artists)

  return (
    <div className="authenticated-page">
      <Sidebar />
      <div className="artists-page">
        <div className="artists-header">
          <img className="artists-image" src="assets/top-artists.jpg" alt="" />
          <span className="artists-header__text">Top Artists</span>
        </div>

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

export default TopArtistsPage
