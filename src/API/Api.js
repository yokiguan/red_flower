import ajax from './ajax'

const AccountLogin = (data) => {
  return ajax('post_login', '/login', data)
}

export {
  AccountLogin
}