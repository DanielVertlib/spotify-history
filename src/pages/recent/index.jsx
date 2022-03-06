import React from 'react'
import { connect } from 'react-redux'

import Sidebar from 'containers/sidebar'
import Card from 'components/card'

import moment from 'moment'

import './index.scss'
import { getActiveElement } from '@testing-library/user-event/dist/utils'

const RecentPage = ({ recent }) => {
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
  console.log(recent)
  return (
    <div className="authenticated-page">
      <Sidebar />
      <div className="recent-page">
        <div className="recent-header">
          <img className="recent-image" src="/recent-music.jpg" />
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
        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  recent: state.application.recent
}))(RecentPage)
