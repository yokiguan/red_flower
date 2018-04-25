import React, { Component } from 'react'
import { Button, InputNumber, Modal, message } from 'antd'
import { GetFlowerRateAndMaxFlowerPerYearSwitch, EditFlowerRateAndMaxFlowerPerYearSwitch } from '../../API/Api'
export default class Rate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      EXCHANGE_RATE: 0,
      MAX_FLOWER_PER_YEAR: 0,
      visible: false,
      confirmLoading: false,
      NEW_EXCHANGE_RATE: 0,
      NEW_MAX_FLOWER_PER_YEAR: 0

    }
  }
  componentDidMount() {
    GetFlowerRateAndMaxFlowerPerYearSwitch()
      .then(res => {
        if (typeof res.code !== 'undefined' && res.code === 0) {
          console.log(res.data.filter(item => item.opKey === 'EXCHANGE_RATE')[0])
          this.setState({
            EXCHANGE_RATE: res.data.filter(item => item.opKey === 'EXCHANGE_RATE')[0].opVal,
            MAX_FLOWER_PER_YEAR: res.data.filter(item => item.opKey === 'MAX_FLOWER_PER_YEAR')[0].opVal,
            NEW_EXCHANGE_RATE: res.data.filter(item => item.opKey === 'EXCHANGE_RATE')[0].opVal,
            NEW_MAX_FLOWER_PER_YEAR: res.data.filter(item => item.opKey === 'MAX_FLOWER_PER_YEAR')[0].opVal
          })
        }
      })
  }
  handleRateInputChange = (value) => {
    if (typeof value === 'number') {
      this.setState({
        NEW_EXCHANGE_RATE: value
      })
    }
  }
  handleNumInputChange = (value) => {
    if (typeof value === 'number') {
      this.setState({
        NEW_MAX_FLOWER_PER_YEAR: value
      })
    }
  }
  handleButtonClick= () => {
    this.setState({
      visible: true
    })
  }
  handleClickOK= () =>  {
    const data = []
    data.push({
      opKey: "EXCHANGE_RATE",
      opVal: this.state.NEW_EXCHANGE_RATE.toString()
    })
    data.push({
      opKey: "MAX_FLOWER_PER_YEAR",
      opVal: this.state.NEW_MAX_FLOWER_PER_YEAR.toString()
    })
    EditFlowerRateAndMaxFlowerPerYearSwitch(JSON.stringify(data))
      .then(res => {
        message.success('修改成功')
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
  }
  handleClickCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    return (
      <section>
        <br/>
        <h4>调整小红花汇率及最大可收小红花数</h4>
        <br/>
        <label style={{width: 200 + 'px', textAlign: 'left'}}>当前汇率:&emsp;</label>
        <InputNumber disabled={true} style={{width: 250}} value={this.state.EXCHANGE_RATE}/>
        <label>（元/朵）</label>
        <br/>
        <br/>
        <label style={{width: 200 + 'px', textAlign: 'left'}}>调整后:&emsp;</label>
        <InputNumber style={{width: 250}} onChange={this.handleRateInputChange} placeholder={this.state.EXCHANGE_RATE}/>
        <label>（元/朵）</label>
        <br/>
        <br/>
        <label style={{width: 200 + 'px', textAlign: 'left'}}>当前每年最大可收小红花数:&emsp;</label>
        <InputNumber disabled={true} style={{width: 250}} value={this.state.MAX_FLOWER_PER_YEAR}/>
        <label>&emsp;（朵）</label>
        <br/>
        <br/>
        <label style={{width: 200 + 'px', textAlign: 'left'}}>调整后:&emsp;</label>
        <InputNumber style={{width: 250}} onChange={this.handleNumInputChange} placeholder={this.state.MAX_FLOWER_PER_YEAR}/>
        <label>&emsp;（朵）</label>
        <br/>
        <br/>
        <Button onClick={this.handleButtonClick}>调整</Button>
        <Modal onOk={this.handleClickOK} onCancel={this.handleClickCancel} okText='确认' cancelText='取消'  confirmLoading={this.state.confirmLoading} visible={this.state.visible} title='确认调整汇率？'>
          <label style={{width: 200 + 'px'}}>调整后的汇率:&emsp;</label>
          <InputNumber disabled={true} style={{width: 200}} value={this.state.NEW_EXCHANGE_RATE}/>
          <label>（元/朵）</label>
          <br/>
          <br/>
          <label style={{width: 200 + 'px'}}>调整后的每年最大可收小红花数:&emsp;</label>
          <InputNumber disabled={true} style={{width: 200}} value={this.state.NEW_MAX_FLOWER_PER_YEAR}/>
          <label>&emsp;（朵）</label>
        </Modal>
        <br/>
        <br/>
      </section>
    )
  }
}