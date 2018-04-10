import React, { Component } from 'react'
import Option from '../basicComponents/Option'
export default class OptionList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      listData: [],
      listDataLength: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(key, value) {
    this.state.listData[parseInt(key) - 1].value = value
  }
  componentDidMount() {
    this.setState({
      listData: [
        {
          id: 1,
          value: '哈'
        },
        {
          id: 2,
          value: '23'
        },
        {
          id: 3,
          value: '哈哈哈'
        },
      ],
      listDataLength: this.state.listData.length
    })
    setTimeout(() => {
      this.state.listData[0].value = 'fuck'
      console.log(this.state.listData[0])
    }, 2000)
  }
  render() {
    return(
      <section style={{padding: 20 + 'px'}}>
        <h4>{this.props.data.title}</h4>
        <p>{this.props.data.info}</p>
        <Option data={this.state.listData} edit={value => this.handleChange(value)}/>
      </section>
    )
  }
}