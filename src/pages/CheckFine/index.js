import React, { Component } from 'react'
import './index.css'
import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import InputField from '../../components/InputField'
import { withRouter } from 'react-router-dom'
import SectionCard from '../../components/SectionCard'
import Preloader from '../../components/Preloader'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import swal from 'sweetalert'
import { graphql } from 'react-apollo'
import {
  saveStudentData,
  setCurrentUserData,
  saveStudentFinesInStore
} from '../../redux/actions'

class CheckFine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      loading: false,
      type: '',
      isStudent: false
    }
  }

  componentWillMount () {
    const qs = decodeURIComponent(document.location.search)
    if (qs) {
      const type = qs.split('?type=')[1]
      this.setState({ type, isStudent: type === 'student' })
    }
  }

  _handleOnchangeInputValue = (e, type) => this.setState({ fullName: e.target.value })

  _checkIfAllInputsAreFilled = () => {
    return this.state.fullName ? false : true
  }

  _handleStartSearching = () => {
    const { fullName, isStudent } = this.state
    this.setState({ loading: true })
    this.props.mutate({ variables: { name: fullName } })
    .then(async ({ data }) => {
      if (data.getStudentByFullName) {
        this._handleStopLoading(data.getStudentByFullName)
      } else {
        swal('El estudiante no está registrado')
        if (!isStudent) {
          this.props.history.push({
            pathname: '/signup',
            search: 'type=student'
          })
        }
        this.setState({ loading: false })
      }

    })
    .catch(err => {
      console.log(err)
      swal('Intenta de nuevo')
      this.setState({ loading: false })
    })
  }


  _handleStopLoading = (data) => {
    this.props.saveStudentData(data)
    this.setState({ loading: false})
    this.props.history.push('/fines')
  }

  _logout = () => {
    this.props.setCurrentUserData({})
    this.props.history.push('/')
  }

  render () {
    const { fullName, loading } = this.state
    return (
      <div>
        <Header
          title="Bienvenido"
          currentUserData={this.props.state.ica.currentUserData}
          logout={this._logout}
        />
        <section>
          <SectionCard
            title="Ver estado de multas"
          >
            <InputField
              type="text"
              placeholder="Nombre completo del estudiante"
              value={fullName}
              onChange={(e) => this._handleOnchangeInputValue(e, 'fullName')}
            />
            {
              loading
              ? <Preloader color="#00B24D" size="big"/>
              : <ActionButton
                text="CONSULTAR"
                actionToExecute={this._handleStartSearching}
                disabled={this._checkIfAllInputsAreFilled()}
              />
            }

          </SectionCard>
        </section>
      </div>
    )
  }
}


const getStudent = gql`
  mutation getStudent ($name: String!) {
    getStudentByFullName(name: $name){
      name
      course
      id
    }
  }
`

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = {
  saveStudentData,
  setCurrentUserData,
  saveStudentFinesInStore
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(getStudent)(withRouter(CheckFine)))
