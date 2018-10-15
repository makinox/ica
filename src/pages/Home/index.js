import React, { Component } from 'react'
import './index.css'
import ActionButton from '../../components/ActionButton'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div id="main-container">
        <header>
          <div className="text-container">
            <div className="title-container">
              <h1>ICA</h1>
              <img id="logo" src="./images/logo.png"/>
            </div>
            <span id="subtitle">Implementación de comparendos ambientales</span>
          </div>
        </header>
        <section>
          <div id="buttons-view">
            <div className="buttons-title-container">
              <img id="buttons-view-logo" src="./images/touch.png"/>
              <span id="buttons-view-title">Selecciona tu tipo de usuario</span>
            </div>
            <div className="buttons-view-container">
            <ActionButton text="GRUPO ECOLOGICO"/>
            <ActionButton text="DIRECTIVOS"/>
            <ActionButton text="ESTUDIANTES"/>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
