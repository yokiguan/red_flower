import React, { Component } from 'react'
import { List, Button, Input } from 'antd'
const Item = List.Item
export default class Option extends Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      data: props.data
    }
  }
  handleChange(e) {
    console.log(e.target.value)
    console.log(e.target.dataset.key)
    this.props.edit(e.target.dataset.key, e.target.value)
  }
  render() {
    return (
      <div>
        <List
          dataSource={this.props.data}
          renderItem={item => (
            <Item actions={[<a>edit</a>, <a>delete</a>]}>
              <Input value={item.value} onChange={this.handleChange} data-key={item.id}/>
            </Item>
          )}
          >
        </List>
        <br/>
        <Button>添加</Button>
        <Button>更新</Button>
      </div>
    )
  }
}