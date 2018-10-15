import React from 'react'
import './index.css'

function InputField ({ type, value, onChange, placeholder }) {
  return (
    <input id="inputfield" type={type} value={value} onChange={onChange} placeholder={placeholder}/>
  )
}

export default InputField
