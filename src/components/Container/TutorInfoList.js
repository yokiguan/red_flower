import React, { Component } from 'react'
import { GetTutorInfoList, GetTradeList} from "../../API/Api";
import { columns } from '../data/tutorBasicData'
import { Table, Input, Pagination, Spin} from 'antd'
const Search = Input.Search
class TutorInfoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      page: 1,
      loading: true
    }
    this.tradeList = []
  }
  searchClick = (value) => {
    this.setState({
      loading: true
    })
    GetTutorInfoList({word: value})
      .then(res => {
        res.data.map(item => {
          item.trade = item.trade !== -1? this.tradeList[item.trade]: '未填写'
        })
        this.setState({
          loading: false,
          dataSource: res.data
        })
      })
  }
  pageChange = (page) => {
    this.setState({
      page: page,
      loading: true,
      dataSource: []
    })
    GetTutorInfoList({page: page - 1})
      .then(res => {
        res.data.map(item => {
          item.trade = item.trade !== -1? this.tradeList[item.trade]: '未填写'
        })
        this.setState({
          dataSource: res.data,
          loading: false,
        })
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false,
        })
      })
  }
  componentDidMount () {
    GetTradeList()
      .then(res => {
        res.data.map(item => {
          this.tradeList[item.id] = item.tradeName
        })
        return GetTutorInfoList({page: this.state.page - 1})
      })
      .then(res => {
        res.data.map(item => {
          item.trade = item.trade !== -1? this.tradeList[item.trade]: '未填写'
        })
        this.setState({
          dataSource: res.data,
          loading: false
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
        <h3>导师信息列表</h3>
        <Search placeholder='搜索姓名、行业、电话号。' onSearch={this.searchClick} style={{width: 300, marginBottom: 20 + 'px'}}/>
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

export default TutorInfoList