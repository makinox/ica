import React from 'react'
import './index.css'

function ActionButton ({ text, actionToExecute, disabled }) {
  return (
    <button
      onClick={actionToExecute}
      disabled={disabled || false}
      className={disabled ? '' : 'hover-item'}
      style={!disabled ? null :  {
        background: '#ecf0f1',
        color: '#95a5a6'
      }}
    >
      {text}
    </button>
  )
}

export default ActionButton
