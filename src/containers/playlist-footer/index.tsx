import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import './index.scss'

interface Props {
  title: string,
  subtitle: string,
  onClick: () => void
}

const PlaylistFooter = ({ title, subtitle, onClick } : Props) => {
  return (
    <div className="playlist-footer">
      <div className="playlist-text">
        <div className="playlist-title">{title}</div>
        <div className="playlist-subtitle">{subtitle}</div>
      </div>
      <div className="playlist-button" onClick={() => onClick()}>
        <FontAwesomeIcon className="playlist-button__icon" icon={faPlus as IconProp} />
        <span className="playlist-button__text">Create</span>
      </div>
    </div>
    )
  }

export default PlaylistFooter