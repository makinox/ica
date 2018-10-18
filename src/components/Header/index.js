import React from 'react'
import './index.css'
import { withRouter } from 'react-router-dom'

function parseRole (role) {
  switch (role) {
    case 'eco_group':
      return 'Grupo Ecológico'
    case 'directives':
      return 'Directivo'
    default:
      return role
  }
}

function Header ({ title, subtitle, history, currentUserData, logout }) {
  return (
    <header>
      <div className="title-container" onClick={() => null}>
        <div className="inner-container">
          <h1>{title}</h1>
          {/* <img id="logo" src="./images/logo.png" alt="main-logo"/> */}
        </div>
        {
          currentUserData ?
          <div className="user-info">
              <span>{currentUserData.name}</span><br />
              <span>{parseRole(currentUserData.role)}</span>
              <span id="logout" onClick={logout}>Salir</span>
          </div>
          : null
        }
      </div>
      <span id="subtitle">{subtitle}</span>
    </header>
  )
}

export default withRouter(Header)
