import React from 'react'
import BasicModal from "../basicComponents/Modal"
import { degreeData} from "./dataMap";

export const columns = [
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
    dataIndex: 'schoolId',
    key: 'schoolId'
  },{
    title: '学历',
    dataIndex: 'degree',
    key: 'degree',
    render: (value) => {
      return degreeData[value]
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
    title: '小红花数',
    dataIndex: 'flowerNum',
    key: 'flowerNum'
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
      return <BasicModal index={1} infoData={record}/>
    }
  }
]

export default {
  columns
}