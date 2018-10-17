import React from 'react'
import './index.css'

function IconButton ({ icon, size, color }) {
  return (
    <div style={{ backgroundColor: color }} className={`add-button ${size === 'big' ? size : size} `}>
      <i class="material-icons">{icon}</i>
    </div>
  )
}

export default IconButton
