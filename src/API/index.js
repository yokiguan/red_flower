import axios from 'axios'
axios.defaults.baseURL = 'http://xiaoyaoeden.top:8080'
axios.defaults.withCredentials = true

const urlWrapper = (obj) => {
  const values = Object.values(obj)
  let str = ''
  Object.keys(obj).map((item, index) => {
    str += item + '=' + values[index] + '&'
  })
  console.log(str)
  return str.slice(0, str.length - 1)
}

const accountLogin = (obj) => {
  return axios({
    url: '/login',
    method: 'post',
    data: obj,
    transformRequest: [function (data) {
      const str = urlWrapper(data)
      return str
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


export default accountLogin