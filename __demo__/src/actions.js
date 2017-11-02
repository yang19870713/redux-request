import { createFetcher } from '../../src/index'
import store from 'store'
const myFetch = createFetcher(store)

export default function delay (ms, val = true) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(val), ms)
  })
  return promise
}

// API
const loadPokemonInfoApi = (id) => {
  return delay(1000, myFetch({
    url: `/api/v2/type/${id}/`,
    dataType: 'json'
  })
  .then(resp => {
    return resp && resp.response
  }))
}

// ACTION
export const loadPokemonInfo = id => {
  return {
    types: ['LOAD_POKEMON_REQEUST', 'LOAD_POKEMON_SUCCESS', 'LOAD_POKEMON_ERROR'],
    callAPI: (store) => {
      return loadPokemonInfoApi(id)
    }
  }
}
