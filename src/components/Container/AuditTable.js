import React, { Component } from 'react'
import { Table, Button, Tabs} from 'antd'
import { columns } from '../data/auditBasicData'
import { auditType, auditStatus} from "../data/dataMap"
import { GetAuditList, GetStuAnswer, GetQuestionList} from "../../API/Api"
import { normalizeTime, judgePullAjax} from '../../common/scripts/utils'

class AuditTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 1,
      status: 2,
      auditType: {
        student: 1,
        tutor: 2,
        article: 3,
        activity: 4
      }
    }
  }
  changeAuditType = (value) => {
    this.setState({
      type: this.state.auditType[value],
      dataSource: []
    })
    GetAuditList({type: this.state.auditType[value], status: 1})
      .then(res => JSON.parse(res))
      .then(res => {
        if (judgePullAjax(res) && res.data.length > 0) {
          this.dataSource = this.parseData(res.data)
          this.setState({
            dataSource: this.dataSource
          })
          if (value === 'student') {
            GetQuestionList()
              .then(res => JSON.parse(res))
              .then(res => {
                this.questionList = res.data
                return GetStuAnswer({id: this.dataSource[0].userId, answer: 'answer'})
              })
              .then(res => JSON.parse(res))
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
                        answer: answer['answerContent']
                      })
                    }
                  })
                })
                this.dataSource[0]['content']['question'] = questionAndAnswer
                this.setState({
                  dataSource: this.dataSource
                })
              })
          }
        }
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  changeAuditStatus = (e) => {
    GetAuditList({type: this.state.type, status: e.target.dataset.id})
      .then(res => JSON.parse(res))
      .then(res => {
        if (judgePullAjax(res) && res.data.length > 0) {
          this.setState({
            ...this.state,
            dataSource: this.parseData(res.data)
          })
        } else {
          this.setState({
            dataSource: []
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: []
        })
      })
  }
  parseData =  (data) => {
    const result = []
    data.map((item, index) => {
      item.status = auditStatus[item.status]
      item.type = auditType[item.type]
      item.number = index + 1
      item.content = JSON.parse(item.content)
      item.name = item.content.name
      item.applyTime = normalizeTime(item.applyTime)
      result.push(item)
    })
    return result
  }
  componentDidMount () {
    this.changeAuditType('student')
  }
  render() {
    const style = {
      buttonContainer: {
        marginBottom: 10 + 'px',
        marginLeft: 10 + 'px',
        padding: 20 + 'px'
      },
      button: {
        marginRight: 10 + 'px'
      },
      tabContainer: {
        maxHeight: 1200 + 'px'
      }
    }
    return (
      <div>
        <br/>
        <h4>通用审核</h4>
        <Tabs size='large' type='line' onChange={this.changeAuditType}>
          <Tabs.TabPane key='student' tab='学生信息'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
          <Tabs.TabPane key='tutor' tab='导师信息'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
          <Tabs.TabPane key='activity' tab='活动申请'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
          </Tabs.TabPane>
          <Tabs.TabPane key='article' tab='文章审核'>
            <Table dataSource={this.state.dataSource} columns={columns} bordered={true}/>
          </Tabs.TabPane>
        </Tabs>
        <div style={style.buttonContainer}>
          <Button style={style.button} data-id={1} onClick={this.changeAuditStatus}>查看正在审核</Button>
          <Button style={style.button} data-id={2} onClick={this.changeAuditStatus}>查看已通过</Button>
          <Button style={style.button} data-id={3} onClick={this.changeAuditStatus}>查看未通过审核</Button>
        </div>
      </div>

    )
  }
}

export default AuditTable