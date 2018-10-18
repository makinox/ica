import React, { Component } from 'react'
import './index.css'
// import { formatDate } from '../../lib/formatDate'
import IconButton from '../IconButton'
import AddPayWayToFine from '../../containers/AddPayWayToFine'


export default class FineItem extends Component {
  state = {
    show: false
  }

  getTypeColorItem = (type) => {
    switch (type) {
      case '1':
        return (
          <div className="type-item">
            <span>1</span>
            <div className="circle" style={{background: 'green'}}></div>
          </div>
        )
      case '2':
        return (
          <div className="type-item">
            <span>2</span>
            <div className="circle" style={{background: 'yellow'}}></div>
          </div>
        )
      case '3':
        return (
          <div className="type-item">
            <span>3</span>
            <div className="circle" style={{background: 'orange'}}></div>
          </div>
        )
      case '4':
        return (
          <div className="type-item">
            <span>4</span>
            <div className="circle" style={{background: 'red'}}></div>
          </div>
        )
      default:
        return type
    }
  }

  _changeShowPayWayForm = () => {
    this.setState({ show: !this.state.show })
  }

  render () {
    const { currentUserType,  item: { type, date, description, _id, payWay }, deleteFineMutation, onAddPayWay } = this.props
    const { show } = this.state
    return (
      <div>
        {
          show ?
          <div>
            <AddPayWayToFine fineId={_id} onAddPayWay={onAddPayWay} changeShowPayWayForm={this._changeShowPayWayForm}/>
            <IconButton actionToExecute={this._changeShowPayWayForm} icon={show ? 'clear' : 'add'} size="small" color="#00B25B"/>
          </div>
          : <div id="fine">
              <div className="fine-container">
                <div className="fine-item">
                  <span>{this.getTypeColorItem(type)}</span>
                </div>
                <div className="fine-item">
                  <span>{date}</span>
                </div>
                <div>
                  <div className="tooltip">Ver descipción
                    <span className="tooltiptext">{description}</span>
                  </div>
                </div>
                <div>
                  <div className="tooltip">Forma de pago
                    <span className="tooltiptext">{payWay}</span>
                  </div>
                </div>
                {
                  currentUserType === 'directives' ?
                  <div className="mini-icons-view">
                    <IconButton actionToExecute={this._changeShowPayWayForm} icon="add" size="small" color="#00B25B"/>
                    <IconButton actionToExecute={() => deleteFineMutation(_id)} icon="delete" size="small" color="#00B25B"/>
                  </div>
                : null
                }
              </div>
            </div>
        }
      </div>
    )
  }
}
