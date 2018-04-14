import React, { Component } from 'react'
import { Table, Button, Tabs } from 'antd'
import { columns } from '../data/auditBasicData'
import { auditType, auditStatus, degreeData} from "../data/dataMap"
import { GetAuditList, GetNormalArticle } from "../../API/Api"
import { normalizeTime, judgePullAjax, judgePushAjax } from '../../common/scripts/utils'

class AuditTable extends Component {
  constructor (props) {
    super(props)
    this.parseData = this.parseData.bind(this)
    this.changeAuditType = this.changeAuditType.bind(this)
    this.changeAuditStatus = this.changeAuditStatus.bind(this)
    this.state = {
      type: 1,
      status: 2,
      auditType: {
        student: 1,
        tutor: 2,
        article: 3,
        activity: 4
      }
    }
  }
  changeAuditType (value) {
    this.setState({
      ...this.state,
      type: this.state.auditType[value]
    })
    GetAuditList({type: this.state.auditType[value], status: 1})
      .then(res => JSON.parse(res))
      .then(res => {
        if (judgePullAjax(res) && res.data.length > 0) {
          this.setState({
            ...this.state,
            dataSource: this.parseData(res.data)
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  changeAuditStatus (e) {
    GetAuditList({type: this.state.type, status: e.target.dataset.id})
      .then(res => JSON.parse(res))
      .then(res => {
        if (judgePullAjax(res) && res.data.length > 0) {
          this.setState({
            ...this.state,
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
      item.status = auditStatus[item.status]
      item.type = auditType[item.type]
      item.number = index + 1
      item.content = JSON.parse(item.content)
      item.name = item.content.name
      item.applyTime = normalizeTime(item.applyTime)
      result.push(item)
    })
    return result
  }
  componentDidMount () {
    this.changeAuditType('student')
    // GetAuditList({type: this.state.type, status: this.state.status})
    //   .then(res => JSON.parse(res))
    //   .then(res => {
    //     if (res.code === 0 && res.data.length > 0) {
    //       this.setState({
    //         dataSource: this.parseData(res.data)
    //       })
    //     } else {
    //       this.setState({
    //         dataSource: []
    //       })
    //     }
    //   })
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
        <h4>审核管理</h4>
        <Tabs size='large' type='line' onChange={this.changeAuditType}>
          <Tabs.TabPane key='student' tab='学生信息'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
          <Tabs.TabPane key='tutor' tab='导师信息'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
          <Tabs.TabPane key='activity' tab='活动申请'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
          <Tabs.TabPane key='volunteer' tab='义工申请'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
          <Tabs.TabPane key='withdraw' tab='提现申请'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
          <Tabs.TabPane key='article' tab='文章审核'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
        </Tabs>
        <div style={style.buttonContainer}>
          <Button style={style.button} data-id={1} onClick={this.changeAuditStatus}>查看正在审核</Button>
          <Button style={style.button} data-id={2} onClick={this.changeAuditStatus}>查看已通过</Button>
          <Button style={style.button} data-id={3} onClick={this.changeAuditStatus}>查看未通过审核</Button>
        </div>
      </div>

    )
  }
}

export default AuditTable