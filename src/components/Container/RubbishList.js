import React, { Component } from 'react'
import { columns } from '../data/ArticleListData'
import { Table, Button} from 'antd'
import { GetNormalArticle } from "../../API/Api";
export default class RubbishList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      selectedRowKeys: []
    }
    this.onSelectChange = this.onSelectChange.bind(this)
    let article = {
      id: 2,
      title: '干',
      author: 'fuck',
      role: 1,
      content: '哈哈哈哈哈',
      createTime: '2018-8-8',
      state: 2
    }
    this.state.dataSource.push(article)
  }
  onSelectChange(selectedRowKeys) {
    this.setState({
      ...this.state,
      selectedRowKeys
    })
  }
  componentDidMount() {
    GetNormalArticle({page: 1})
      .then(res => {
        if (res.code === 0) {
          // this.state.dataSource = res.data
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
      },
      button: {
        marginBottom: 20 + 'px'
      }
    }
    return (
      <div style={style.container}>
        <h4>垃圾箱</h4>
        <Table dataSource={this.state.dataSource} columns={columns} bordered={true}  rowSelection={rowSelection}/>
        <Button style={style.button}>恢复</Button>
      </div>
    )
  }
}