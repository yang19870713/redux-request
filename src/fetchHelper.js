import qs from 'qs'
import 'whatwg-fetch'

const createFetcher = store => {
  if (!store) throw Error('A valid store MUST be provided')
  return ({ url, data, method = 'GET', headers = {}, dataType, cookie = true }) => {
    if (!url) {
      throw new Error('url is not defined!')
    }
    let fullUrl = url.indexOf('http') === 0
      ? url
      : url.indexOf('/') === 0 ? `${url}` : `/${url}`
    let options = {
      method: method.toUpperCase()
    }
    if (cookie) {
      options = {
        ...options
      }
    }
    if ((options.method === 'GET' || options.method === 'PUT') && dataType !== 'json') {
      data && (fullUrl += `?${qs.stringify(data)}`)
      options = {
        headers: {
          ...options.headers
        }
      }
    } else {
      options = {
        ...options,
        body: qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...options.headers
        }
      }
    }
    if (dataType === 'json') {
      options = {
        ...options,
        body: JSON.stringify(data),
        headers: {
          ...options.headers,
          'Content-Type': 'application/json'
        }
      }
    }

    const p = Promise.race([
      fetch(fullUrl, options),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 20000)
      })
    ])
    return p.then((response) => {
      if (response.status === 401 || response.status === 400) {
        throw new Error(response.status)
      } else if (
        (response.status > 299 || response.status < 200) &&
        response.status !== 304
      ) {
        throw new Error('The server is busy, please try again later')
      }
      return response.json()
    })
    .then((json) => {
      return { response: json }
    })
    .catch(error => {
      throw error
    })
  }
}

export default createFetcher
