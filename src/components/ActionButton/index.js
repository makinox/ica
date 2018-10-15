import React from 'react'
import './index.css'

function ActionButton ({ text, actionToExecute }) {
  return (
    <button onClick={actionToExecute}>
      {text}
    </button>
  )
}

export default ActionButton
