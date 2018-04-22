import React, { Component } from 'react'
import { Input, Button, Modal, Spin} from 'antd'
import { infoDataMap, degreeData, sexData} from "../data/dataMap"
import { EditTutorPhone, EditStuPhone, GetResume, DownLoad} from "../../API/Api";
import {transformTime} from "../../common/scripts/utils"

class InfoForm extends Component {
  constructor(props) {
    super(props)
    this.userId = props.userId
    this.isTutor = props.isTutor
    this.avatar = ''
    this.attachList = []
    this.state = {
      loading: typeof props.question === 'undefined' && typeof props.company === 'undefined' ? true: false,
      isTutor: this.isTutor,
      attachList: this.attachList,
      avatar: this.avatar,
      phone: props.phone,
      infoDataName: Object.keys(props),
      infoDataValue: Object.values(props)
    }
  }
  handleInput = (event) => {
    this.setState({
      phone: event.target.value
    })
  }
  componentDidMount() {
    DownLoad({avatar: this.userId + '-avatar.jpg'})
      .then(res => {
        this.avatar = res.data
        this.setState({
          avatar: this.avatar
        })
      })
  }
  handleEditPhone = () => {
    if (this.isTutor === 0) {
      EditTutorPhone({id: this.userId + '/phone', value: { phone: this.state.phone}})
        .then(res => {
          let modal = Modal.success({
            content: '成功修改手机号码'
          })
          setTimeout(() => {
            modal.destroy()
          }, 3000)
        })
    } else {
      EditStuPhone({id: this.userId + '/phone', value: { phone: this.state.phone}})
        .then(res => {
          let modal = Modal.success({
            content: '成功修改手机号码'
          })
          setTimeout(() => {
            modal.destroy()
          }, 3000)
        })
    }
  }
  getResume = () => {
    const array = []
    array.push(this.userId)
    GetResume(JSON.stringify(array))
      .then(res => {
        console.log(res)
      })
  }
  componentWillReceiveProps(props) {
    const attachList = []
    Promise.all([
      DownLoad({avatar: props.userId + '-avatar.jpg'})
        .then(res => {
          this.avatar = res.data
        }),
    ]).then(() => {
      this.setState({
        infoDataName: Object.keys(props),
        infoDataValue: Object.values(props),
        phone: props.phone,
        loading: false,
        avatar: this.avatar
      })
    })

  }
  render() {
    const style = {
      avatar: {
        borderRadius: 50 + '%',
        width: 200 + 'px'
      },
      img: {
        width: 100 + 'px',
        marginRight: 20 + 'px'
      }
    }
    return (
      <section>
        <Spin spinning={this.state.loading}>
          <img src={this.state.avatar} style={style.avatar} alt="用户头像" />
          <div>
            <h1>{this.state.infoDataName.avatar}</h1>
            {
              this.state.infoDataName.map((item, index) => {
                switch (item) {
                  case 'isTutor':
                  case 'status':
                  case 'avatar':
                    return
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
                        <label>{infoDataMap[item]}：</label><Input value={this.state.phone} onChange={this.handleInput} disabled={false}/>
                        <br/>
                        <Button onClick={this.handleEditPhone}>修改手机号码</Button>
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
                      this.state.infoDataValue[index].map((item, index) => {
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
          <br/>
          <div>
            <div>
              <h4>个人附件(请在简历中查看)</h4>
              {/*{this.state.attachList.map(item =>*/}
              {/*<img src={item} style={style.img}/>*/}
              {/*)}*/}
            </div>
            <div>
              <Button onClick={this.getResume} style={{float: 'right'}}>下载简历</Button>
            </div>
          </div>
        </Spin>
      </section>
    )
  }
}

export default InfoForm