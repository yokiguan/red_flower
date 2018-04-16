import React, { Component } from 'react'
import { Table, Button, Pagination } from 'antd'
import { columns } from '../data/TradeData'
import { auditType, auditStatus, degreeData} from "../data/dataMap"
import { GetWithdrawList} from "../../API/Api"
import { normalizeTime, judgePullAjax, judgePushAjax } from '../../common/scripts/utils'

class TradeAudit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      page: 0,
    }
  }
  changeAuditStatus = (e) => {
    GetWithdrawList({status: e.target.dataset.id, page: 0})
      .then(res => JSON.parse(res))
      .then(res => {
        if (judgePullAjax(res) && res.data.content.length > 0) {
          this.setState({
            dataSource: this.parseData(res.data)
          })
        } else {
          this.setState({
            dataSource: []
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  parseData (data) {
    const result = []
    data.map((item, index) => {
      result.push(item)
    })
    return result
  }
  pageChange = (page) => {
    this.setState({
      page: page
    })
    GetWithdrawList({page: page - 1, status: 1})
      .then(res => JSON.parse(res))
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            dataSource: this.parseData(res.data)
          })
        } else {
          this.setState({
            dataSource: []
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  componentDidMount () {
    GetWithdrawList({page: 0, status: 1})
      .then(res => JSON.parse(res))
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            dataSource: this.parseData(res.data)
          })
        } else {
          this.setState({
            dataSource: []
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  render() {
    const style = {
      buttonContainer: {
        marginBottom: 10 + 'px',
        marginLeft: 10 + 'px',
        padding: 20 + 'px'
      },
      button: {
        marginRight: 10 + 'px'
      },
      tabContainer: {
        maxHeight: 1200 + 'px'
      }
    }
    return (
      <div>
        <br/>
        <h4>交易审核</h4>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} pagination={false}/>
        <br/>
        <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
        <div style={style.buttonContainer}>
          <Button style={style.button} data-id={1} onClick={this.changeAuditStatus}>查看正在审核</Button>
          <Button style={style.button} data-id={2} onClick={this.changeAuditStatus}>查看已通过</Button>
          <Button style={style.button} data-id={3} onClick={this.changeAuditStatus}>查看未通过审核</Button>
        </div>
      </div>

    )
  }
}

export default TradeAudit