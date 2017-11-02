import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from 'reducers'
import thunk from 'redux-thunk'
import {requestMiddleware} from '../../src/index'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching: ', action)
  let result = next(action)
  console.log('new state: ', store.getState())
  console.groupEnd(action.type)
  return result
}


const mws = [
  thunk,
  requestMiddleware,
  logger
]

const createStoreWithMiddlewares = compose(applyMiddleware(...mws))(createStore)
const store = createStoreWithMiddlewares(rootReducer)

export default store
