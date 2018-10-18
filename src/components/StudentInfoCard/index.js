import React from 'react'
import './index.css'

function StudentInfoCard ({ user: { id, name, course }}) {
  return (
    <div className="student-ifo-card">
      <img id="user-avatar" src="https://png.icons8.com/cotton/1600/tree.png" alt="avatar"/>
      <span id="user-name"><b>Nombre: </b>{name}</span>
      <span id="user-id"><b>ID: </b>{id}</span>
      <span id="user-classRoom"><b>Curso: </b>{course}</span>
    </div>
  )
}

export default StudentInfoCard
