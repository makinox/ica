import React, { Component } from 'react'
import './index.css'
import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import { withRouter } from 'react-router-dom'
import SectionCard from '../../components/SectionCard'
import { connect } from 'react-redux'


class Home extends Component {

  render () {
    return (
      <div>
        <Header title="ICA" subtitle="Implementación de comparendos ambientales"/>
        <section>
          <SectionCard
            title="Selecciona tu tipo de usuario"
            imageURL="./images/touch.png"
          >
            <ActionButton
              text="GRUPO ECOLOGICO"
              actionToExecute={()=>this.props.history.push({
                pathname: '/signin',
                search: '?type=eco_group'
              })}
            />
            <ActionButton
              text="DIRECTIVOS"
              actionToExecute={() => this.props.history.push({
                pathname: '/signin',
                search: '?type=directives'
              })}
            />
            <ActionButton
              text="ESTUDIANTES"
              actionToExecute={() => this.props.history.push({
                pathname: '/checkFine',
                search: '?type=student'
              })}
            />
          </SectionCard>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
