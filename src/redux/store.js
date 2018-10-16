import { applyMiddleware, createStore } from 'redux'
import reducer from './reducers'
import logger from 'redux-logger'
import { loadState } from './localStorage'

const persistedState = loadState()

export function initializeStore () {
  return createStore(reducer, persistedState, applyMiddleware(logger))
}
