import React from 'react'
import InfoModal from "../basicComponents/InfoModal"
import { degreeData} from "./dataMap"
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },{
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },{
    title: '学校',
    dataIndex: 'school',
    key: 'school'
  },{
    title: '学历',
    dataIndex: 'degree',
    key: 'degree',
    render: (value) => {
      return  <span>{degreeData[value]}</span>
    }
  },{
    title: '专业',
    dataIndex: 'profession',
    key: 'profession'
  },{
    title: '申请方向',
    dataIndex: 'direction',
    key: 'direction'
  },{
    title: '小红花余额',
    dataIndex: 'balance',
    key: 'balance'
  },{
    title: '已做义工时间',
    dataIndex: 'workedTime',
    key: 'workedTime'
  },{
    title: '分数',
    dataIndex: 'score',
    key: 'score'
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (value, record) => {
      return <InfoModal studentId={record.userId} />
    }
  }
]

export {
  columns
}