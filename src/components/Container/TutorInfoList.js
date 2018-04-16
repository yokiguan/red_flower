import React, { Component } from 'react'
import { GetTutorInfoList, GetTradeList} from "../../API/Api";
import { columns } from '../data/tutorBasicData'
import { Table, Input, Pagination} from 'antd'
const Search = Input.Search
class TutorInfoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      page: 1
    }
    this.tradeList = []
  }
  searchClick = (value) => {
    GetTutorInfoList({word: value})
      .then(res => JSON.parse(res))
      .then(res => {
        res.data.map(item => {
          item.trade = item.trade !== -1? this.tradeList[item.trade]: '未填写'
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
    GetTutorInfoList({page: page - 1})
      .then(res => JSON.parse(res))
      .then(res => {
        res.data.map(item => {
          item.trade = item.trade !== -1? this.tradeList[item.trade]: '未填写'
        })
        this.setState({
          dataSource: res.data
        })
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  componentDidMount () {
    GetTradeList()
      .then(res => JSON.parse(res))
      .then(res => {
        res.data.map(item => {
          this.tradeList[item.id] = item.tradeName
        })
        return GetTutorInfoList({page: this.state.page - 1})
      })
      .then(res => JSON.parse(res))
      .then(res => {
        res.data.map(item => {
          item.trade = item.trade !== -1? this.tradeList[item.trade]: '未填写'
        })
        this.setState({
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
        <h4>导师信息列表</h4>
        <Search placeholder='搜索姓名、行业、电话号。' onSearch={this.searchClick} style={{width: 300, marginBottom: 20 + 'px'}}/>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} pagination={false}/>
        <br/>
        <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
      </div>
    )
  }
}

export default TutorInfoList