import {combineReducers} from 'redux'

const pokemon = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_POKEMON_SUCCESS':
      return action.payload || {}
    case 'LOAD_POKEMON_ERROR':
      return {}
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'LOAD_POKEMON_REQEUST':
      return true
    case 'LOAD_POKEMON_SUCCESS':
    case 'LOAD_POKEMON_ERROR':
      return false
    default:
      return state
  }
}

const error = (state = '', action) => {
  switch (action.type) {
    case 'LOAD_POKEMON_REQEUST':
      return ''
    case 'LOAD_POKEMON_SUCCESS':
      return ''
    case 'LOAD_POKEMON_ERROR':
      return 'Search Failed'
    default:
      return state
  }
}


export default combineReducers({
  pokemon,
  isLoading,
  error
})
