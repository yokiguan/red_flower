import React, { Component } from 'react'
import { Input, Button, Modal, Spin, message} from 'antd'
import { infoDataMap, degreeData, sexData} from "../data/dataMap"
import { EditTutorPhone, EditStuPhone, GetResume, DownLoad} from "../../API/Api";
import {transformTime, DownLoadResume} from "../../common/scripts/utils"

class InfoForm extends Component {
  constructor(props) {
    super(props)
    console.log(props)
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
      infoDataValue: Object.values(props),
      fileUrl: '',
      isStudent: props.hasOwnProperty('schoolId'),
      hasResume: false,
      resumeLoading: false
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
    this.setState({
      resumeLoading: true
    })
    DownLoadResume(this.userId)
      .then(res => {
        this.setState({
          fileUrl: window.URL.createObjectURL(res),
          hasResume: true,
          resumeLoading: false
        })
      })
      .catch(err => {
        message.error('获取简历失败')
        this.setState({
          resumeLoading: false,
          hasResume: false,
        })
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
      this.userId = props.userId
      this.setState({
        infoDataName: Object.keys(props),
        infoDataValue: Object.values(props),
        phone: props.phone,
        loading: false,
        avatar: this.avatar,
        isStudent: props.hasOwnProperty('schoolId'),isStudent: props.hasOwnProperty('schoolId')
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
          <Spin spinning={this.state.resumeLoading}>
            <div hidden={!this.state.isStudent}>
              <div>
                <h4>个人附件(请在简历中查看)</h4>
              </div>
              <div>
                <Button onClick={this.getResume} style={{float: 'right'}}>获取简历</Button>
                <a download href={this.state.fileUrl} target='_blank' hidden={!this.state.hasResume}>下载简历</a>
              </div>
            </div>
          </Spin>
        </Spin>
      </section>
    )
  }
}

export default InfoForm