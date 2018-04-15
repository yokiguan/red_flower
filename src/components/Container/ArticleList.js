import React, { Component } from 'react'
import { columns } from '../data/ArticleListData'
import { Table, Button} from 'antd'
import { GetNormalArticle } from "../../API/Api"
import { normalizeTime, judgePullAjax, judgePushAjax } from '../../common/scripts/utils'
class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      selectedRowKeys: []
    }
    this.onSelectChange = this.onSelectChange.bind(this)
  }
  onSelectChange(selectedRowKeys) {
    this.setState({
      ...this.state,
      selectedRowKeys
    })
  }
  componentDidMount() {
    GetNormalArticle({page: 0})
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
        <h4>过审文章</h4>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true}  rowSelection={rowSelection}/>
        <Button>删除</Button>
      </div>
    )
  }
}

export default ArticleList