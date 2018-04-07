import React, { Component } from 'react'
import { InputNumber, Row, Button } from 'antd'
import { GetStudentScore, UpdateStudentScore} from "../../API/Api";

export default class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 10,
      userId: props.userId
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
    console.log(this.state.score)
    // UpdateStudentScore({userId: this.state.userId, score: this.state.userId})
    //   .then(res => {
    //     console.log(res)
    //   })
  }
  componentDidMount() {
    // GetStudentScore({userId: this.state.userId})
    //   .then(res => {
    //     this.setState({
    //       score: res.data
    //     })
    //   })
    this.setState({
      score: 19
    })
  }
  render () {
    const style = {
      container: {
        marginTop: 20 + 'px'
      },

    }
    return (
      <Row gutter={24} style={style.container}>
        <label>打分</label>
        <InputNumber value={this.state.score} onChange={this.handleInput} max={100} min={0}/>
        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
      </Row>
    )
  }
}