import React from 'react'
import { connect } from 'react-redux'

import Sidebar from 'containers/sidebar'
import PlaylistFooter from 'containers/playlist-footer'
import Card from 'components/card'

import * as ApplicationActions from 'actions/application'

import moment from 'moment'

import './index.scss'

const RecentPage = ({ recent, dispatch }) => {
  // let history = useHistory();
  // let location = useLocation();
  const getAlbumCover = (track) => {
    const cover = track.album.images.find(image => image.url).url
    return cover
  } 

  const getArtists = (artists) => {
    const artistNames = []
    artists.forEach(artist => {
      artistNames.push(artist.name)
    })
    return artistNames.join(', ')
  }

  const getTimePlayed = (time) => {
    return moment.utc(time).format("ddd hh:mm A")
  }
  
  const uris = recent.map(recent => recent.track.uri)
  return (
    <div className="authenticated-page">
      <Sidebar />
      <div className="recent-page">
        <div className="recent-header">
          <img className="recent-image" src="assets/recent-music.jpg" alt="" />
          <span className="recent-header__text">Recently Played</span>
        </div>
        {/* <div className="recent-page__divider" /> */}
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

export default connect(state => ({
  recent: state.application.recent
}))(RecentPage)
