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
const GetStudentScore = (data) => {
  return ajax('get_restful', '', data)
}
const UpdateStudentScore = (data) => {
  return ajax('post', '', data)
}
const DownLoad = (data) => {
  return ajax('get', '', data)
}
const UpLoad = (data) => {
  return ajax('put', '', data)
}
const QiNiuDownLoad = (data) => {
  return ajax('get', '', data)
}
const GetStuInfoList = (data) => {
  return ajax('get', '/stu', data)
}
const GetTutorInfoList = (data) => {
  return ajax('get', '/tutor', data)
}
const GetSchoolList = () => {
  return ajax('get_conf', '/conf/school')
}
const GetDirectionList = () => {
  return ajax('get_conf', '/conf/direction')
}
export {
  AccountLogin,
  GetAuditList,
  VetoAuditItem,
  AgreeAuditItem,
  ResetCounter,
  GetNormalArticle,
  GetStudentScore,
  UpdateStudentScore,
  GetStuInfoList,
  GetTutorInfoList,
  GetSchoolList,
  GetDirectionList
}