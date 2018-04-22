import React from 'react'
import { Button, Row, Modal } from 'antd'
import BasicModal from "../basicComponents/Modal"
import { VetoAuditItem, AgreeAuditItem} from '../../API/Api'
const tableMark = (info) => {
  return info.hasOwnProperty('pageView')? 'article': 'info'
}
const Activity = {
  '1': '活动',
  '2': '义工'
}
const veto = (event) => {
  VetoAuditItem({id: event.target.dataset.id})
    .then(res => {
      if (typeof res.code !== 'undefined' && parseInt(res.code) === 0) {
        let modal = Modal.success({
          content: '审核成功'
        })
        setTimeout(() => {
          modal.destroy()
          window.location.reload()
        }, 2000)
      } else {
        let modal = Modal.info({
          content: '审核失败'
        })
        setTimeout(() => {
          modal.destroy()
          window.location.reload()
        }, 2000)
      }
    })
    .catch(err => {
      let modal = Modal.info({
        content: '审核失败'
      })
      setTimeout(() => {
        modal.destroy()
        window.location.reload()
      }, 2000)
    })
}
const agree = (event) => {
  AgreeAuditItem({id: event.target.dataset.id})
    .then(res => {
      if (typeof res.code !== 'undefined' && parseInt(res.code) === 0) {
        let modal = Modal.success({
          content: '审核成功'
        })
        setTimeout(() => {
          modal.destroy()
          window.location.reload()
        }, 2000)
      } else {
        let modal = Modal.info({
          content: '审核失败'
        })
        setTimeout(() => {
          modal.destroy()
          window.location.reload()
        }, 2000)
      }
    })
    .catch(err => {
      let modal = Modal.info({
        content: '审核失败'
      })
      setTimeout(() => {
        modal.destroy()
        // window.location.reload()
      }, 2000)
    })
}
const renderAction = (props) => {
  if (props.status === '审核中') {
    return (
      <Row>
        <Button style={auditButtonStyle} data-id={props.id} onClick={agree} data-record={props}>通过</Button>
        <Button style={auditButtonStyle} data-id={props.id} onClick={veto} data-record={props}>不通过</Button>
        <span style={{float: 'left'}}><BasicModal infoData={props.content} userId={props.userId} mark={tableMark(props.content)}/></span>
      </Row>
    )
  } else {
    return (
      <Row>
        <span style={{float: 'left'}}><BasicModal infoData={props.content} userId={props.userId} mark={tableMark(props.content)}/></span>
      </Row>
    )
  }
}

const renderName = (value, record) => {
  if (value !== '活动') {
    return <span>{value}</span>
  } else if (typeof record.content.userRole !== 'undefined') {
    return <span>{Activity[record.content.userRole]}</span>
  } else {
    return <span>学生/导师</span>
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
    title: '用户ID',
    key: 'userId',
    dataIndex: 'userId'
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type',
    render: (value, record) => {
      return renderName(value, record)
    }
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