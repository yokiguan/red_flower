import React, { Component } from 'react'
import { Table } from 'antd'
import { columns } from '../data/auditBasicData'
import { auditType, auditStatus} from "../data/dataMap"
import { GetAuditList, GetNormalArticle } from "../../API/Api"
import { normalizeTime } from '../../common/scripts/utils'

class AuditTable extends Component {
  constructor (props) {
    super(props)
    this.parseData = this.parseData.bind(this)
    this.state = {
      type: 1,
      status: 2
    }
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
  componentWillMount() {
    this.dataSource = [
      {
        key: '1',
        name: '郭德纲',
        content: '郭德纲提交了信息修改申请',
        date: '2018-1-2'
      }, {
        key: '2',
        name: '郭德纲',
        content: '郭德纲提交了信息修改申请',
        date: '2018-1-2'
      },{
        key: '3',
        name: '郭德纲',
        content: '郭德纲提交了信息修改申请',
        date: '2018-1-2'
      }
    ]
    this.dataSource.map((item, index) => {
      item['number'] = index + 1
      return item
    })
  }
  componentDidMount () {
    GetAuditList({type: this.state.type, status: this.state.status})
      .then(res => {
        this.setState({
          dataSource: this.parseData(res.data)
        })
        console.log(this.state.dataSource)
      })
    GetNormalArticle({page: 1})
      .then(res => {
        console.log(res)
      })
  }
  render() {

    return (
      <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
    )
  }
}

export default AuditTable