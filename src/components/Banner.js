import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Breadcrumb, Table, Button } from 'react-bootstrap'

class Banner extends Component {
  constructor (props) {
    super(props)
    this.styles = {
      ListGroupItem: {
        display: 'flex',
        flexFlow: 'row nowrap'
      },
      edit: {
        color: '#3f96e2',
        cursor: 'pointer'
      },
      sort: {
        textAlign: 'center',
        color: '#3f96e2',
        cursor: 'pointer'
      },
      button: {
        display: 'flex',
        justifyContent: 'center'
      }
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    console.log('hello')
  }
  render () {
    return (
      <div style={{marginTop: 100 + 'px'}}>
        <Breadcrumb>
          <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          <Breadcrumb.Item active>轮播图</Breadcrumb.Item>
        </Breadcrumb>
        <Table striped={true} bordered={true} hover={true} responsive={true}>
          <thead>
            <tr>
              <th>#</th>
              <th>当前文章</th>
              <th>图片链接</th>
              <th>作者</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>泰坦尼克号幸存者预测</td>
              <td><a href='http://www.hao123.com' target='_blank'>http://www.hao123.com</a></td>
              <td>Van</td>
              <td style={this.styles.edit}>修改</td>
            </tr>
            <tr>
              <td>2</td>
              <td>这个世界有外星人吗</td>
              <td><a href='http://www.hao123.com' target='_blank'>http://www.hao123.com</a></td>
              <td>Van</td>
              <td style={this.styles.edit}>修改</td>
            </tr>
            <tr>
              <td>3</td>
              <td>你会AI吗</td>
              <td><a href='http://www.hao123.com' target='_blank'>http://www.hao123.com</a></td>
              <td>Van</td>
              <td style={this.styles.edit}>修改</td>
            </tr>
            <tr>
              <td>4</td>
              <td>精通区块链</td>
              <td><a href='http://www.hao123.com' target='_blank'>http://www.hao123.com</a></td>
              <td>Van</td>
              <td style={this.styles.edit}>修改</td>
            </tr>
            <tr>
              <td colSpan={5} style={this.styles.sort}>修改顺序</td>
            </tr>
          </tbody>
        </Table>
        <div style={this.styles.button}>
          <Button bsStyle="primary" style={{textAlign: 'center'}}>提交更改</Button>
        </div>
      </div>
    )
  }
}
export default Banner