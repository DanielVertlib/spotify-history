import React from 'react'

import { useAppDispatch, useAppSelector } from 'hooks'

import Sidebar from 'containers/sidebar'
import PlaylistFooter from 'containers/playlist-footer'
import Card from 'components/card'

import * as ApplicationActions from 'actions/application'

import moment from 'moment'

import './index.scss'

interface Image {
  url: string
}

interface Album {
  images: Image[]
}

interface Artist {
  name: string
}

interface Track {
  uri: string,
  name: string,
  artists: Artist[],
  album: Album
}

interface Recent {
  track: Track,
  played_at: string,
}

const RecentPage = () => {
  const getAlbumCover = (track : Track) => {
    const cover = track.album.images.find(image => image.url)

    if(cover) return cover.url

    return ''
  } 

  const getArtists = (artists : Artist[]) => {
    const artistNames: string[] = []
    artists.forEach(artist => {
      artistNames.push(artist.name)
    })
    return artistNames.join(', ')
  }

  const getTimePlayed = (time : string) => {
    return moment.utc(time).format("ddd hh:mm A")
  }

  const dispatch = useAppDispatch()
  const recent : Recent[] = useAppSelector((state) => state.application.recent)
  
  const uris = recent.map(recent => recent.track.uri)
  return (
    <div className="authenticated-page">
      <Sidebar />
      <div className="recent-page">
        <div className="recent-header">
          <img className="recent-image" src="assets/recent-music.jpg" alt="" />
          <span className="recent-header__text">Recently Played</span>
        </div>

        <div className="list">
          {recent.map((recent, index) =>
            <Card
              key={`recent-card-${index}`}
              image={getAlbumCover(recent.track)}
              title={recent.track.name}
              subtitle={getArtists(recent.track.artists)}
              time={getTimePlayed(recent.played_at)}
              href={recent.track.uri} />
          )}
          <PlaylistFooter
            title="Create Recently Played playlist"
            subtitle="This will create a playlist with your 50 recently played tracks"
            onClick={() =>
              dispatch(ApplicationActions.createPlaylist('50 recently played tracks', uris))} />
        </div>
      </div>
    </div>
  )
}

export default RecentPage
