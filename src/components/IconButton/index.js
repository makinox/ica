import React from 'react'
import './index.css'

function IconButton ({ icon, size, color, actionToExecute }) {
  return (
    <button onClick={actionToExecute} style={{ backgroundColor: color }} className={`add-button ${size === 'big' ? size : size} `}>
      <i class="material-icons">{icon}</i>
    </button>
  )
}

export default IconButton
