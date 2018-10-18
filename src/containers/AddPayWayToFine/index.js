import React, { Component } from 'react'
import ActionButton from '../../components/ActionButton'
import InputField from '../../components/InputField'
import Preloader from '../../components/Preloader'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import './index.css'
import {
  saveStudentFinesInStore,
  changeShowForm
} from '../../redux/actions'

class AddPayWayToFine extends Component {
  state = {
    payWay: '',
    loading: false
  }

  _checkIfAllInputsAreFilled = () => {
    const { payWay } = this.state
    return payWay ? false : true
  }

  _handleAddPayWay = () => {
    this.setState({ loading: true })
    const { payWay } = this.state
    const { fineId } = this.props

    this.props.addPayWayToFineMutation({ variables: { fineId, payWay } })
    .then(async ({ data }) => {
      this.props.onAddPayWay()
      this.setState({ loading: false })
      this.props.changeShowPayWayForm()
    })
    .catch(e => {
      this.setState({ loading: false })
      console.log(e)
    })
  }

  render () {
    const { payWay, loading } = this.state
    return (
      <div>
        <InputField
          type="text"
          placeholder="Forma de pago"
          value={payWay}
          onChange={(e) => this.setState({ payWay: e.target.value })}
        />
        {
          loading ? <Preloader size="small"/>
          : <ActionButton
              disabled={this._checkIfAllInputsAreFilled()}
              text="AÑADIR FORMA DE PAGO"
              actionToExecute={this._handleAddPayWay}
            />
        }
      </div>
    )
  }
}

const addPayWay = gql`
  mutation addPayWayToFine ($fineId: String!, $payWay: String!) {
    addPayWay(fineId: $fineId, payWay: $payWay) {
      payWay
    }
  }
`

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = {
  saveStudentFinesInStore,
  changeShowForm
}

export default connect(mapStateToProps, mapDispatchToProps)(
  compose(
    graphql(addPayWay, { name: 'addPayWayToFineMutation' })
  )(AddPayWayToFine)
)
