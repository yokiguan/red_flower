import React, { Component } from 'react'
// import BasicInfoList from '../basicComponents/InfoList'
import { columns } from '../data/tutorBasicData'
import { Table } from 'antd'
class TutorInfoList extends Component {
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
        field: '区块链',
        company: 'Tencent',
        position: 'CEO',
        flowerTotalNum: 40,
        flowerSendNum: 100,
        isTutor: 2
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

export default TutorInfoList