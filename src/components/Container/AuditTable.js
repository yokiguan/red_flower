import React, { Component } from 'react'
import { Table, Button, Tabs,Pagination, Spin} from 'antd'
import {donates} from '../data/DonateListData'
import { columns } from '../data/auditBasicData'
import { auditType, auditStatus} from "../data/dataMap"
import { GetAuditList, GetStuAnswer, GetQuestionList,GetDonate} from "../../API/Api"
import { normalizeTime, judgePullAjax} from '../../common/scripts/utils'

class AuditTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      type: 1,
      status: 2,
      page:1,
      pagesize:10,
      donateData:[],
      auditType: {
        student: 1,
        tutor: 2,
        article: 3,
        activity: 4,
        donate:5
      }
    }
  }
  pageChange = (page) => {
    this.setState({
      page: page-1,
      loaing: true
    })
    GetDonate({pageSize:10,pageIndex:page-1})
      .then(res => {
        if (typeof res.data !== 'undefined') {
          this.setState({
            donateData: res.data,
            loading: false,
            pagesize:res.page_num
          })
        } else {}
        this.setState({
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
        })
      })
  }
  changeAuditType = (value) => {
    this.setState({
      type: this.state.auditType[value],
      loading: true,
      dataSource: []
    })
    if(this.state.auditType[value]===5){
      GetDonate({pageSize:10,pageIndex:0})
      .then(res => {
        if (typeof res.data !== 'undefined') {
          this.setState({
            donateData: res.data,
            loading: false,
            pagesize:res.page_num
          })
        } else {}
        this.setState({
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
        })
      })
    }
    else
    GetAuditList({type: this.state.auditType[value], status: 1})
      .then(res => {
        console.log(res)
        if (judgePullAjax(res) && res.data.length > 0) {
          this.dataSource = this.parseData(res.data)
          this.setState({
            dataSource: this.dataSource,
            loading: false,
          })
          if (value === 'student') {
            GetQuestionList()
              .then(res => {
                this.questionList = res.data
                return GetStuAnswer({id: this.dataSource[0].userId, answer: 'answer'})
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
                        answer: answer['answerContent']
                      })
                    }
                  })
                })
                this.dataSource[0]['content']['question'] = questionAndAnswer
                this.setState({
                  dataSource: this.dataSource,
                  loading: false
                })
              })
          }
        } else {
          this.setState({
            loading: false
          })
        }
      })
      .catch(err => {
        this.setState({
          dataSource: [],
          loading: false
        })
      })

  }
  changeAuditStatus = (e) => {
    this.setState({
      loading: true
    })
    GetAuditList({type: this.state.type, status: e.target.dataset.id})
      .then(res => {
        if (judgePullAjax(res) && res.data.length > 0) {
          this.setState({
            loading: false,
            dataSource: this.parseData(res.data)
          })
        } else {
          this.setState({
            dataSource: [],
            loading: false
          })
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
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
        <h3>通用审核</h3>
        <Tabs size='large' type='line' onChange={this.changeAuditType}>
          <Tabs.TabPane key='student' tab='学生信息'>
            <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
              <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane key='tutor' tab='导师信息'>
            <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
              <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane key='activity' tab='活动申请'>
            <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
              <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane key='article' tab='文章审核'>
            <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
              <Table dataSource={this.state.dataSource} columns={columns} bordered={true} />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane key='donate' tab='捐赠数据'>
            <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
              <Table dataSource={this.state.donateData} columns={donates} bordered={true} />
              <Pagination current={this.state.page} onChange={this.pageChange} total={this.state.pagesize*10}/>
            </Spin>
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