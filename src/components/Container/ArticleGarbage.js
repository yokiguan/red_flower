import React, { Component } from 'react'
import { columns } from '../data/ArticleListData'
import { Table, Pagination, Spin} from 'antd'
import { GetArticleGarbage } from "../../API/Api"
import { normalizeTime, judgePullAjax, judgePushAjax } from '../../common/scripts/utils'
class ArticleGarbage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      page: 0,
      loading: true
    }
  }
  pageChange = (page) => {
    this.setState({
      page: page,
      loading: true
    })
    GetArticleGarbage({page: page - 1})
      .then(res => JSON.parse(res))
      .then(res => {
        if (typeof res.data !== 'undefined') {
          res.data.map(item => {
            item.createTime = normalizeTime(item.createTime)
          })
          this.setState({
            dataSource: res.data,
            loading: false
          })
        } else {
          this.setState({
            loading: false
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
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
            dataSource: res.data,
            loading: false
          })
        } else {
          this.setState({
            loading: false
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

export default ArticleGarbage