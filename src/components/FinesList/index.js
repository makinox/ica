import React from 'react'
import './index.css'
import FineItem from './FineItem'

function FinesList ({ data }) {
  return (
    <div>
      <div id="fines-table-header">
        <div className="table-header-view">
          <span className="table-header-item">TIPO</span>
        </div>
        <div className="table-header-view">
          <span className="table-header-item">FECHA</span>
        </div>
        <div className="table-header-view">
          <span className="table-header-item">DESCRIPCION</span>
        </div>
      </div>
      {data.map(item => <FineItem key={item.id} item={item}/>)}
    </div>
  )
}

export default FinesList
