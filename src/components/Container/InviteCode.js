import React, { Component } from 'react'
import { Table, Button, Tabs, Spin, Pagination, Modal} from 'antd'
import { columns } from '../data/inviteCodeBasicData'
import { GetInviteCode, AddInviteCode} from "../../API/Api"

class InviteCode extends Component {
  constructor(props) {
    super(props)
    this.role = {
      tutor: 2,
      student: 1
    }
    this.type = {
      '1': '学生',
      '2': '导师'
    }
    this.state = {
      loading: true,
      type: 1,  //   1 学生， 2 导师
      status: 0,  //  0 可用，1 不可用
      page: 0,
      dataSource: [],
      visible: false,
      newInviteCode: '',
    }
  }
  changeStatus = (e) => {
    this.setState({
      loading: true,
      status: e.target.dataset.id
    })
    GetInviteCode({type: this.state.type, status: e.target.dataset.id, page: 0})
      .then(res => {
        this.setState({
          loading: false,
          dataSource: res.data
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          dataSource: []
        })
      })
  }
  changeType = (key) => {
    this.setState({
      loading: true,
      page: 0,
      type: this.role[key]
    })
    GetInviteCode({type: this.role[key], status: 0, page: 0})
      .then(res => {
        this.setState({
          loading: false,
          dataSource: res.data
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          dataSource: []
        })
      })
  }
  componentDidMount () {
    GetInviteCode({type: this.state.type, status: this.state.status, page: this.state.page})
      .then(res => {
        this.setState({
          dataSource: res.data,
          loading: false
        })
      })
  }
  addInviteCode = () => {
    AddInviteCode(JSON.stringify({type: this.state.type}))
      .then(res => {
        if (res.code === 0) {
          let modal = Modal.success({
            content: `新的${this.type[this.state.type]}邀请码: ${res.data.code}`
          })
          setTimeout(() => {
            modal.destroy()
            window.location.reload()
          }, 2000)
        }
      })
  }
  pageChange = (page) => {
    GetInviteCode({type: this.state.type, status: this.state.status, page: page -1})
      .then(res => {
        this.setState({
          loading: false,
          dataSource: res.data
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          dataSource: []
        })
      })
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
        <h3>邀请码</h3>
        <Tabs size='large' type='line' onChange={this.changeType}>
          <Tabs.TabPane key='student' tab='学生邀请码'>
            <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
              <Table dataSource={this.state.dataSource} columns={columns} bordered={true} pagination={false}/>
              <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane key='tutor' tab='导师邀请码'>
            <Spin style={{marginLeft: -600 + 'px'}} spinning={this.state.loading}>
              <Table dataSource={this.state.dataSource} columns={columns} bordered={true} pagination={false}/>
              <Pagination current={this.state.page} onChange={this.pageChange} total={100}/>
            </Spin>
          </Tabs.TabPane>
        </Tabs>
        <div style={style.buttonContainer}>
          <Button style={style.button} data-id={0} onClick={this.changeStatus}>查看可用</Button>
          <Button style={style.button} data-id={1} onClick={this.changeStatus}>查看不可用</Button>
          <Button style={style.button} onClick={this.addInviteCode}>生成邀请码</Button>
        </div>
      </div>
    )
  }
}

export default InviteCode