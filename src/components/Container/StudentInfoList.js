import React, { Component } from 'react'
import { columns } from '../data/studentBasicData'
import { Table, Input} from 'antd'
import { GetStuInfoList} from "../../API/Api"
import { GetTutorInfoList, GetSchoolList, GetDirectionList } from "../../API/Api";
const Search = Input.Search
class StudentInfoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }
  componentDidMount () {
    // let schoolList = []
    // let directionList = []
    // Promise.all([
    //   GetDirectionList()
    //     .then(res => {
    //       schoolList = res.data
    //     }),
    //   GetSchoolList()
    //     .then(res => {
    //       directionList = res.data
    //     })
    // ])
    //   .then(res => {
    //     GetStuInfoList()
    //       .then(res => {
    //         res.data.map(item => {
    //           item.flowerNum = item.flowerNum || 0
    //           item.school = schoolList[item.schoolId]
    //           item.direction = directionList[item.direction]
    //         })
    //         this.setState({
    //           ...this.state,
    //           dataSource: res.data
    //         })
    //       })
    //   })
  }

  render() {
    return (
      <div>
        <Search placeholder='ss' onSearch={value => console.log(value)} style={{width: 200}}/>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
      </div>
    )
  }
}

export default StudentInfoList