// 例: name --> 姓名

const infoDataMap = {
  name: '姓名',
  phone: '手机号',
  degree: '学历',
  profession: '专业',
  author: '作者',
  role: '身份',
  id: '文章ID',
  createTime: '发表时间',
  sex: '性别',
  admissionDate: '入学时间',
  birthday: '出生年月',
  position: '职位',
  clock: '时间沙漏',
  userId: '用户ID',
  balance: '小红花余额',
  field: '领域',
  academy: '学院',
  trade: '行业',
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
  problem: '问题',
  title: '标题',
  content: '正文',
  campaignName: '活动名称',
  idealTime: '理想时间',
  flowerBalance: '小红花余额',
  flowerCounter: '小红花总数',
  attachNum: '附件数'
}
const articleData = {
  id: '文章ID',
  title: '标题',
  content: '正文',
  createTime: '创建时间',
  pageView: '阅读量'
}
const otherInfoData = ['personalIntro', 'answer', 'problem']
const importantInfoData = ['bankNumber', 'stuNumber', 'idNum', 'flowerNum', 'flowerTotalNum', 'flowerSendNum', 'workedTime']
const basicInfoData = ['name', 'phone', 'degree', 'profession', 'position', 'field', 'score', 'company', 'direction', 'workedTime', 'school','flowerNum', 'flowerTotalNum', 'flowerSendNum', 'workedTime', 'trade']
const auditType = ['未知', '学生信息', '导师信息', '文章', '活动']
const auditStatus = ['未知', '审核中', '通过审核', '未通过审核']
const degreeData = ['未知', '本科', '硕士', '博士']
const sexData = ['未知', '男', '女']
export {
  infoDataMap,
  otherInfoData,
  basicInfoData,
  importantInfoData,
  auditStatus,
  auditType,
  degreeData,
  sexData,
  articleData
}