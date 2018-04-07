import React, { Component } from 'react'
import {} from 'antd'
export default class Img extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      id: ''
    }
  }

  componentDidMount() {
    // this.state
  }

  render() {
    return (
      <img src={this.state.url}/>
    )
  }
}