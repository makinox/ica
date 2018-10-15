import React, { Component } from 'react'
import './index.css'

import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import SectionCard from '../../components/SectionCard'
import InputField from '../../components/InputField'
import { withRouter } from 'react-router-dom'


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      password: ''
    }
  }

  _handleOnchangeInputValue = (e, type) => {
    switch (type) {
      case 'name':
        this.setState({ name: e.target.value })
      break
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
    const { name, username, password } = this.state
    return (
      <div>
        <Header title="ICA" subtitle="Implementación de comparendos ambientales"/>
        <section>
          <SectionCard
            title="Registrarse"
          >
          <div className="inputs-container">
            <InputField
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => this._handleOnchangeInputValue(e, 'name')}
            />
            <InputField
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => this._handleOnchangeInputValue(e, 'username')}
            />
            <InputField
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => this._handleOnchangeInputValue(e, 'password')}
            />
            <div>
              <input name="checkbox" type="checkbox" />
              <span className="gray-color">Acepto los términos y condiciones</span>
            </div>
            <ActionButton
              text="Registrarse"
              actionToExecute={() => alert('ingresar')}
            />
            <hr />
            <span className="gray-color">¿Ya tienes cuenta? <span onClick={() =>this.props.history.push('/signin')}>Inicia sesión</span></span>
          </div>
          </SectionCard>
        </section>
      </div>
    )
  }
}

export default withRouter(Signup)
