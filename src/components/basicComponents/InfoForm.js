import React, { Component } from 'react'
import { Input} from 'antd'
import { infoDataMap, importantInfoData, otherInfoData, degreeData, sexData} from "../data/dataMap"
import {transformTime} from "../../common/scripts/utils"

class InfoForm extends Component {
  constructor(props) {
    super(props)
    this.infoDataName = Object.keys(props)
    this.infoDataValue = Object.values(props)
    this.handleInput = this.handleInput.bind(this)
  }
  handleInput(event) {
  }
  render() {
    return (
      <section>
        <h3>详细信息</h3>
        <div>
          <h1>{this.infoDataName.avatar}</h1>
          {
            this.infoDataName.map((item, index) => {
              switch (item) {
                case 'isTutor':
                case 'status':
                case 'avatar':
                  return
                  break
                case 'degree':
                  return (
                    <div key={item}>
                      <label>{infoDataMap[item]}：</label><Input value={degreeData[this.props[item]]} disabled={true}/>
                    </div>
                  )
                  break
                case 'sex':
                  return (
                    <div key={item}>
                      <label>{infoDataMap[item]}：</label><Input value={sexData[this.props[item]]} disabled={true}/>
                    </div>
                  )
                  break
                case 'idealTime':
                  return (
                    <div key={item}>
                      <label>{infoDataMap[item]}：</label><Input value={transformTime((this.props[item] / 1000),'year_month_day')} disabled={true}/>
                    </div>
                  )
                  break
                case 'admissionDate':
                case 'birthday':
                  return (
                    <div key={item}>
                      <label>{infoDataMap[item]}：</label><Input value={transformTime(this.props[item])} disabled={true}/>
                    </div>
                  )
                  break
                case 'phone':
                  return (
                    <div key={item}>
                      <label>{infoDataMap[item]}：</label><Input value={this.props[item]} onInput={this.handleInput} disabled={false}/>
                    </div>
                  )
                  break
                case 'personalIntro':
                case 'content':
                  return (
                    <div key={item}>
                      <label>{infoDataMap[item]}：</label><Input.TextArea autosize={true} value={this.props[item]}  disabled={true}/>
                    </div>
                  )
                  break
                case 'question':
                  return (
                    this.infoDataValue[index].map((item, index) => {
                      console.log(item.problem)
                      return (
                          <div key={'problem-' + index }>
                            <label>{item.problem }：</label><Input.TextArea autosize={true} value={item.answer}  disabled={true}/>
                          </div>
                        )
                    })
                  )
                  break
                default:
                  return (
                    <div key={item}>
                      <label>{infoDataMap[item]}：</label><Input value={this.props[item]} disabled={true}/>
                    </div>
                  )
              }
            })
          }
        </div>
      </section>
    )
  }
}

export default InfoForm