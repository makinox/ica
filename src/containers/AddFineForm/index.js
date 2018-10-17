import React, { Component } from 'react'
import ActionButton from '../../components/ActionButton'
import InputField from '../../components/InputField'
import Preloader from '../../components/Preloader'
import './index.css'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import './index.css'
import {
  saveStudentFinesInStore,
  changeShowForm
} from '../../redux/actions'

class AddFineForm extends Component {
  state = {
    type: '',
    date: '',
    description: '',
    loading: false
  }

  _checkIfAllInputsAreFilled = () => {
    const { type, date, description } = this.state
    return type && date && description ? false : true
  }

  _handleAddFine = () => {
    this.setState({ loading: true })
    const { id } = this.props.state.ica.student
    const { date, description } = this.state
    const type = String( this.state.type )

    this.props.addFineMutation({ variables: { studentId: id, date, description, type  } })
    .then(async ({ data }) => {
      this.props.onAddFine()
      this.setState({ loading: false })
      this.props.changeShowForm( !this.props.state.ica.show )
    })
    .catch(e => {
      this.setState({ loading: false })
      console.log(e)
    })
  }

  render () {
    const { type, date, description, loading } = this.state
    return (
      <div id="add-fine-form">
        <InputField
          type="number"
          placeholder="Tipo"
          min={1}
          max={4}
          value={type}
          onChange={(e) => this.setState({ type: e.target.value })}
        />
        <InputField
          type="date"
          placeholder="Fecha"
          value={date}
          onChange={(e) => this.setState({ date: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => this.setState({ description: e.target.value })}
        />
        {
          loading ? <Preloader size="small"/>
          : <ActionButton
            disabled={this._checkIfAllInputsAreFilled()}
            text="PONER MULTA"
            actionToExecute={this._handleAddFine}
          />
        }
      </div>
    )
  }
}

const addFine = gql`
  mutation addFine ($studentId: String!, $type: String!, $date: String!, $description: String!) {
    createFine(studentId: $studentId, fine:{
       type: $type,
       date: $date,
       description: $description
     }){
       _id
       type
       date
       description
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
    graphql(addFine, { name: 'addFineMutation' })
  )(AddFineForm)
)
