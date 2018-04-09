import React, { Component } from 'react'
import { GetTutorInfoList, GetSchoolList} from "../../API/Api";
import { columns } from '../data/tutorBasicData'
import { Table } from 'antd'
class TutorInfoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }

  componentDidMount () {
    GetTutorInfoList()
      .then(res => {
        res.data.map(item => {
          if (typeof item.flowerTotalNum === 'undefined') {
            item.flowerTotalNum = 0
          }
          if (typeof item.flowerSendNum === 'undefined') {
            item.flowerSendNum = 0
          }
        })
        this.setState({
          ...this.state,
          dataSource: res.data
        })
      })
  }

  render() {
    return (
      <div>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
      </div>
    )
  }
}

export default TutorInfoList