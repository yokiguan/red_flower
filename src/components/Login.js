import React, { Component } from 'react'
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import accountLogin from '../API/index'
import '../API/index'
class LoginComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.styles = {
      LoginStyles: {
        display: 'grid',
        justifyItems: 'center'
      }
    }
  }
  handleChange (event) {
    if (event.target.name === 'id') {
      this.setState({
        id: event.target.value
      })
    }
    if (event.target.name === 'password') {
      this.setState({
        password: event.target.value
      })
    }
  }
  handleSubmit () {
    accountLogin({
      username: this.state.id,
      password: this.state.password
    })
  }
  render () {
    return (
      <div style={this.styles.LoginStyles}>
        <h3 style={{textAlign: 'center'}}>小红花管理平台</h3>
        <Form horizontal>
          <FormGroup controlId="ID">
            <Col componentClass={ControlLabel}>
              账号:
            </Col>
            <Col>
              <FormControl type="username" placeholder="请输入用户名" name="id" onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="Password">
            <Col componentClass={ControlLabel}>
              密码:
            </Col>
            <Col>
              <FormControl type="password" placeholder="请输入密码" name="password" onChange={this.handleChange}/>
            </Col>
          </FormGroup>

          <FormGroup style={{textAlign: 'center'}}>
            <Button bsStyle="primary" onClick={this.handleSubmit}>登录</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
export default LoginComponent