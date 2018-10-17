import React, { Component } from 'react'
import './index.css'

import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import Preloader from '../../components/Preloader'
import SectionCard from '../../components/SectionCard'
import InputField from '../../components/InputField'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import {
  setCurrentUserData,
  saveStudentData
} from '../../redux/actions'
import gql from 'graphql-tag'
import swal from 'sweetalert'


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      password: '',
      checked: false,
      type: '',
      loading: false,
      course: '',
      id: '',
      isStudent: false
    }
  }

  componentWillMount () {
    const qs = decodeURIComponent(document.location.search)
    if (qs) {
      const type = qs.split('?type=')[1]
      this.setState({ type, isStudent: type === 'student' })
      console.log(this.props)
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
      case 'course':
          this.setState({ course: e.target.value })
      break
      case 'id':
          this.setState({ id: e.target.value })
      break
      case 'checkbox':
        this.setState({ checked: !this.state.checked })
      break
      default:
        return type
    }
  }

  _checkIfAllInputsAreFilled = () =>  {
    const { username, password, name, checked, isStudent, course, id } = this.state
    if (isStudent) return name && course && id ? false : true
    return username && password && name && checked ? false : true
  }

  _signup = () => {
    this.setState({ loading: true })
    const { isStudent } = this.state
    if (isStudent) {
      this._handleCreateStudent()
    } else {
      this._handleCreateUser()
    }
  }

  _handleCreateUser = () => {
    const { name, username, password, checked, type } = this.state
    this.props.signupUserMutation({variables: { name, username, role: type, password }})
    .then(async ({ data })=> {
      console.log(data)
      this.setState({loading: false})
      this.props.setCurrentUserData(data.signup)
      this.props.history.push('/checkFine')
      swal(`Bienvenido ${name}`)
    })
    .catch(err => {
      console.log('GOT AN ERROR', err)
      this.setState({ loading: false })
    })
  }




  _handleSignupFinished = (data) => {
    const { isStudent, name } = this.state
    if (isStudent) {
      //save student data
      this.props.saveStudentData(data.signup)
      //navigate to fines list
    } else {
      //save jwt
      this.props.setCurrentUserData(data.signup)
      this.props.history.push('/checkFine')
      swal(`Bienvenido ${name}`)
    }
  }

  render () {
    const { name, username, password, checked, type, loading, course, id, isStudent } = this.state
    return (
      <div>
        <Header title="ICA" subtitle="Implementación de comparendos ambientales"/>
        <section>
          <SectionCard
            title={isStudent ? 'Registrar estudiante' : 'Registrarse'}
          >
          <div className="inputs-container">
            <InputField
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => this._handleOnchangeInputValue(e, 'name')}
            />
            {
              isStudent
              ? <InputField
                type="text"
                placeholder="Curso"
                value={course}
                onChange={(e) => this._handleOnchangeInputValue(e, 'course')}
              />
              : <InputField
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => this._handleOnchangeInputValue(e, 'username')}
              />

            }
            {
              isStudent
              ? <InputField
                  type="number"
                  placeholder="Identificación, TI, CC"
                  value={id}
                  onChange={(e) => this._handleOnchangeInputValue(e, 'id')}
                />
              : <InputField
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => this._handleOnchangeInputValue(e, 'password')}
                />

            }
            {
              isStudent
              ? null
              : <div>
                <input
                  name="checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => this._handleOnchangeInputValue(e, 'checkbox')}
                />
                <span className="gray-color">Acepto los términos y condiciones</span>
              </div>
            }
            {
              loading
              ? <Preloader size="small"/>
              : <ActionButton
                text={isStudent ? 'Registrar estudiante' : 'Registrarse'}
                actionToExecute={this._signup}
                disabled={this._checkIfAllInputsAreFilled()}
              />
            }
            {
              isStudent
              ? null
              :  <div>
                <hr />
                  <span className="gray-color">¿Ya tienes cuenta? <span onClick={() =>this.props.history.push({
                    pathname: '/signin',
                    search: `?type=${type}`
                  })}>Inicia sesión</span></span>
              </div>
            }
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
  setCurrentUserData,
  saveStudentData
}

const signup = gql`
  mutation signup ($username: String!, $name: String!, $password: String!, $role: String!) {
    signup (user: {
      username: $username,
      name: $name,
      password: $password,
      role: $role
    }){
      _id
      name
      username
      jwt
      role
    }
  }
  `

  const createStudent = gql`
    mutation createStudent ($id: String!, $name: String!, $course: String!) {
      createStudent (student: {
        id: $id,
        name: $name,
        course: $course
      }){
        id
        name
        course
      }
    }
  `

export default connect(mapStateToProps, mapDispatchToProps)(
  compose(
    graphql(signup, { name: 'signupUserMutation' }),
    graphql(createStudent, { name: 'createStudentMutation' })
  )(withRouter(Signup))
)
