import React, { Component } from 'react'
import Header from '../../components/Header'
import SectionCard from '../../components/SectionCard'
import StudentInfoCard from '../../components/StudentInfoCard'
import FinesList from '../../components/FinesList'
import IconButton from '../../components/IconButton'
import AddFineForm from '../../containers/AddFineForm'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import './index.css'
import {
  saveStudentFinesInStore,
  changeShowForm
} from '../../redux/actions'

class Fines extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

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

  render () {
    const { fines, student, show,  currentUserData: { role } } = this.props.state.ica
    return (
      <div>
        <Header
          title="Multas"
          subtitle="Aqui podrás ver tu historial de multas"
        />
        <section>
          <SectionCard>
            <div className="fines-container">
                <StudentInfoCard user={student} />
                  {
                    !show
                      ? <FinesList data={fines} currentUserType={role}/>
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
    graphql(checkFines, { name: 'checkFinesMutation' })
  )(Fines)
)
