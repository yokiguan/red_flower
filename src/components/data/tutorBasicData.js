import React from 'react'
import BasicModal from "../basicComponents/Modal";

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
    title: '行业',
    dataIndex: 'trade',
    key: 'trade',
    filters: [
      {
        text: '互联网',
        value: 1
      },
      {
        text: '区块链',
        value: 2
      }
    ],
    filterMultiple: true,
    onFilter: (value, record) => record.trade.toString().indexOf(value) === 0
  },{
    title: '公司',
    dataIndex: 'company',
    key: 'company'
  },{
    title: '职位',
    dataIndex: 'position',
    key: 'position'
  },{
    title: '小红花充值数量',
    dataIndex: 'flowerTotalNum',
    key: 'flowerTotalNum'
  },{
    title: '小红花赠送量',
    dataIndex: 'flowerSendNum',
    key: 'flowerSendNum'
  },{
    title: '是否为导师',
    dataIndex: 'isTutor',
    key: 'isTutor',
    render: (value,record) => {
      if (value === 2) {
        return <span>是</span>
      } else {
        return <span>否</span>
      }
    },
    filters: [
      {
        text: '是',
        value: 2
      },
      {
        text: '否',
        value: 1
      }
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.isTutor.toString().indexOf(value) === 0
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (value, record) => {
      return <BasicModal index={1} infoData={record} isTutor={record.isTutor}/>
    }
  }
]

export default {
  columns
}