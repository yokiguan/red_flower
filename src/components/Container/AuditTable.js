import React, { Component } from 'react'
import { Table, Button, Tabs } from 'antd'
import { columns } from '../data/auditBasicData'
import { auditType, auditStatus, degreeData} from "../data/dataMap"
import { GetAuditList, GetNormalArticle } from "../../API/Api"
import { normalizeTime } from '../../common/scripts/utils'

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
      .then(res => {
        if (res.code === 1) {
          this.setState({
            ...this.state,
            dataSource: []
          })
        } else {
          this.setState({
            ...this.state,
            dataSource: this.parseData(res.data)
          })
        }
      })
  }
  changeAuditStatus (e) {
    GetAuditList({type: this.state.type, status: e.target.dataset.id})
      .then(res => {
        this.setState({
          ...this.state,
          dataSource: this.parseData(res.data)
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
    GetAuditList({type: this.state.type, status: this.state.status})
      .then(res => {
        if (res.code === 1) {
          this.setState({
            dataSource: []
          })
        } else {
          console.log(res)
          this.setState({
            dataSource: this.parseData(res.data)
          })
        }
      })
    GetNormalArticle({page: 1})
      .then(res => {
        console.log(res)
      })
  }
  render() {
    const style = {
      buttonContainer: {
        marginBottom: 10 + 'px',
        marginTop: -50 + 'px',
        marginLeft: 10 + 'px'
      },
      button: {
        marginRight: 10 + 'px'
      },
      tabContainer: {
        maxHeight: 600 + 'px'
      }
    }
    return (
      <div style={style.tabContainer}>
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