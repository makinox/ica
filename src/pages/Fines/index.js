import React, { Component } from 'react'
import Header from '../../components/Header'
import SectionCard from '../../components/SectionCard'
import StudentInfoCard from '../../components/StudentInfoCard'
import FinesList from '../../components/FinesList'
import { connect } from 'react-redux'
import './index.css'

class Fines extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const { fines, student, currentUserType } = this.props.state.ica
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
              <FinesList data={fines} currentUserType={currentUserType}/>
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Fines)
