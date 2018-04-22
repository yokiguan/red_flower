import React, { Component } from 'react'
import { Table, Button, Pagination, Spin } from 'antd'
import { columns } from '../data/TradeData'
import { GetWithdrawList} from "../../API/Api"
import { judgePullAjax} from '../../common/scripts/utils'

class TradeAudit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      page: 0,
      loading: true,
      status: 1
    }
  }
  changeAuditStatus = (e) => {
    this.setState({
      loading: true,
      status: e.target.dataset.id,
      page: 0
    })
    GetWithdrawList({status: e.target.dataset.id, page: 0})
      .then(res => {
        if (judgePullAjax(res) && res.data.length > 0) {
          this.setState({
            dataSource: this.parseData(res.data),
            loading: false
          })
        } else {
          this.setState({
            dataSource: [],
            loading: false
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
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
      page: page,
      loading: true
    })
    GetWithdrawList({page: page - 1, status: this.state.status})
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            dataSource: this.parseData(res.data),
            loading: false
          })
        } else {
          this.setState({
            dataSource: [],
            loading: false
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
        })
      })
  }
  componentDidMount () {
    GetWithdrawList({page: 0, status: 1})
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            dataSource: this.parseData(res.data),
            loading: false
          })
        } else {
          this.setState({
            dataSource: [],
            loading: false
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
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
        <h3>交易审核</h3>
        <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
          <Table dataSource={this.state.dataSource} columns={columns} bordered={true} pagination={false}/>
          <br/>
          <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
          <div style={style.buttonContainer}>
            <Button style={style.button} data-id={1} onClick={this.changeAuditStatus}>查看正在审核</Button>
            <Button style={style.button} data-id={2} onClick={this.changeAuditStatus}>查看已通过</Button>
            <Button style={style.button} data-id={3} onClick={this.changeAuditStatus}>查看未通过审核</Button>
          </div>
        </Spin>
      </div>

    )
  }
}

export default TradeAudit