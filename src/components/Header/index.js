import React from 'react'
import './index.css'
import { withRouter } from 'react-router-dom'


function Header ({ title, subtitle, history, currentUserData }) {
  return (
    <header>
      <div className="text-container">
        <div className="title-container" onClick={() => history.push('/')}>
          <h1>{title}</h1>
          <img id="logo" src="./images/logo.png" alt="main-logo"/>
        </div>
        <span id="subtitle">{subtitle}</span>
      </div>
    </header>
  )
}

export default withRouter(Header)
