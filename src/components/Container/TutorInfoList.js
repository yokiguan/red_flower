import React, { Component } from 'react'
import { GetTutorInfoList, GetTradeList} from "../../API/Api";
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
    let tradeList = []
    GetTradeList()
      .then(res => JSON.parse(res))
      .then(res => {
        res.data.map(item => {
          tradeList[item.id] = item.tradeName
        })
        return 1
      })
      .then(res =>{
        GetTutorInfoList()
          .then(res => JSON.parse(res))
          .then(res => {
            res.data.map(item => {
              item.trade = item.trade !== -1? tradeList[item.trade]: '未填写'
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
        <h4>导师信息列表</h4>
        <Search placeholder='搜索姓名、行业、电话号。' onSearch={value => console.log(value)} style={{width: 300, marginBottom: 20 + 'px'}}/>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
      </div>
    )
  }
}

export default TutorInfoList