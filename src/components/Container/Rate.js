import React, { Component } from 'react'
import { Input, Button, InputNumber, Modal } from 'antd'
import { GetFlowerRate } from '../../API/Api'
export default class Rate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rate: 0,
      visible: false,
      confirmLoading: false
    }
  }
  componentDidMount() {
    GetFlowerRate()
      .then(res => JSON.stringify(res))
      .then(res => {
        if (res.code === 0) {
          this.setState({
            rate: res.data
          })
        }
      })
  }
  handleInputChange = (value) => {
    if (typeof value === 'number') {
      this.setState({
        rate: value
      })
    }
  }
  handleButtonClick= () => {
    this.setState({
      ...this.state,
      visible: true
    })
  }
  handleClickOK= () =>  {
    console.log(123)
  }
  handleClickCancel = () => {
    this.setState({
      ...this.state,
      visible: false
    })
  }
  render() {
    return (
      <section>
        <br/>
        <h4>调整小红花汇率</h4>
        <br/>
        <label style={{width: 100 + 'px'}}>当前汇率:&emsp;</label>
        <InputNumber disabled={true} style={{width: 250}} value={this.state.rate}/>
        <label>（元/朵）</label>
        <br/>
        <br/>
        <label style={{width: 100 + 'px'}}>新汇率:&emsp;</label>
        <InputNumber style={{width: 250}} onChange={this.handleInputChange}/>
        <label>（元/朵）</label>
        <br/>
        <br/>
        <Button onClick={this.handleButtonClick}>调整</Button>
        <Modal onOk={this.handleClickOK} onCancel={this.handleClickCancel} okText='确认' cancelText='取消'  confirmLoading={this.state.confirmLoading} visible={this.state.visible} title='确认调整汇率？'>
          <label style={{width: 120 + 'px'}}>调整后的汇率:&emsp;</label>
          <InputNumber disabled={true} style={{width: 200}} value={this.state.rate}/>
          <label>（元/朵）</label>
        </Modal>
        <br/>
        <br/>
      </section>
    )
  }
}