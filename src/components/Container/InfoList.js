import React, { Component } from 'react'
// import BasicInfoList from '../basicComponents/InfoList'
import { columns } from '../data/studentBasicData'
import { Table } from 'antd'
class InfoList extends Component {
  constructor(props) {
    super(props)
    this.showMoreInfo = this.showMoreInfo.bind(this)
  }

  componentWillMount() {
    this.dataSource = [
      {
        key: '1',
        name: '郭德纲',
        phone: 13279465603,
        school: '西安电子科技大学',
        degree: '硕士',
        profession: '软件工程',
        direction: '社会公益',
        score: 100,
        flowerNum: 10,
        workedTime: 10
      }
    ]
  }
  showMoreInfo (index) {
    console.log(index)
  }
  render() {
    return (
      <div>
        <Table dataSource={this.dataSource} columns={columns} bordered={true} />
      </div>
    )
  }
}

export default InfoList