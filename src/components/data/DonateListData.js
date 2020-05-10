import React from 'react'
import { Row } from 'antd'
import SelectOption from '../basicComponents/SelectOption'
import BasicModal from '../basicComponents/Modal'
import {} from '../../common/scripts/utils'
export const donates = [
  {
    title: '捐赠人',
    dataIndex: 'name',
    key: 'name'
  },{
    title: '捐赠金额',
    dataIndex: 'amount',
    key: 'amount'
  },{
    title: '捐赠时间',
    dataIndex: 'time',
    key: 'time'
  },{
    title: '联系方式',
    dataIndex: 'phone',
    key: 'phone',
  }
]

export default {
  donates
}