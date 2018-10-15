import React from 'react'
import './index.css'

function Preloader ({ color, size }) {
  return (
    <div id={size === 'big' ? "preloader" : "small-preloader"} style={!color ? styles.preloader : {
      border: `10px solid ${color}`,
      borderTop: `10px solid transparent`
    }}></div>
  )
}

const styles = {
  preloader: {
    border: '10px solid #00b24d', /* green */
    borderTop: '10px solid transparent' /* transparent */
  }
}

export default Preloader
