import React, { Component } from 'react'
import { columns } from '../data/studentBasicData'
import { Table, Input, Pagination} from 'antd'
import {  GetStuInfoList, GetSchoolList, GetDirectionList, GetStudentScore } from "../../API/Api";
const Search = Input.Search
class StudentInfoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      page: 0
    }
    this.schoolList = []
    this.directionList = []
  }
  searchClick = (value) => {
    GetStuInfoList({word: value})
      .then(res => JSON.parse(res))
      .then(res => {
        res.data.map(item => {
          item.flowerNum = item.flowerNum || 0
          item.school = item.schoolId !== -1? this.schoolList[item.schoolId]: '未填写'
          item.direction = item.direction !== -1? this.directionList[item.direction]: '未填写'
        })
        this.setState({
          ...this.state,
          dataSource: res.data
        })
      })
  }
  pageChange = (page) => {
    this.setState({
      page: page
    })
    GetStuInfoList({page: page - 1})
      .then(res => JSON.parse(res))
      .then(res => {
        this.dataSource = res.data
        this.dataSource.map((item, index) => {
          item.flowerNum = item.flowerNum || 0
          item.school = item.schoolId !== -1? this.schoolList[item.schoolId]: '未填写'
          item.direction = item.direction !== -1? this.directionList[item.direction]: '未填写'
          GetStudentScore({id: item.userId})
            .then(res => JSON.parse(res))
            .then(res => {
              this.dataSource[index].score = res.data
              this.setState({
                dataSource: this.dataSource
              })
            })
        })
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  componentDidMount () {
    Promise.all([
      GetSchoolList()
        .then(res => JSON.parse(res))
        .then(res => {
          res.data.map(item => {
            this.schoolList[item.id] = item.schoolName
          })
        }),
      GetDirectionList()
        .then(res => JSON.parse(res))
        .then(res => {
          res.data.map(item => {
            this.directionList[item.id] = item.directionName
          })
        })
    ])
      .then(res => {
        GetStuInfoList({page: this.state.page})
          .then(res => JSON.parse(res))
          .then(res => {
            this.dataSource = res.data
            this.dataSource.map((item, index) => {
              item.flowerNum = item.flowerNum || 0
              item.school = item.schoolId !== -1? this.schoolList[item.schoolId]: '未填写'
              item.direction = item.direction !== -1? this.directionList[item.direction]: '未填写'
              GetStudentScore({id: item.userId})
                .then(res => JSON.parse(res))
                .then(res => {
                  this.dataSource[index].score = res.data
                  this.setState({
                    dataSource: this.dataSource
                  })
                })
            })
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
        <h4>学生信息列表</h4>
        <Search placeholder='搜索姓名、学号、电话号、专业。' onSearch={this.searchClick} style={{width: 300, marginBottom: 20 + 'px'}}/>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} pagination={false}/>
        <br/>
        <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
      </div>
    )
  }
}

export default StudentInfoList