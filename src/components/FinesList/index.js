import React from 'react'
import './index.css'
import FineItem from './FineItem'

function FinesList ({ data, currentUserType, deleteFineMutation }) {
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
          <div className="table-header-view">
            <span className="table-header-item">FORMA DE PAGO</span>
          </div>
        </div>
      <div id="list-container">
        {data.reverse().map(item => <FineItem
            currentUserType={currentUserType}
            key={item.id}
            item={item}
            deleteFineMutation={(_id) => deleteFineMutation(_id)}
          />
        )}
      </div>
    </div>
  )
}

export default FinesList
