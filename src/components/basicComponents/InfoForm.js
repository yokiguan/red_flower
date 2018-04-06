import React, { Component } from 'react'
import { InputNumber, Button, Input, Row } from 'antd'
import { infoDataMap, importantInfoData, otherInfoData} from "../data/dataMap";

class InfoForm extends Component {
  constructor(props) {
    super(props)
    this.infoDataName = Object.keys(props)
    this.infoDataValue = Object.values(props)
    console.log(this.infoDataValue)
    this.importantInfoDataName = []
    this.otherInfoDataName = []
    this.basicInfoDataName = []
    this.handleInput = this.handleInput.bind(this)
    this.infoDataName.map((item, index) => {
        if (importantInfoData.indexOf(item) !== -1) {
          this.importantInfoDataName.push(item)
        } else if (otherInfoData.indexOf(item) !== -1) {
          this.otherInfoDataName.push(item)
        } else {
          this.basicInfoDataName.push(item)
      }
    })
  }

  handleInput(event) {
    console.log(event)
  }
  render() {
    return (
      <section>
        <h3>详细信息</h3>
        <div>
          {
            this.infoDataName.map((item, index) => {
              if (item === 'score') {
                return
              }
              if (item === 'isTutor') {
                return
              }
              if (item === 'status') {
                return
              }
              if (item === 'personalIntro' || item === 'answer') {
                return (
                  <div key={item}>
                    <label>{infoDataMap[item]}：</label><Input.TextArea autosize={true} value={this.props[item]}  disabled={true}/>
                  </div>
                )
              }
              if (item === 'phone') {
                return (
                  <div key={item}>
                    <label>{infoDataMap[item]}：</label><Input value={this.props[item]} onInput={this.handleInput} disabled={false}/>
                  </div>
                )
              }
              return (
                <div key={item}>
                  <label>{infoDataMap[item]}：</label><Input value={this.props[item]} disabled={true}/>
                </div>
              )
            })
          }
        </div>
        <br/>
        <Row>
          <label>打分</label>
          <InputNumber value={this.props['score']}/>
          <Button type="primary">提交</Button>
        </Row>
      </section>
    )
  }
}

export default InfoForm