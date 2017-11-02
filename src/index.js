import createFetcher from './fetchHelper'
import requestMiddleware from './requestMiddleware'

export { default as createFetcher } from './fetchHelper'
export { default as requestMiddleware } from './requestMiddleware'

const module = {
  createFetcher,
  requestMiddleware
}

export default module
