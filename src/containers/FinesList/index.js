import React, { Component } from 'react'
import './index.css'
import FineItem from '../../components/FineItem'

export default class FinesList extends Component {
  render () {
    const { data, currentUserType, deleteFineMutation, onAddPayWay } = this.props
    return (
      <div>
          <div className={(currentUserType === "directives") ? "fines-table-header s-fine-list-b" : "fines-table-header s-fine-list-a"}>
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
              onAddPayWay={onAddPayWay}
              deleteFineMutation={(_id) => deleteFineMutation(_id)}
            />
          )}
        </div>
      </div>
    )
  }
}
