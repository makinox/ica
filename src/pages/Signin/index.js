import React, { Component } from 'react'
import './index.css'

import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import SectionCard from '../../components/SectionCard'
import InputField from '../../components/InputField'
import { withRouter } from 'react-router-dom'


class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  _handleOnchangeInputValue = (e, type) => {
    switch (type) {
      case 'username':
        this.setState({ username: e.target.value })
      break;
      case 'password':
        this.setState({ password: e.target.value })
      break
      default:
        return type
    }
  }

  render () {
    const { username, password } = this.state
    return (
      <div>
        <Header title="ICA" subtitle="Implementación de comparendos ambientales"/>
        <section>
          <SectionCard
            title="Ingresar"
          >
          <div className="inputs-container">
            <InputField
              type="text"
              placeholder="Ususario"
              value={username}
              onChange={(e) => this._handleOnchangeInputValue(e, 'username')}
            />
            <InputField
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => this._handleOnchangeInputValue(e, 'password')}
            />
            <ActionButton
              text="INGRESAR"
              actionToExecute={() => alert('ingresar')}
            />
            <hr />
            <span className="gray-color">¿No tienes cuenta? <span onClick={() =>this.props.history.push('/signup')}>Registrate</span></span>
          </div>
          </SectionCard>
        </section>
      </div>
    )
  }
}

export default withRouter(Signin)
