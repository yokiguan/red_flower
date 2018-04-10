import React, { Component } from 'react'
import { Layout, Menu, Icon, Divider, Badge, Avatar, Breadcrumb } from 'antd'
import {  BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { StudentInfoList, TutorInfoList, AuditTable, Rate, Switch, ReCount, Banner, ArticleList, RubbishList, OptionLists } from './Containers'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

export default class NavMenu extends Component {
  state = {
    theme: 'dark',
    current: 'audit',
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  render() {
    const style = {
      sider: {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      },
      body: {
        marginLeft: 200 + 'px'
      },
      header: {
        backgroundColor: '#f5f5f5',
        height: 50 + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flexEnd'
      },
      badge: {
        float: 'right',
        fontSize: 14 + 'px',
      },
      content: {
        overflow: 'initial'
      }
    }
    return (
      <Router>
        <Layout>
          <Sider style={style.sider}>
            <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: 256 }}
              defaultOpenKeys={['audit']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="home" title={<span><Icon type="home" /><span>首页</span></span>}>
                <Menu.Item key="audit"><Link to='/audit'>审核管理</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="info" title={<span><Icon type="idcard" /><span>信息管理</span></span>}>
                <Menu.Item key="stu"><Link to='/info/stu'>学生列表</Link></Menu.Item>
                <Menu.Item key="tutor"><Link to='/info/tutor'>导师列表</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="article" title={<span><Icon type="book" /><span>文章管理</span></span>}>
                <Menu.Item key="normal"><Link to='/article/normal'>过审文章</Link></Menu.Item>
                <Menu.Item key="rubbish"><Link to='/article/rubbish'>垃圾箱</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="message" title={<span><Icon type="notification" /><span>消息通知</span></span>}>
                <Menu.Item key="send">发送短信</Menu.Item>
              </SubMenu>
              <SubMenu key="flower" title={<span><Icon type="pay-circle" /><span>小红花管理(超级管理员)</span></span>}>
                <Menu.Item key="rate"><Link to='/flower/rate'>小红花汇率</Link></Menu.Item>
                <Menu.Item key="counter"><Link to='/flower/recount'>重置计数器</Link></Menu.Item>
                <Menu.Item key="safe"><Link to='/flower/switch'>关闭/开启</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="setting" title={<span><Icon type="setting" /><span>基础设置(超级管理员)</span></span>}>
                <Menu.Item key="picker"><Link to='/setting/picker'>下拉列表框</Link></Menu.Item>
                <Menu.Item key="problem">问题</Menu.Item>
                <Menu.Item key="banner"><Link to='/setting/banner'>轮播图</Link></Menu.Item>
                <Menu.Item key="manager">管理员</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={style.body}>
            <Header style={style.header}>
              <Badge style={style.badge}>
                <Avatar icon='user'/>
                <span>&emsp;管理员1号</span>
              </Badge>
            </Header>
            <Content style={style.content}>
              <div style={{ background: '#fff', textAlign: 'center' }}>
                <Route path='/audit' component={AuditTable} />
                <Route path='/info/stu' component={StudentInfoList} />
                <Route path='/info/tutor' component={TutorInfoList} />
                <Route path='/flower/switch' component={Switch}/>
                <Route path='/flower/rate' component={Rate}/>
                <Route path='/flower/recount' component={ReCount}/>
                <Route path='/article/normal' component={ArticleList}/>
                <Route path='/article/rubbish' component={RubbishList}/>
                <Route path='/setting/banner' component={Banner}/>
                <Route path='/setting/picker' component={OptionLists}/>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              海鲸小红花后台管理程序 ©2018 Created by 海鲸教育基金集团
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}