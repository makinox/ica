import React from 'react'
import ReactDOM from 'react-dom'
import App from './navigation/index'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { initializeStore } from './redux/store'
import { saveState } from './redux/localStorage'
import './index.css'

const store = initializeStore()

store.subscribe(() => {
  saveState({
     ica: store.getState().ica
  })
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()