import React, { Component } from 'react'
import './index.css'

import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import SectionCard from '../../components/SectionCard'
import InputField from '../../components/InputField'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentUserData } from '../../redux/actions'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      type: ''
    }
  }

  componentWillMount () {
    const qs = decodeURIComponent(document.location.search)
    if (qs) {
      const type = qs.split('?type=')[1]
      this.setState({ type })
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

  _checkIfAllInputsAreFilled = () =>  {
    const { username, password } = this.state
    return username && password ? false : true
  }

  _handleLoading = () => {
    this.props.setCurrentUserData(this.state)
    this.props.history.push('/checkFine')
  }

  render () {
    const { username, password, type } = this.state
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
              disabled={this._checkIfAllInputsAreFilled()}
              text="INGRESAR"
              actionToExecute={this._handleLoading}
            />
            <hr />
            <span className="gray-color">
              ¿No tienes cuenta?
              <span onClick={() =>this.props.history.push({
                pathname: '/signup',
                search: `?type=${type}`
              })}>
              Registrate
            </span>
            </span>
          </div>
          </SectionCard>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = {
  setCurrentUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin))
