import React, { Component } from 'react'
import './index.css'
import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import InputField from '../../components/InputField'
import { withRouter } from 'react-router-dom'
import SectionCard from '../../components/SectionCard'
import Preloader from '../../components/Preloader'

export default class CheckFine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      loading: false
    }
  }

  _handleOnchangeInputValue = (e, type) => this.setState({ id: e.target.value })

  _handleStartSearching = () => {
    this.setState({ loading: true })
    setTimeout(() => this.setState({loading: false}), 2000)
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
            title="Ver mi estado de multas"
          >
            <InputField
              type="number"
              placeholder="Identificación"
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
