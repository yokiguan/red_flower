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
    GetStuInfoList()
      .then(res => {
        res.data.map(item => {
          item.flowerNum = item.flowerNum || 0
          // item.school = schoolList[item.schoolId]
          // item.direction = directionList[item.direction]
        })
        this.setState({
          ...this.state,
          dataSource: res.data
        })
      })
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
    const style = {
      container: {
        paddingTop: 20 + 'px'
      }
    }
    return (
      <div style={style.container}>
        <Search placeholder='搜索姓名、学号、电话号、专业。' onSearch={value => console.log(value)} style={{width: 300, marginBottom: 20 + 'px'}}/>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
      </div>
    )
  }
}

export default StudentInfoList