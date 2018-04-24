import React from 'react'
import { Button, Row, Modal } from 'antd'
import { DeleteInviteCode } from '../../API/Api'

const deleteInviteCode = (event) => {
  DeleteInviteCode({id: event.target.dataset.id})
    .then(res => {
      if (typeof res.code !== 'undefined' && parseInt(res.code) === 0) {
        let modal = Modal.success({
          content: '删除成功'
        })
        setTimeout(() => {
          modal.destroy()
          window.location.reload()
        }, 2000)
      } else {
        let modal = Modal.info({
          content: '删除失败'
        })
        setTimeout(() => {
          modal.destroy()
        }, 2000)
      }
    })
    .catch(err => {
      let modal = Modal.info({
        content: '网络错误'
      })
      setTimeout(() => {
        modal.destroy()
      }, 2000)
    })
}

const renderAction = (props) => {
  if (props.status === 0) {
    return (
      <Row>
        <Button style={auditButtonStyle} data-id={props.id} onClick={deleteInviteCode} data-record={props}>删除</Button>
      </Row>
    )
  } else {
    return (
      <span></span>
    )
  }
}

const auditButtonStyle = {
  marginLeft: 20 + 'px'
}
export const columns = [
  {
    title: '邀请码',
    key: 'code',
    dataIndex: 'code'
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type',
    render: (value) => {
      if (value === 1) {
        return <span>学生</span>
      } else {
        return <span>导师</span>
      }
    }
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    render: (value) => {
      if (value === 1) {
        return <span>不可用</span>
      } else {
        return <span>可用</span>
      }
    }
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