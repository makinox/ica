import React from 'react'
import './index.css'

function SectionCard ({ children, title, imageURL }) {
  return (
    <div id="section-view">
      {
        !title
        ? null
        : <div className="section-title-container">
          {imageURL ? <img id="section-view-logo" src={imageURL} alt="button-logo"/>  : null}
          <span id="section-view-title">{title}</span>
        </div>
      }
      <div className=""> {/*fines-table-header*/}
        {children}
      </div>
    </div>
  )
}

export default SectionCard
