import React from 'react'
import { Row } from 'antd'
import SelectOption from '../basicComponents/SelectOption'
import BasicModal from '../basicComponents/Modal'
export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author'
  }, {
    title: '身份',
    dataIndex: 'role',
    key: 'role',
    render: (value) => {
      if (value === 1) {
        return (
          <span>学生</span>
        )
      } else if (value === 2) {
        return (
          <span>导师</span>
        )
      }
    }
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },{
    title: '时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (value, record) => {
      console.log(record)
      if (record.state === 1) {
        return (
          <Row style={{display: 'flex', alignItems: 'center'}}>
            <SelectOption/>
            <BasicModal infoData={record}/>
          </Row>
        )
      } else {
        return (
          <Row style={{display: 'flex', alignItems: 'center'}}>
            <BasicModal infoData={record}/>
          </Row>
        )
      }
    }
  }
]

export default {
  columns
}