import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { GetStuInfo, GetTutorInfo, GetStuAnswer, GetQuestionList } from '../../API/Api'
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
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.state = {
      visible: false
    }
    GetQuestionList()
      .then(res => JSON.parse(res))
      .then(res => {
        this.questionList = res.data
      })
  }
  componentDidMount() {
    if (typeof this.props.studentId !== 'undefined') {
      let studentData = {}
      GetStuInfo({id: this.props.studentId})
        .then(res => JSON.parse(res))
        .then(res => {
          studentData = res.data
          this.setState({
            data: studentData
          })
          return GetStuAnswer({id: this.props.studentId, answer: 'answer'})
        })
        .then(res => JSON.parse(res))
        .then(res => {
          let questionAndAnswer = []
          if (typeof res !== 'undefined' && typeof res.data !== 'undefined' && res.data.length > 0) {
            res.data.map(item => {
              this.questionList.map(value => {
                if (value.id === item['questionId']) {
                  questionAndAnswer.push({
                    problem: value.title,
                    answer: item['answerContent']
                  })
                }
              })
            })
            studentData['question'] = questionAndAnswer
            this.setState({
              data: studentData
            })
          }
        })
    } else if( typeof this.props.tutorId !== 'undefined') {
      GetTutorInfo({id: this.props.tutorId})
        .then(res => JSON.parse(res))
        .then(res => {
          this.setState({
            data: res.data
          })
        })
    }
  }
  hideModal() {
    this.setState({
      visible: false
    })
  }
  showModal() {
    this.setState({
      visible: true
    })
  }
  render() {
    return (
      <div>
        <Button onClick={this.showModal}>查看详情</Button>
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