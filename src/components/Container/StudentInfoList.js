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
    let schoolList = []
    let directionList = []
    Promise.all([
      GetSchoolList()
        .then(res => JSON.parse(res))
        .then(res => {
          res.data.map(item => {
            console.log(item)
            schoolList[item.id] = item.schoolName
          })
        }),
      GetDirectionList()
        .then(res => JSON.parse(res))
        .then(res => {
          res.data.map(item => {
            console.log(item)
            directionList[item.id] = item.directionName
          })
        }),
    ])
      .then(res => {
        GetStuInfoList()
          .then(res => JSON.parse(res))
          .then(res => {
            res.data.map(item => {
              item.flowerNum = item.flowerNum || 0
              item.school = item.schoolId !== -1? schoolList[item.schoolId]: '未填写'
              item.direction = item.direction !== -1? directionList[item.direction]: '未填写'
            })
            this.setState({
              ...this.state,
              dataSource: res.data
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
        <Search placeholder='搜索姓名、学号、电话号、专业。' onSearch={value => console.log(value)} style={{width: 300, marginBottom: 20 + 'px'}}/>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
      </div>
    )
  }
}

export default StudentInfoList