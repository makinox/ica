import React from 'react'
import './index.css'

function InputField ({ type, value, onChange, placeholder, min, max }) {
  return (
    <input
      className="inputfield"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  )
}

export default InputField
