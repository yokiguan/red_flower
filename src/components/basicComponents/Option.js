import React, { Component } from 'react'
import { List, Button, Input, Modal } from 'antd'
const Item = List.Item
const confirm = Modal.confirm
export default class Option extends Component{
  constructor(props) {
    super(props)
  }
  handleChange = (e) => {
    this.props.data.map(item => {
      if (item.id === parseInt(e.target.dataset.key)) {
        item.value = e.target.value
        return item
      } else {
        return item
      }
    })
    this.props.edit(this.props.data)
  }
  handleDelete = (e) => {
    const key = parseInt(e.target.dataset.key)
    const that = this
    confirm({
      title: '警告',
      content: '你将删除中重要信息，请确认',
      onOk() {
        let data = that.props.data.filter(item => item.id !== key)
        that.props.edit(data)
        that.props.delete(key)
      }
    })
  }
  handleAdd = (e) => {
    let data = this.props.data
    data.push({
      value: '',
      id: Date.now()
    })
    this.props.edit(data)
  }
  handleUpdate = (e) => {
    const key = parseInt(e.target.dataset.key)
    let data = this.props.data.filter(item => item.id === key)
    this.props.update(data[0])
  }
  render() {
    return (
      <div>
        <List
          style={{display: 'flex', justifyContent: 'center'}}
          dataSource={this.props.data}
          renderItem={item => (
            <Item actions={[<a onClick={this.handleUpdate} data-key={item.id}>更新</a>, <a onClick={this.handleDelete} data-key={item.id}>删除</a>]} style={{width: 400 + 'px'}}>
              <Input value={item.value} onChange={this.handleChange} data-key={item.id} />
            </Item>
          )}
          >
        </List>
        <br/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{marginLeft: -100 + 'px'}}>
            <Button onClick={this.handleAdd}>新增</Button>
          </div>
        </div>
      </div>
    )
  }
}