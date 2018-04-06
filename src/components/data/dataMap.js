// 例: name --> 姓名

export const infoDataMap = {
  name: '姓名',
  phone: '手机号',
  degree: '学历',
  profession: '专业',
  admissionDate: '入学时间',
  position: '职位',
  field: '领域',
  academy: '学院',
  score: '分数',
  company: '公司',
  direction: '申请方向',
  flowerNum: '小红花',
  flowerTotalNum: '小红花充值数量',
  flowerSendNum: '小红花赠送数量',
  workedTime: '义工时间',
  school: '学校',
  personalIntro: '个人简介',
  simpleIntro: '一句话介绍',
  bankNumber: '银行卡账号',
  stuNumber: '学号',
  idNum: '身份证号码',
  answer: '回答',
  problem: '问题'
}

export const otherInfoData = ['personalIntro', 'answer', 'problem']
export const importantInfoData = ['bankNumber', 'stuNumber', 'idNum', 'flowerNum', 'flowerTotalNum', 'flowerSendNum', 'workedTime']
export const basicInfoData = ['name', 'phone', 'degree', 'profession', 'position', 'field', 'score', 'company', 'direction', 'workedTime', 'school','flowerNum', 'flowerTotalNum', 'flowerSendNum', 'workedTime']
export const auditType = ['未知', '学生信息', '导师信息', '文章', '活动']
export const auditStatus = ['未知', '审核中', '通过审核', '审核中']
export default {
  infoDataMap,
  otherInfoData,
  basicInfoData,
  importantInfoData,
  auditStatus,
  auditType
}