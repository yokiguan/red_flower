import React, { Component } from 'react'
import { columns } from '../data/ArticleListData'
import { Table, Button, Pagination, Spin} from 'antd'
import { GetNormalArticle, DeleteArticle } from "../../API/Api"
import { normalizeTime, judgePullAjax, judgePushAjax } from '../../common/scripts/utils'
class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      selectedRowKeys: [],
      page: 0,
      loading: true
    }
  }
  pageChange = (page) => {
    this.setState({
      page: page,
      loaing: true
    })
    GetNormalArticle({page: page - 1})
      .then(res => {
        if (typeof res.data !== 'undefined') {
          res.data.map(item => {
            item.createTime = normalizeTime(item.createTime)
          })
          this.setState({
            dataSource: res.data,
            loading: false
          })
        } else {}
        this.setState({
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
        })
      })
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    })
  }
  onDeleteClick = () => {
    this.setState({
      loading: true
    })
    const deleteArticleArray = []
    this.state.selectedRowKeys.map((item, index) => {
      deleteArticleArray.push({
        articleId: this.state.dataSource[item].id,
        id: index
      })
    })
    deleteArticleArray.map(item => {
      DeleteArticle({id: item.articleId, value: {reason: '不符合要求'}})
        .then(() => {
          this.setState({
            dataSource: this.state.dataSource.filter(articleItem => articleItem.id !== item.articleId),
            selectedRowKeys: this.state.selectedRowKeys.filter(selectedItem => selectedItem !== item.id),
            loading: false
          })
        })
    })
  }
  componentDidMount() {
    GetNormalArticle({page: 0})
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
    const { selectedRowKeys} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const hasSelected = selectedRowKeys.length > 0;
    const style = {
      container: {
        paddingTop: 20 + 'px'
      }
    }
    return (
      <div style={style.container}>
        <h3>过审文章</h3>
        <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
          <Table dataSource={this.state.dataSource} columns={columns} bordered={true}  rowSelection={rowSelection} pagination={false}/>
          <br/>
          <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
          <br/>
          <Button onClick={this.onDeleteClick}>删除</Button>
          <br/>
          <br/>
        </Spin>
      </div>
    )
  }
}

export default ArticleList