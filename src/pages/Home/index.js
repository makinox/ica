import React, { Component } from 'react'
import './index.css'
import ActionButton from '../../components/ActionButton'
import Header from '../../components/Header'
import { withRouter } from 'react-router-dom'
import SectionCard from '../../components/SectionCard'


class Home extends Component {
  constructor(props) {
    super(props)
  }

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
              actionToExecute={()=>this.props.history.push('/signin')} //this.props.history.push('/signin')
            />
            <ActionButton
              text="DIRECTIVOS"
              actionToExecute={() => alert('DIRECTIVOS')}
            />
            <ActionButton
              text="ESTUDIANTES"
              actionToExecute={() => prompt('tu nombre')}
            />
          </SectionCard>
        </section>
      </div>
    )
  }
}

export default withRouter(Home)
