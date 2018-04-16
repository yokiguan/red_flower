import React, { Component } from 'react'
import { columns } from '../data/ArticleListData'
import { Table, Button, Pagination} from 'antd'
import { GetArticleGarbage } from "../../API/Api"
import { normalizeTime, judgePullAjax, judgePushAjax } from '../../common/scripts/utils'
class ArticleGarbage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      page: 0
    }
  }
  pageChange = (page) => {
    this.setState({
      page: page
    })
    GetArticleGarbage({page: page - 1})
      .then(res => JSON.parse(res))
      .then(res => {
        if (typeof res.data !== 'undefined') {
          res.data.map(item => {
            item.createTime = normalizeTime(item.createTime)
          })
          this.setState({
            dataSource: res.data
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  componentDidMount() {
    GetArticleGarbage({page: 0})
      .then(res => JSON.parse(res))
      .then(res => {
        if (typeof res.data !== 'undefined') {
          res.data.map(item => {
            item.createTime = normalizeTime(item.createTime)
          })
          this.setState({
            dataSource: res.data
          })
        }
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
        <h4>文章垃圾箱</h4>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true} pagination={false}/>
        <br/>
        <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
        <br/>
        <br/>
      </div>
    )
  }
}

export default ArticleGarbage