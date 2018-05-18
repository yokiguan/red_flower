import React, { Component } from 'react'
import { Input, Button, Modal, Spin, message} from 'antd'
import { infoDataMap, degreeData, sexData} from "../data/dataMap"
import { EditTutorPhone, EditStuPhone, DownLoad, GetTradeList, GetSchoolList, GetDirectionList, GetStuAnswer, GetQuestionList, EditVoluntary} from "../../API/Api";
import {transformTime, DownLoadResume} from "../../common/scripts/utils"

class InfoForm extends Component {
  constructor(props) {
    super(props)
    this.userId = props.userId
    this.isTutor = props.isTutor
    this.avatar = ''
    this.attachList = []
    this.state = {
      loading: typeof props.question === 'undefined' && typeof props.company === 'undefined' && !props.hasOwnProperty('id'),
      isTutor: this.isTutor,
      attachList: this.attachList,
      avatar: this.avatar,
      phone: props.phone,
      infoDataName: Object.keys(props),
      infoDataValue: Object.values(props),
      fileUrl: '',
      isStudent: props.hasOwnProperty('schoolId'),
      hasResume: false,
      resumeLoading: false,
    }
    console.log(`当前用户为${this.userId}`)
  }
  handleInput = (event) => {
    this.setState({
      phone: event.target.value
    })
  }
  handleInputWorkedTime = (event) => {
    this.setState({
      workedTime: event.target.value
    })
  }
  componentDidMount() {
    this.setState({
      loading: true
    })
    const school = this.state.infoDataName.indexOf('schoolId')
    const trade = this.state.infoDataName.indexOf('trade')
    const direction = this.state.infoDataName.indexOf('direction')
    const answer = []
    Promise.all([
      GetQuestionList()
        .then(res => {
          this.questionList = res.data
        }),
      GetSchoolList()
        .then(res => {
          this.schoolList = res.data
        }),
      GetDirectionList()
        .then(res => {
          this.directionList = res.data
        }),
      GetTradeList()
        .then(res => {
          this.tradeList = res.data
        }),
      DownLoad({avatar: this.userId + '-avatar.jpg'})
        .then(res => {
          this.avatar = res.data
          this.setState({
            avatar: this.avatar
          })
        })
    ])
      .then(() => {
        GetStuAnswer({id: this.props.userId, answer: 'answer'})
          .then(res => {
            this.answerList = res.data
            this.answerList.map(answerItem => {
              answer.push({
                problem: this.questionList.filter(questionItem => questionItem.id === answerItem.questionId)[0].title,
                answer: answerItem.answerContent
              })
            })
            const name = this.state.infoDataName
            const copy = this.state.infoDataValue
            if (school !== -1) {
              copy[school] = copy[school] !== -1? this.schoolList.filter(schoolItem => schoolItem.id === copy[school])[0].schoolName: '未填写'
            }
            if (direction !== -1) {
              copy[direction] = copy[direction] !== -1? this.directionList.filter(directionItem => directionItem.id === copy[direction])[0].directionName: '未填写'
            }
            if (trade !== -1) {
              copy[trade] = copy[trade] !== -1? this.tradeList.filter(tradeItem => tradeItem.id === copy[trade])[0].tradeName: '未填写'
            }
            if (answer.length > 0) {
              copy.push(answer)
              name.push('question')
            }
            this.setState({
              loading: false,
              infoDataValue: copy,
              infoDataName: name
            })
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
  handleEditWorkedTime =() => {
    EditVoluntary(JSON.stringify({stuId: this.userId, workedTime: this.state.workedTime}))
      .then(res => {
        let modal = Modal.success({
          content: '成功修改义工时间'
        })
        setTimeout(() => {
          modal.destroy()
        }, 3000)
      })
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
    console.log(props)
    Promise.all([
      DownLoad({avatar: this.userId + '-avatar.jpg'})
        .then(res => {
          this.avatar = res.data
        }),
    ]).then(() => {
      this.setState({
        infoDataName: Object.keys(props),
        infoDataValue: Object.values(props),
        phone: props.phone,
        loading: false,
        workedTime: props.workedTime,
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
                  case 'id':
                  case 'status':
                  case 'createTime':
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
                  case 'workedTime':
                    return (
                      <div key={item}>
                        <label>{infoDataMap[item]}：</label><Input value={this.state.workedTime} onChange={this.handleInputWorkedTime} disabled={false}/>
                        <br/>
                        <Button onClick={this.handleEditWorkedTime}>修改义工时间</Button>
                      </div>
                    )
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
                  case 'userRole':
                    return (
                      <div key={item}>
                        <label>{infoDataMap[item]}：</label><Input value={this.props[item] === 2? '导师' : '学生'} disabled={true}/>
                      </div>
                    )
                  default:
                    return (
                      <div key={item}>
                        <label>{infoDataMap[item]}：</label><Input value={this.state.infoDataValue[index]} disabled={true}/>
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