import React, { Component } from 'react'
import './index.css'

import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import SectionCard from '../../components/SectionCard'
import InputField from '../../components/InputField'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrentUserData } from '../../redux/actions'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import swal from 'sweetalert'
import Preloader from '../../components/Preloader'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      type: '',
      loading: false
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

  _login = () => {
    this.setState({ loading: true })
    const { username, password } = this.state
    this.props.mutate({ variables: { username, password } })
    .then( async ({ data }) => {
      this.props.setCurrentUserData(data.login)
      this.props.history.push('/checkFine')
    })
    .catch(err => {
      this.setState({ loading: false })
      swal('Itenta de nuevo :(')
      console.log(err)
    })
  }

  render () {
    const { username, password, type, loading } = this.state
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
            {
              loading ? <Preloader size="small"/>
              : <ActionButton
                  disabled={this._checkIfAllInputsAreFilled()}
                  text="INGRESAR"
                  actionToExecute={this._login}
                />
            }
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

const login = gql`
  mutation login ($username: String!, $password: String!) {
    login(username: $username, password: $password){
      _id
      username
      name
      role
      jwt
    }
  }
`

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = {
  setCurrentUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(login)(withRouter(Signin))
)
