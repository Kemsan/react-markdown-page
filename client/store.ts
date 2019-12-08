// -- CORE
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

// Singleton store
let store

// Combine reducers
export const rootReducer = combineReducers(reducers)

export const initializeStore = (preloadedState: object = {}) => {
  if (typeof window === 'undefined' && store) {
    return store
  }

  store = createStore(
    rootReducer,
    preloadedState,
    process.env.NODE_ENV !== 'production' ? composeWithDevTools(applyMiddleware()) : undefined
  )

  return store
}

export default initializeStore
