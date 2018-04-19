import React, { Component } from 'react'
import { InputNumber, Row, Button, Modal } from 'antd'
import { UpdateStudentScore, GetStudentScore} from "../../API/Api";

export default class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 10,
      userId: props.studentId,
      isStudent: !props.hasOwnProperty('isTutor'),
      dataIsFromInfoList: !props.hasOwnProperty('personalIntro')
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleInput(value) {
    this.setState({
      score: value
    })
  }
  handleSubmit() {
    UpdateStudentScore({id: this.state.userId, value: {score: this.state.score}})
      .then(res => JSON.parse(res))
      .then(res => {
        let modal = Modal.success({
          content: '成功打分， 该学生的分数为' + this.state.score
        })
        setTimeout(() => {
          modal.destroy()
        }, 2000)
      })
  }
  componentDidMount() {
    GetStudentScore({id: this.state.userId})
      .then(res => JSON.parse(res))
      .then(res => {
        this.setState({
          score: res.data
        })
      })
  }
  render () {
    const style = {
      container: {
        marginTop: 20 + 'px'
      },

    }
    if (this.state.isStudent && this.state.dataIsFromInfoList) {
      return (
        <Row gutter={24} style={style.container}>
          <label>打分</label>
          <InputNumber value={this.state.score} onChange={this.handleInput} max={100} min={0}/>
          &emsp;&emsp;
          <Button type="primary" onClick={this.handleSubmit}>提交</Button>
        </Row>
      )
    } else {
      return <label></label>
    }
  }
}