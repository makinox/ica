import React from 'react'
import './index.css'

function Header ({ title, subtitle }) {
  return (
    <header>
      <div className="text-container">
        <div className="title-container">
          <h1>{title}</h1>
          <img id="logo" src="./images/logo.png" alt="main-logo"/>
        </div>
        <span id="subtitle">{subtitle}</span>
      </div>
    </header>
  )
}

export default Header
