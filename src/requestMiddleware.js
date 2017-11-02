/* This middleware is used to handle async requests
action: {
  types: [requestType, successType, errorType]
}
1. dispatch requestType action
2. handle response
3. dispatch successType/errorType action according to response
*/
export default store => next => action => {
  const {
    types,
    callAPI,
    shouldCallAPI = () => true,
    requestData = {}
  } = action

  if (!types) {
    // normal acton : dispatch
    return next(action)
  }

  // sanity check
  if (!Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string'))  {
    throw new Error('Expected an array of three string types.')
  }

  if (typeof callAPI !== 'function') {
    throw new Error('Expected fetch to be a function.')
  }

  if (!shouldCallAPI(store.getState())) {
    return
  }

  const [requestType, successType, errorType] = types

  store.dispatch(Object.assign({}, requestData, {
    type: requestType
  }))

  return callAPI(store).then(
    response => store.dispatch({
      requestData,
      payload: response,
      type: successType
    }),
    error => {
      console.error(error)
      store.dispatch({
        requestData,
        type: errorType
      })
    }
  )
}
