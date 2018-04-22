import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { GetStuInfo, GetTutorInfo, GetStuAnswer, GetQuestionList, CancelCertificateTutor, CertificateTutor } from '../../API/Api'
import InfoForm from './InfoForm'
import Score from '../Container/Score'
const IsStudent = (props) => {
  if( typeof props.studentId !== 'undefined') {
    return <Score studentId={props.studentId}/>
  } else {
    return <span/>
  }
}
class InfoModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  componentDidMount() {
    if (typeof this.props.studentId !== 'undefined') {
      GetStuInfo({id: this.props.studentId})
        .then(res => {
          this.data = res.data
          return GetQuestionList()
        })
        .then(res => {
          this.questionList = res.data
          return GetStuAnswer({id: this.props.studentId, answer: 'answer'})
        })
        .then(res => {
          let answerList = res.data
          let questionAndAnswer = []
          this.questionList.map(problem => {
            if (answerList.length === 0) {
              questionAndAnswer.push({
                problem: problem.title,
                answer: '未作答'
              })
            }
            answerList.map(answer => {
              if (answer.questionId === problem.id) {
                questionAndAnswer.push({
                  problem: problem.title,
                  answer: answer.answerContent
                })
              }
            })
          })
          this.data['question'] = questionAndAnswer
          this.setState({
            data: this.data
          })
          console.log('加载学生信息')
        })
    } else if( typeof this.props.tutorId !== 'undefined') {
      GetTutorInfo({id: this.props.tutorId})
        .then(res => {
          this.userId = res.data.userId
          this.setState({
            data: res.data,
            isTutor: res.data.isTutor
          })
        })
    }
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  CancelTutor = () => {
    CancelCertificateTutor({id: this.userId})
      .then(res => {
        let ref = Modal.success({
          content: '取消导师资格'
        })
        this.setState({
          isTutor: 0
        })
        setTimeout(() => {
          ref.destroy()
          window.location.reload()
        }, 2000)
      })
  }
  PassTutor = () => {
    CertificateTutor({id: this.userId})
      .then(res => {
        let ref = Modal.success({
          content: '授予导师资格'
        })
        this.setState({
          isTutor: 1
        })
        setTimeout(() => {
          ref.destroy()
          window.location.reload()
        }, 2000)
      })
  }
  render() {
    return (
      <div>
        <Button onClick={this.showModal}>查看详情</Button>
        &emsp;&emsp;
        <Button onClick={this.PassTutor} hidden={!(typeof this.state.isTutor !== 'undefined' && this.state.isTutor === 0)}>设置为导师</Button>
        <Button onClick={this.CancelTutor} hidden={!(typeof this.state.isTutor !== 'undefined' && this.state.isTutor === 1)}>取消导师资格</Button>
        <Modal
          title='查看详情'
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText='确认'
          cancelText='取消'
        >
          <InfoForm {...this.state.data}/>
          <IsStudent {...this.props}/>
        </Modal>
      </div>
    )
  }
}

export default InfoModal