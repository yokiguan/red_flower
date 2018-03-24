import React, { Component } from 'react';
import { Navbar ,NavItem, MenuItem, NavDropdown, Nav} from 'react-bootstrap';

class Header extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Navbar inverse collapseOnSelect fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#'>小红花后台管理平台</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={1} href='#' title="内容管理" id='content-management'>
              <MenuItem eventKey={1.1}>
                轮播图
              </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="内容审核" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>学生信息</MenuItem>
              <MenuItem eventKey={3.2}>导师信息管理</MenuItem>
              <MenuItem eventKey={3.3}>学生信息</MenuItem>
            </NavDropdown>
            <NavItem eventKey={2} href='#'>
              消息管理
            </NavItem>
            <NavItem eventKey={4} href='#'>
              设置
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
export default Header
