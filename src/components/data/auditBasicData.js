import React from 'react'
import { Button, Row } from 'antd'
import BasicModal from "../basicComponents/Modal"
import { VetoAuditItem, AgreeAuditItem} from '../../API/Api'
const veto = (event) => {
  VetoAuditItem({id: event.target.dataset.id})
    .then(res => {
      console.log(res)
    })
}
const agree = (event) => {
  AgreeAuditItem({id: event.target.dataset.id})
    .then(res => {
      console.log(res)
    })
}
const renderAction = (props) => {
  if (props.status === '审核中') {
    return (
      <Row>
        <Button style={auditButtonStyle} data-name={props.id} onClick={agree}>通过</Button>
        <Button style={auditButtonStyle} data-id={props.id} onClick={veto} data-record={props}>不通过</Button>
        <span style={{float: 'left'}}><BasicModal infoData={props.content} userId={props.userId}/></span>
      </Row>
    )
  } else {
    return (
      <Row>
        <span style={{float: 'left'}}><BasicModal infoData={props.content} userId={props.userId}/></span>
      </Row>
    )
  }

}
const auditButtonStyle = {
  marginLeft: 20 + 'px'
}
export const columns = [
  {
    title: '序号',
    key: 'number',
    dataIndex: 'number'
  },
  {
    title: '申请人',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '用户ID',
    key: 'userId',
    dataIndex: 'userId'
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type'
  },
  {
    title: '日期',
    key: 'applyTime',
    dataIndex: 'applyTime'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    render: (value, record) => {
      return renderAction(record)
    }
  }
]

export default {
  columns
}