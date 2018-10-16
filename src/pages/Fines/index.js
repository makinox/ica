import React, { Component } from 'react'
import Header from '../../components/Header'
import SectionCard from '../../components/SectionCard'
import StudentInfoCard from '../../components/StudentInfoCard'
import FinesList from '../../components/FinesList'
import './index.css'

export default class Fines extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        data: {
          id: '1234567890',
          name: 'Camila Cuevas',
          classRoom: '11B'
        },
        fines: [
          {
            type: 1,
            date: new Date(),
            description: 'HERE IS A DESCRIPTION'
          },
          {
            type: 3,
            date: new Date(),
            description: 'HERE IS A DESCRIPTION'
          },
          {
            type: 2,
            date: new Date(),
            description: 'HERE IS A DESCRIPTION'
          },
          {
            type: 4,
            date: new Date(),
            description: 'HERE IS A DESCRIPTION'
          }
        ]
      }
    }
  }

  render () {
    const { user } = this.state
    return (
      <div>
        <Header
          title="Multas"
          subtitle="Aqui podrás ver tu historial de multas"
        />
        <section>
          <SectionCard>
            <div className="fines-container">
              <StudentInfoCard user={user.data} />
              <FinesList data={user.fines}/>
            </div>
          </SectionCard>
        </section>
      </div>
    )
  }
}
