// 	source: 需要筛选的原资源
//	itemName: 要筛选的属性名
//	itemValue: 指定的属性值
const filtrateItem = (source, itemName, itemValue) => {
  return source.filter((item) => {
    return item[itemName] === itemValue
  })
}

// 	source: 需要筛选的原资源
//	关键字: {name: value}
const filtrate = (source, keyWord) => {
  const keyWordName = Object.keys(keyWord)
  const keyWordValue = Object.values(keyWord)
  keyWordName.map((item, index) => {
    source = filtrateItem(source, item, keyWordValue[index])
  })
  return source
}

const normalizeTime = (time) => {
  return time.slice(0, 10)
}

const transformTime = (data, option) => {
  if (typeof data === 'undefined') {
    return ''
  }
  const date = new Date(parseInt(data) * 1000)
  if (option && option === 'year_month_day') {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
  }
  return date.getFullYear() + '-' + (date.getMonth() + 1)
}

const judgePushAjax = (res) => {
  if (typeof res !== 'undefined' && typeof res.code !== 'undefined' && res.code === 0) {
    alert('成功')
  } else {
    alert('失败')
  }
}
const judgePullAjax = (res) => {
  return typeof res !== 'undefined' && typeof res.code !== 'undefined' && res.code === 0
}
const DownLoadResume = (...userId) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://api.helloyzy.cn:8080/generate')
    xhr.withCredentials = true
    xhr.responseType = 'blob'
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
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(userId))
  })
}
export {
  filtrate,
  normalizeTime,
  transformTime,
  judgePullAjax,
  judgePushAjax,
  DownLoadResume
}