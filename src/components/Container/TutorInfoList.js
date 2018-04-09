import React, { Component } from 'react'
import { GetTutorInfoList, GetSchoolList} from "../../API/Api";
import { columns } from '../data/tutorBasicData'
import { Table, Input} from 'antd'
const Search = Input.Search
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
    const style = {
      container: {
        paddingTop: 20 + 'px'
      }
    }
    return (
      <div style={style.container}>
        <Search placeholder='搜索姓名、行业、电话号、专业。' onSearch={value => console.log(value)} style={{width: 300, marginBottom: 20 + 'px'}}/>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
      </div>
    )
  }
}

export default TutorInfoList