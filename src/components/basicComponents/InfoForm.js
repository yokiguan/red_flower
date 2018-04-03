import React, { Component } from 'react'
import { InputNumber, Button } from 'antd'
import { infoDataMap} from "../data/dataMap";
const IsTutor = (props) => {
  if (props.status === 2) {
    return
  }
}
class InfoForm extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.infoDataName = Object.keys(props)
    this.infoDataValue = Object.values(props)
  }

  render() {
    return (
      <section>
        {
          this.infoDataName.map((item, index) => {
            return (
              <div key={item}>
                <span>{infoDataMap[item]}：</span><span>{this.infoDataValue[index]}</span>
              </div>
            )
          })
        }
        <div>
          打分: <InputNumber/>
        </div>
      </section>
    )
  }
}

export default InfoForm