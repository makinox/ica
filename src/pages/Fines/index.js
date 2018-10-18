import React, { Component } from 'react'
import Header from '../../components/Header'
import SectionCard from '../../components/SectionCard'
import StudentInfoCard from '../../components/StudentInfoCard'
import FinesList from '../../containers/FinesList'
import IconButton from '../../components/IconButton'
import AddFineForm from '../../containers/AddFineForm'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import './index.css'
import {
  saveStudentFinesInStore,
  setCurrentUserData,
  changeShowForm,
  filterItemFromFineListById
} from '../../redux/actions'

class Fines extends Component {

  componentWillMount () {
    this._getFinesList()
  }

  _getFinesList = () => {
    const { student: { id } } = this.props.state.ica
    this.props.checkFinesMutation({variables: { id }})
    .then(async ({ data })=> {
      this.props.saveStudentFinesInStore(data.getStudentFines)
    })
    .catch(err => {
      console.log('GOT AN ERROR', err)
    })

  }

  _handleShowForm = () => {
    this.props.changeShowForm( !this.props.state.ica.show )
  }

  _renderAddButton = (currentUserType) => {
    const show = this.props.state.ica.show
    switch (currentUserType) {
      case 'eco_group':
        return <IconButton actionToExecute={this._handleShowForm} icon={show ? 'clear' : 'add' } size="big" color="#00B25B"/>
      case 'directives':
        return null
      default:
        return currentUserType
    }
  }

  _handleOnFinishAddFine = (data) => {
    this._getFinesList()
  }

  _logout = () => {
    this.props.setCurrentUserData({})
    this.props.history.push('/')
  }

  _removeFineFromView = (_id) => {
    this.props.filterItemFromFineListById(_id)
  }

  _handleDeleteFine = (_id) => {
    this.props.deleteFineMutation({ variables: { fineId: _id } })
    .then(async ({ data }) => {
      this._removeFineFromView(data.deleteFine._id)
    })
    .then(err => {
      console.log(err)
    })

  }

  render () {
    const { fines, student, show,  currentUserData: { role } } = this.props.state.ica
    const { deleteFineMutation } = this.props
    return (
      <div>
        <Header
          currentUserData={this.props.state.ica.currentUserData}
          logout={this._logout}
          title="Multas"
          subtitle="Aqui podrás ver tu historial de multas"
        />
        <section>
          <SectionCard>
            <div className="fines-container">
                <StudentInfoCard user={student} />
                  {
                    !show
                      ? <FinesList
                          data={fines}
                          currentUserType={role}
                          deleteFineMutation={(_id) => this._handleDeleteFine(_id)}
                          onAddPayWay={this._handleOnFinishAddFine}
                        />
                      : <AddFineForm
                          onAddFine={this._handleOnFinishAddFine}
                        />
                  }
                {this._renderAddButton(role)}
              </div>
          </SectionCard>
        </section>
      </div>
    )
  }
}

const checkFines = gql`
  mutation checkFines ($id: String!) {
    getStudentFines(studentId: $id){
     type
     description
     studentId
     date
     _id
     payWay
   }
  }
`

const deleteFine = gql`
  mutation deleteFine ($fineId: String!) {
    deleteFine(fineId: $fineId) {
    	_id
    }
  }
`

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = {
  saveStudentFinesInStore,
  setCurrentUserData,
  changeShowForm,
  filterItemFromFineListById
}

export default connect(mapStateToProps, mapDispatchToProps)(
  compose(
    graphql(checkFines, { name: 'checkFinesMutation' }),
    graphql(deleteFine, { name: 'deleteFineMutation' })
  )(withRouter(Fines))
)
