import React from 'react'

import './index.scss'

interface Props {
  index?: number,
  title: string,
  subtitle: string,
  image: string,
  time?: string,
  href: string
}

const Card = (props: Props) => {
  const { index, image, title, subtitle, time, href } = props

  return (
    <a className="card" href={href}>
      {index && <span className="card-index">{index}</span>}
      <img className="card-image" src={image} alt="" />
      <div className="card-info">
        <div className="card-title">{title}</div>
        <div className="card-subtitle" title={subtitle}>{subtitle}</div>
      </div>
      {time && <div className="card-time">{time}</div>}
    </a>
  )
}

export default Card