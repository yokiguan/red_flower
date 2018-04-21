import React, { Component } from 'react'
import { Layout, Menu, Icon, Divider, Badge, Avatar, Breadcrumb } from 'antd'
import {  HashRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import { StudentInfoList, TutorInfoList, AuditTable, Rate, Switch, ReCount, Banner, ArticleList, RubbishList, OptionLists, NotFound, ArticleGarbage, TradeAudit} from './Containers'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
const fakeAuth = {
  isAuthenticated: true,
  isSuper: true,
  user: localStorage.getItem('userName')
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const SuperPrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isSuper ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/app/404',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
export default class App extends Component {
  state = {
    theme: 'dark',
    current: 'audit'
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
        alignItems: 'center'
      },
      badge: {
        float: 'right',
        fontSize: 14 + 'px',
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
                <Menu.Item key="audit"><Link to='/app/audit'>通用审核</Link></Menu.Item>
                <Menu.Item key="trade"><Link to='/app/trade'>交易审核</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="info" title={<span><Icon type="idcard" /><span>信息管理</span></span>}>
                <Menu.Item key="stu"><Link to='/app/info/stu'>学生列表</Link></Menu.Item>
                <Menu.Item key="tutor"><Link to='/app/info/tutor'>导师列表</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="article" title={<span><Icon type="book" /><span>文章管理</span></span>}>
                <Menu.Item key="normal"><Link to='/app/article/normal'>过审文章</Link></Menu.Item>
                <Menu.Item key="garbage"><Link to='/app/article/garbage'>垃圾箱</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="flower" title={<span><Icon type="pay-circle" /><span>小红花管理(超级管理员)</span></span>}>
                <Menu.Item key="rate"><Link to='/app/flower/rate'>小红花汇率</Link></Menu.Item>
                <Menu.Item key="counter"><Link to='/app/flower/recount'>重置计数器</Link></Menu.Item>
                <Menu.Item key="safe"><Link to='/app/flower/switch'>关闭/开启</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="setting" title={<span><Icon type="setting" /><span>基础设置(超级管理员)</span></span>}>
                <Menu.Item key="picker"><Link to='/app/setting/picker'>下拉列表框/问题</Link></Menu.Item>
                <Menu.Item key="banner"><Link to='/app/setting/banner'>轮播图</Link></Menu.Item>
                <Menu.Item key="manager">管理员</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={style.body}>
            <Header style={style.header}>
              <Badge style={style.badge}>
                <Avatar icon='user'/>
                <span>&emsp;{fakeAuth.user}</span>
                <span>&emsp;<a href='/'>退出</a></span>
              </Badge>
            </Header>
            <Content style={{ background: '#fff', textAlign: 'center' }}>
              <PrivateRoute path='/app/audit' component={AuditTable} />
              <PrivateRoute path='/app/trade' component={TradeAudit} />
              <PrivateRoute path='/app/info/stu' component={StudentInfoList} />
              <PrivateRoute path='/app/info/tutor' component={TutorInfoList} />
              <SuperPrivateRoute path='/app/flower/switch' component={Switch}/>
              <SuperPrivateRoute path='/app/flower/rate' component={Rate}/>
              <SuperPrivateRoute path='/app/flower/recount' component={ReCount}/>
              <PrivateRoute path='/app/article/normal' component={ArticleList}/>
              <PrivateRoute path='/app/article/garbage' component={ArticleGarbage}/>
              <SuperPrivateRoute path='/app/setting/banner' component={Banner}/>
              <SuperPrivateRoute path='/app/setting/picker' component={OptionLists}/>
              <Route path='/app/404' component={NotFound}/>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}