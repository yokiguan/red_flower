import ajax from './ajax'

const AccountLogin = (data) => {
  return ajax('post', '/login', JSON.stringify(data))
}

const GetAuditList = (data) => {
  return ajax('get', '/audit/general', data)
}

const VetoAuditItem = (data) => {
  return ajax('delete_restful', '/audit/general', data)
}
const AgreeAuditItem = (data) => {
  return ajax('put_restful', '/audit/general', data)
}
const ResetCounter = () => {
  return ajax('put', '/reset/counter')
}
const GetNormalArticle = (data) => {
  return ajax('get', '/article/normal', data)
}
export {
  AccountLogin,
  GetAuditList,
  VetoAuditItem,
  AgreeAuditItem,
  ResetCounter,
  GetNormalArticle
}