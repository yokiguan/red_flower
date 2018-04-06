// 	source: 需要筛选的原资源
//	itemName: 要筛选的属性名
//	itemValue: 指定的属性值
export const filtrateItem = (source, itemName, itemValue) => {
  return source.filter((item) => {
    return item[itemName] === itemValue
  })
}

// 	source: 需要筛选的原资源
//	关键字: {name: value}
export const filtrate = (source, keyWord) => {
  const keyWordName = Object.keys(keyWord)
  const keyWordValue = Object.values(keyWord)
  keyWordName.map((item, index) => {
    source = filtrateItem(source, item, keyWordValue[index])
  })
  return source
}

export const normalizeTime = (time) => {
  return time.slice(0, 10)
}

export default {
  filtrate,
  normalizeTime
}