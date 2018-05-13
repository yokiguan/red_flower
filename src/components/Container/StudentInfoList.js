import React, { Component } from 'react'
import { columns } from '../data/studentBasicData'
import { Table, Input, Pagination, Spin} from 'antd'
import {  GetStuInfoList, GetSchoolList, GetDirectionList, GetStudentScore } from "../../API/Api";
const Search = Input.Search
class StudentInfoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      page: 0,
      loading: true
    }
    this.schoolList = []
    this.directionList = []
  }
  searchClick = (value) => {
    this.setState({
      loading: true
    })
    GetStuInfoList({word: value})
      .then(res => {
        res.data.forEach((item, index) => {
          res.data[index].key = item.userId
        })
        this.dataSource = res.data
        let scoreArray = []
        this.dataSource.map((item, index) => {
          item.key = item.userId
          item.flowerNum = item.flowerNum || 0
          item.school = item.schoolId !== -1? this.schoolList[item.schoolId]: '未填写'
          item.direction = item.direction !== -1? this.directionList[item.direction]: '未填写'
          scoreArray.push(
            GetStudentScore({id: item.userId})
              .then(res => {
                this.dataSource[index].score = res.data
              })
          )
        })
        Promise.all(scoreArray)
          .then(res => {
            this.setState({
              dataSource: this.dataSource,
              loading: false
            })
          })
      })
  }
  pageChange = (page) => {
    this.setState({
      page: page,
      loading: true
    })
    GetStuInfoList({page: page - 1})
      .then(res => {
        res.data.forEach((item, index) => {
          res.data[index].key = item.userId
        })
        this.dataSource = res.data
        let scoreArray = []
        this.dataSource.map((item, index) => {
          item.key = item.userId
          item.flowerNum = item.flowerNum || 0
          item.school = item.schoolId !== -1? this.schoolList[item.schoolId]: '未填写'
          item.direction = item.direction !== -1? this.directionList[item.direction]: '未填写'
          scoreArray.push(
            GetStudentScore({id: item.userId})
              .then(res => {
                this.dataSource[index].score = res.data
              })
          )
        })
        Promise.all(scoreArray)
          .then(res => {
            this.setState({
              dataSource: this.dataSource,
              loading: false
            })
          })
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
        })
      })
  }
  componentDidMount () {
    Promise.all([
      GetSchoolList()
        .then(res => {
          res.data.map(item => {
            this.schoolList[item.id] = item.schoolName
          })
        }),
      GetDirectionList()
        .then(res => {
          res.data.map(item => {
            this.directionList[item.id] = item.directionName
          })
        })
    ])
      .then(res => {
        GetStuInfoList({page: this.state.page})
          .then(res => {
            res.data.forEach((item, index) => {
              res.data[index].key = item.userId
            })
            this.dataSource = res.data
            let scoreArray = []
            this.dataSource.map((item, index) => {
              item.key = item.userId
              item.flowerNum = item.flowerNum || 0
              item.school = item.schoolId !== -1? this.schoolList[item.schoolId]: '未填写'
              item.direction = item.direction !== -1? this.directionList[item.direction]: '未填写'
              scoreArray.push(
                GetStudentScore({id: item.userId})
                .then(res => {
                  this.dataSource[index].score = res.data
                })
              )
            })
            Promise.all(scoreArray)
              .then(res => {
                this.setState({
                  dataSource: this.dataSource,
                  loading: false
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
        <h3>学生信息列表</h3>
        <Search placeholder='搜索姓名、学号、电话号、专业。' onSearch={this.searchClick} style={{width: 300, marginBottom: 20 + 'px'}}/>
        <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
          <Table dataSource={this.state.dataSource} columns={columns} bordered={true} pagination={false}/>
          <br/>
          <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
          <br/>
          <br/>
        </Spin>
      </div>
    )
  }
}

export default StudentInfoList