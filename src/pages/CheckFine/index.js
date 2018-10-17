import React, { Component } from 'react'
import './index.css'
import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import InputField from '../../components/InputField'
import { withRouter } from 'react-router-dom'
import SectionCard from '../../components/SectionCard'
import Preloader from '../../components/Preloader'
import { connect } from 'react-redux'
import {
  saveStudentData,
  saveStudentFinesInStore
} from '../../redux/actions'

class CheckFine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      loading: false,
      user: {
        data: {
          id: '1234567890',
          name: 'Camila Cuevas',
          classRoom: '11B'
        },
        fines: [
          {
            id: 1,
            type: 1,
            date: new Date(),
            description: 'HERE IS A DESCRIPTION'
          },
          {
            id: 2,
            type: 3,
            date: new Date(),
            description: 'HERE IS A DESCRIPTION'
          },
          {
            id: 3,
            type: 2,
            date: new Date(),
            description: 'HERE IS A DESCRIPTION'
          },
          {
            id: 4,
            type: 4,
            date: new Date(),
            description: 'HERE IS A DESCRIPTION'
          }
        ]
      }
    }
  }

  _handleOnchangeInputValue = (e, type) => this.setState({ id: e.target.value })

  _handleStartSearching = () => {
    this.setState({ loading: true })
    setTimeout(() => this._handleStopLoading(), 2000)
  }

  _handleStopLoading = () => {
    this.props.saveStudentData(this.state.user.data)
    this.props.saveStudentFinesInStore(this.state.user.fines)
    this.setState({ loading: false})
    this.props.history.push('/fines')
  }

  render () {
    const { id, loading } = this.state
    return (
      <div>
        <Header
          title="Bienvenido"
        />
        <section>
          <SectionCard
            title="Ver estado de multas"
          >
            <InputField
              type="text"
              placeholder="Nombre completo del estudiante"
              value={id}
              onChange={(e) => this._handleOnchangeInputValue(e, 'id')}
            />
            {
              loading
              ? <Preloader color="#00B24D" size="big"/>
              : <ActionButton
                text="CONSULTAR"
                actionToExecute={this._handleStartSearching}
              />
            }

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
  saveStudentData,
  saveStudentFinesInStore
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckFine))
