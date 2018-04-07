import React, { Component } from 'react'
// import BasicInfoList from '../basicComponents/InfoList'
import { columns } from '../data/studentBasicData'
import { Table, Input} from 'antd'
import { GetStuInfoList} from "../../API/Api"
import { GetTutorInfoList } from "../../API/Api";
const Search = Input.Search
class StudentInfoList extends Component {
  constructor(props) {
    super(props)
    this.showMoreInfo = this.showMoreInfo.bind(this)
  }
  componentDidMount () {
    GetStuInfoList()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    GetTutorInfoList()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
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
        workedTime: 10,
        simpleIntro: '我，西电，第一人',
        personalIntro: '我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，我，西电第一人，牛逼，'
      }
    ]
  }
  showMoreInfo (index) {
    console.log(index)
  }
  render() {
    return (
      <div>
        <Search placeholder='ss' onSearch={value => console.log(value)} style={{width: 200}}/>
        <Table dataSource={this.dataSource} columns={columns} bordered={true} />
      </div>
    )
  }
}

export default StudentInfoList