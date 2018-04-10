import React, { Component } from 'react'
import { Checkbox, Button, Modal } from 'antd'
const CheckboxGroup = Checkbox.Group
export default class Switch extends Component {
  constructor(props) {
    super(props)
    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickOK = this.handleClickOK.bind(this)

    this.state = {
      isDisabled: true,
      currentState: '关闭',
      visible: false,
      confirmLoading: false
    }

  }
  handleCheckChange(value) {
    if (value.length === 5) {
      this.setState({
        ...this.state,
        isDisabled: false
      })
    } else {
      this.setState({
        ...this.state,
        isDisabled: true
      })
    }
  }
  handleButtonClick() {
    this.setState({
      ...this.state,
      visible: true
    })
  }
  handleClickCancel() {
    this.setState({
      ...this.state,
      visible: false
    })
  }
  handleClickOK() {
    this.setState({
      ...this.state,
      visible: false,
      currentState: '开启' === this.state.currentState? '关闭' : '开启'
    })
  }
  render() {
    const options = [
      {
        label: this.state.currentState,
        value: 1
      },
      {
        label: this.state.currentState,
        value: 2
      },
      {
        label: this.state.currentState,
        value: 3
      },
      {
        label: this.state.currentState,
        value: 4
      },
      {
        label: this.state.currentState,
        value: 5
      }
    ]
    return (
      <section>
        <br/>
        <h4>{this.state.currentState}小红花交易</h4>
        <p>
          说明：
          1、关闭小红花交易系统，将同时停止海鲸小红花（小程序）中“捐赠善款”、“赠送小红花”、“申请奖学金”这3项功能。
          <br/>

         2、关闭小红花交易系统后，方可进行“设置汇率”和“重置计数器”的操作。<br/>

         3、建议每次关闭小红花交易至少3天前发布推文，公布确切的关闭和重启时间。<br/>

         4、依次点选5个对钩，“{this.state.currentState}”键方可亮起。<br/>
        </p>
        <br/>
        <CheckboxGroup options={options} onChange={this.handleCheckChange}/>
        <br/>
        <br/>
        <Button disabled={this.state.isDisabled} onClick={this.handleButtonClick}>{this.state.currentState}交易</Button>
        <Modal
          title={this.state.currentState}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.handleClickOK}
          onCancel={this.handleClickCancel}
          okText='确认'
          cancelText='取消'
        >
          是否立即{this.state.currentState}小红花交易？
        </Modal>
        <br/>
        <br/>
      </section>
    )
  }
}