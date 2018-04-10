import React, { Component } from 'react'
import { Select } from 'antd'
export default class SelectOption extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Select defaultValue="normal">
          <Select.Option value="normal">正常</Select.Option>
          <Select.Option value="banner">Banner</Select.Option>
        </Select>
      </div>
    )
  }
}