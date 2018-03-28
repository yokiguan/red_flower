import React, { Component } from 'react'
import Form from '../components/Form'
import { AccountLogin, Test} from '../API/Api'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount () {
    //加载页面
    const data = {
      username: 'hwding',
      password: 'abc'
    }
    AccountLogin(data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  }
  handleUserNameChange(e) {
    console.log(this.state)
    this.setState({
      userName: e.target.value
    })
    console.log(this.state.userName)
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  handleSubmit() {
    // 发送数据哦
    console.log('fuck')
  }
  render() {
    const props = {
      formItemList: [
        {
          label: '用户名',
          controlId: 'ID',
          style: {
            backgroundColor: 'blue'
          },
          input: {
            type: 'text',
            placeholder: '请输入用户名',
            name: 'username',
            handleChange: this.handleUserNameChange,
            style: {
              backgroundColor: 'green'
            }
          }
        }, {
          label: '密码',
          controlId: 'PASSWORD',
          style: {
            backgroundColor: 'blue'
          },
          input: {
            type: 'password',
            placeholder: '请输入密码',
            name: 'password',
            handleChange: this.handlePasswordChange,
            style: {
              backgroundColor: 'green'
            }
          }
        }
      ],
      style: {
        backgroundColor: 'red'
      },
      button: {
        value: '登录',
        handleClick: this.handleSubmit,
        type: 'submit',
        bsStyle: 'primary',
        style: {
          // backgroundColor: 'black'
        }
      }
    }
    return (
      <Form {...props}/>
    )
  }
}
export default Login