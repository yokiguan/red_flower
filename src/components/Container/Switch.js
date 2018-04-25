import React, { Component } from 'react'
import { Checkbox, Button, Modal, message } from 'antd'
import { GetFlowerRateAndMaxFlowerPerYearSwitch, EditFlowerRateAndMaxFlowerPerYearSwitch } from '../../API/Api'
const CheckboxGroup = Checkbox.Group
export default class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDisabled: true,
      nextState: '开启',
      visible: false,
      confirmLoading: false
    }
  }
  componentDidMount() {
    GetFlowerRateAndMaxFlowerPerYearSwitch()
      .then(res => {
        this.setState({
          nextState: res.data.filter(item => item.opKey === 'MARKET_SWITCH')[0].opVal === "1" ? '关闭': '开启'
        })
      })
  }
  handleCheckChange = (value) => {
    if (value.length === 5) {
      this.setState({
        isDisabled: false
      })
    } else {
      this.setState({
        isDisabled: true
      })
    }
  }
  handleButtonClick = () => {
    this.setState({
      visible: true
    })
  }
  handleClickCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleClickOK = () =>{
    if (this.state.nextState === '关闭') {
      const data = [
        {
          opKey: "MARKET_SWITCH",
          opVal: "0"
        }
      ]
      EditFlowerRateAndMaxFlowerPerYearSwitch(JSON.stringify(data))
        .then(res => {
          message.success('操作成功')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
        .catch(err => {
          message.error('操作失败')
        })
    } else {
      const data = [
        {
          opKey: "MARKET_SWITCH",
          opVal: "1"
        }
      ]
      EditFlowerRateAndMaxFlowerPerYearSwitch(JSON.stringify(data))
        .then(res => {
          message.success('操作成功')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
        .catch(err => {
          message.error('操作失败')
        })
    }
  }
  render() {
    const options = [
      {
        label: this.state.nextState,
        value: 1
      },
      {
        label: this.state.nextState,
        value: 2
      },
      {
        label: this.state.nextState,
        value: 3
      },
      {
        label: this.state.nextState,
        value: 4
      },
      {
        label: this.state.nextState,
        value: 5
      }
    ]
    return (
      <section>
        <br/>
        <h3>{this.state.nextState}小红花交易</h3>
        <p>
          说明：
          1、关闭小红花交易系统，将同时停止海鲸小红花（小程序）中“捐赠善款”、“赠送小红花”、“申请奖学金”这3项功能。
          <br/>

         2、关闭小红花交易系统后，方可进行“设置汇率”和“重置计数器”的操作。<br/>

         3、建议每次关闭小红花交易至少3天前发布推文，公布确切的关闭和重启时间。<br/>

         4、依次点选5个对钩，“{this.state.nextState}”键方可亮起。<br/>
        </p>
        <br/>
        <CheckboxGroup options={options} onChange={this.handleCheckChange}/>
        <br/>
        <br/>
        <Button disabled={this.state.isDisabled} onClick={this.handleButtonClick}>{this.state.nextState}交易</Button>
        <Modal
          title={this.state.nextState}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onOk={this.handleClickOK}
          onCancel={this.handleClickCancel}
          okText='确认'
          cancelText='取消'
        >
          是否立即{this.state.nextState}小红花交易？
        </Modal>
        <br/>
        <br/>
      </section>
    )
  }
}