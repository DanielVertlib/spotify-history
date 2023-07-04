import React from 'react';

import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar, faHeart, faClock } from '@fortawesome/free-solid-svg-icons'

import './index.scss'

const sidebarItems = [
  {
    name: 'artists',
    icon: faStar,
    text: 'Top Artists',
    path: '/top-artists'
  },
  {
    name: 'tracks',
    icon: faHeart,
    text: 'Top Tracks',
    path: '/top-tracks'
  },
  {
    name: 'recent',
    icon: faClock,
    text: 'Recent',
    path: '/recent'
  }
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="sidebar">
      <img className="sidebar-logo" src="logo.png" alt="" />
      {sidebarItems.map((item, index) =>
        <Link to={item.path} key={`sidebar-item-${index}`}
          className={`sidebar-item ${location.pathname === item.path ? 'is-selected' : ''}`}>
          <FontAwesomeIcon className="sidebar-item__icon" icon={item.icon as IconProp} />
          <div className="sidebar-item__text">
            {item.text}
          </div>
        </Link>
      )}
    </div>
    )
  }

export default Sidebar