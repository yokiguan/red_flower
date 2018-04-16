import React from 'react'
import { Row } from 'antd'
import SelectOption from '../basicComponents/SelectOption'
import BasicModal from '../basicComponents/Modal'
import {} from '../../common/scripts/utils'
export const columns = [
  {
    title: '文章ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId'
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
            <BasicModal infoData={record} mark='article'/>
          </Row>
        )
      }
    }
  }
]

export default {
  columns
}