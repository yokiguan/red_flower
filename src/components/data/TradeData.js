import React from 'react'
import { Button, Row, Modal } from 'antd'
import { auditStatus } from './dataMap'
import { VetoTrade, AgreeTrade} from '../../API/Api'
const transformTime = (time) => {
  if (typeof time !== 'undefined') {
    return time.split('.')[0].replace(/T/g, ' ')
  }
}
const veto = (event) => {
  VetoTrade({id: event.target.dataset.id})
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
  AgreeTrade({id: event.target.dataset.id})
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
const renderAction = (props) => {
  if (props.status === 1) {
    return (
      <Row>
        <Button style={auditButtonStyle} data-id={props.id} onClick={agree} data-record={props}>通过</Button>
        <Button style={auditButtonStyle} data-id={props.id} onClick={veto} data-record={props}>不通过</Button>
      </Row>
    )
  } else {
    return (
      <Row>
        <span style={{float: 'left'}}></span>
      </Row>
    )
  }
}

const auditButtonStyle = {
  marginLeft: 20 + 'px'
}
export const columns = [
  {
    title: '提现人ID',
    key: 'userId',
    dataIndex: 'userId'
  },
  {
    title: '审核员ID',
    key: 'adminId',
    dataIndex: 'adminId'
  },
  {
    title: '提现小红花数额',
    key: 'amount',
    dataIndex: 'amount'
  },
  {
    title: '小红花汇率',
    key: 'exchangeRate',
    dataIndex: 'exchangeRate'
  },
  {
    title: '提交时间',
    key: 'createTime',
    dataIndex: 'createTime',
    render: (value) => {
      return <span>{transformTime(value)}</span>
    }
  },
  {
    title: '审核时间',
    key: 'checkTime',
    dataIndex: 'checkTime',
    render: (value) => {
      return <span>{transformTime(value)}</span>
    }
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    render: (value) => {
      return <span>{auditStatus[value]}</span>
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