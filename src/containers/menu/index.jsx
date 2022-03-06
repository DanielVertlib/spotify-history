import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.scss'

class Menu extends Component {

  render() {
    return (
      <div className="menu__container">
        Menu
        {this.props.pages.map((p, index) =>
          <div
            key={`${p.id}+${index}`}
            className="menu__item"
            onClick={() => this.props.onPageChange(p)}>
              {p.display}
          </div>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  artists: state.application.artists,
  tracks: state.application.tracks,
  recent: state.application.recent
}))(Menu)
