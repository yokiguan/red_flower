function makeRequest(config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    console.log(config)
    xhr.open(config.method, config.url)
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        })
      }
    }
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      })
    }
    if (config.headers) {
      Object.keys(config.headers).forEach(function (key) {
        xhr.setRequestHeader(key, config.headers[key]);
      });
    }
    if (typeof config.data !== 'undefined') {
      xhr.send(config.data)
    }
  })
}

//  配置url
function config_url(url) {
  const baseUrl = 'http://localhost:3000'
  return baseUrl + url
}

//  配置method
function config_method(method) {
  return method.toUpperCase()
}

//  查询字符串
//  {name: 'van', age: '18'} --> 'xxx?name=van&age=18'
function config_queryString(data) {
  let str = ''
  if (typeof data === 'undefined' || Object.keys(data).length === 0) {
    return str
  }
  const keys = Object.keys(data)
  const values = Object.values(data)
  keys.forEach((item, index) => {
    str += item + '=' + values[index] + '&'
  })
  return '?' + str.slice(0, str.length - 1)
}

//  Restful
// {id: 1} ---> 'xxxx/1'
function config_restful(data) {
  let str = ''
  const values = Object.values(data)
  values.forEach(item => {
    str += '/' + item
  })
  return str
}
//  根据method匹配参数
const config_mothods = {
  GET: (url, data) => {
    return {
      method: 'GET',
      url: url + config_queryString(data),
      headers: {
        "Content-Type": 'application/json'
      },
      data: {}
    }
  },
  GET_RESTFUL: (url, data) => {
    return {
      method: 'GET',
      url: url + config_restful(data),
      headers: {
        "Content-Type": 'application/json'
      },
      data: {}
    }
  },
  POST: (url, data) => {
    return {
      method: 'POST',
      url: url,
      data: data,
      headers: {
        "Content-Type": 'application/json'
      }
    }
  },
  DELETE_RESTFUL: (url, data) => {
    return {
      method: 'DELETE',
      url: url + '/' + data.id,
      data: {},
      headers: {
        "Content-Type": 'application/json'
      }
    }
  },
  PUT: (url) => {
    return {
      method: 'PUT',
      url: url,
      data: {},
      headers: {
        "Content-Type": 'application/json'
      }
    }
  },
  GET_CONF: (url) => {
    return {
      method: 'GET',
      url: url,
      data: {},
      headers: {
        "Content-Type": 'application/json'
      }
    }
  },
  PUT_RESTFUL: (url, data) => {
    return {
      method: 'PUT',
      url: url + '/' + data.id,
      data: {},
      headers: {
        "Content-Type": 'application/json'
      }
    }
  }
}

function config_params(method, url, data) {
  return config_mothods[method](url, data)
}

const ajax = (method, url, data) => {
  return makeRequest(config_params(config_method(method), config_url(url), data))
}

export default ajax