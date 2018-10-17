import React from 'react'
import './index.css'
import { formatDate } from '../../../lib/formatDate'
import IconButton from '../../IconButton'

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

function handleRenderIcon (currentUserType) {
  switch (currentUserType) {
    case 'eco_group':
      return null
    case 'directives':
      return (
        <div className="mini-icons-view">
          <IconButton icon="add" size="small" color="#00B25B"/>
          <IconButton icon="delete" size="small" color="#00B25B"/>
        </div>
      )
    default:
      return currentUserType
  }
}

function FineItem ({ currentUserType,  item: { type, date, description } }) {
  return (
    <div id="fine">
      <div className="fine-container">
        <div className="fine-item">
          <span>{getTypeColorItem(type)}</span>
        </div>
        <div className="fine-item">
          <span>{formatDate(date)}</span>
        </div>
        <div>
          <div className="tooltip">Ver descipción
            <span className="tooltiptext">{description}</span>
          </div>
        </div>
      </div>
      {handleRenderIcon(currentUserType)}
    </div>
  )
}

export default FineItem
