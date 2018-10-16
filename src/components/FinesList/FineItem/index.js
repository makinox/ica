import React from 'react'
import './index.css'
import { formatDate } from '../../../lib/formatDate'


function getTypeColorItem (type) {
  switch (type) {
    case 1:
      return (
        <div className="type-item">
          <span>1</span>
          <div className="circle" style={{background: 'green'}}></div>
        </div>
      )
      break
    case 2:
      return (
        <div className="type-item">
          <span>2</span>
          <div className="circle" style={{background: 'yellow'}}></div>
        </div>
      )
      break
    case 3:
      return (
        <div className="type-item">
          <span>3</span>
          <div className="circle" style={{background: 'orange'}}></div>
        </div>
      )
      break
    case 4:
      return (
        <div className="type-item">
          <span>4</span>
          <div className="circle" style={{background: 'red'}}></div>
        </div>
      )
      break
    default:
      return type

  }
}

function FineItem ({ item: { type, date, description } }) {
  return (
    <div className="fine-container">
      <div className="fine-item">
        <span>{getTypeColorItem(type)}</span>
      </div>
      <div className="fine-item">
        <span>{formatDate(date)}</span>
      </div>
      <div className="">
        <div className="tooltip">Ver descipción
          <span className="tooltiptext">{description}</span>
        </div>
      </div>
    </div>
  )
}

export default FineItem
