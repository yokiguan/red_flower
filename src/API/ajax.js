function makeRequest(config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
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
    xhr.send(config.data)
  })
}

//  配置url
function config_url(url) {
  const baseUrl = 'http://xiaoyaoeden.top:8080'
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
  if (Object.keys(data).length === 0) {
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
function config_params(method, url, data) {

  if (method === 'GET') {
    return {
      method: 'GET',
      url: url + config_queryString(data),
      headers: {
        "Content-Type": 'application/json'
      }
    }
  }

  if (method === 'GET_RESTFUL') {
    return {
      method: 'GET',
      url: url + config_restful(data),
      headers: {
        "Content-Type": 'application/json'
      }
    }
  }

  if (method === 'POST') {
    return {
      method: 'POST',
      url: url,
      data: data,
      headers: {
        "Content-Type": 'application/json'
      }
    }
  }

  if (method === 'POST_LOGIN') {
    let str = config_queryString(data)
    return {
      method: 'POST',
      url: url,
      transformRequest: str.slice(1, str.length),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  }
}

const ajax = (method, url, data) => {
  return makeRequest(config_params(config_method(method), config_url(url), data))
}

export default ajax