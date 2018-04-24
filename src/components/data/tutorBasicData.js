import React from 'react'
import InfoModal from "../basicComponents/InfoModal";

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
    key: 'trade'
  },{
    title: '公司',
    dataIndex: 'company',
    key: 'company'
  },{
    title: '职位',
    dataIndex: 'position',
    key: 'position'
  },{
    title: '小红花余额',
    dataIndex: 'balance',
    key: 'balance'
  },{
    title: '沙漏余额',
    dataIndex: 'clock',
    key: 'clock'
  },{
    title: '是否为导师',
    dataIndex: 'isTutor',
    key: 'isTutor',
    render: (value) => {
      if (value === 'true') {
        return <span>是</span>
      } else {
        return <span>否</span>
      }
    },
    filters: [
      {
        text: '是',
        value: true
      },
      {
        text: '否',
        value: false
      }
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.isTutor.toString().indexOf(value) === 0
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (value, record) => {
      return <InfoModal tutorId={record.userId} />
    }
  }
]

export default {
  columns
}