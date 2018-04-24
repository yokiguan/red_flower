import React, { Component } from 'react'
import { Layout, Menu, Icon, Badge, Avatar} from 'antd'
import {  HashRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import { StudentInfoList, TutorInfoList, AuditTable, Rate, Switch, ReCount, Banner, ArticleList, OptionLists, NotFound, ArticleGarbage, TradeAudit, InviteCode} from './Containers'
const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu
const Role = {
  'ROLE_PLAIN': '普通管理员' ,
  'ROLE_SUPER': '超级管理员'
}
const Auth = {
  isPlain: false,
  isSuper: false,
  user: ''
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isPlain ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/app/404',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const SuperPrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isSuper ? (
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
  constructor(props) {
    super(props)
    if (localStorage.getItem('Role') === 'ROLE_PLAIN' || localStorage.getItem('Role') === 'ROLE_SUPER') {
      Auth.user = Role[localStorage.getItem('Role')]
      Auth.isSuper = localStorage.getItem('Role') === 'ROLE_SUPER'
      Auth.isPlain = localStorage.getItem('Role') === 'ROLE_PLAIN'
    } else {
      window.location.href = '/'
    }
  }
  state = {
    theme: 'dark',
    current: ''
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  LoginOut = (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.href = '/'
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
    const IsSuper = () => {
      if (Auth.isSuper) {
        return (
          <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultOpenKeys={['rate']}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            <SubMenu key="flower" hidden={Auth.isSuper} title={<span><Icon type="pay-circle" /><span>小红花管理</span></span>}>
              <Menu.Item key="rate"><Link to='/app/flower/rate'>小红花汇率</Link></Menu.Item>
              <Menu.Item key="counter"><Link to='/app/flower/recount'>重置计数器</Link></Menu.Item>
              <Menu.Item key="safe"><Link to='/app/flower/switch'>关闭/开启</Link></Menu.Item>
            </SubMenu>
          </Menu>
        )
      } else if (Auth.isPlain) {
        return (
          <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultOpenKeys={['audit']}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            <SubMenu key="home" title={<span><Icon type="home" /><span>首页</span></span>}>
              <Menu.Item key="audit" hidden={Auth.isPlain}><Link to='/app/audit'>通用审核</Link></Menu.Item>
              <Menu.Item key="trade" hidden={Auth.isPlain}><Link to='/app/trade'>交易审核</Link></Menu.Item>
            </SubMenu>
            <SubMenu hidden={Auth.isPlain} key="info" title={<span><Icon type="idcard"/><span>信息管理</span></span>}>
              <Menu.Item key="stu"><Link to='/app/info/stu'>学生列表</Link></Menu.Item>
              <Menu.Item key="tutor"><Link to='/app/info/tutor'>导师列表</Link></Menu.Item>
            </SubMenu>
            <SubMenu hidden={Auth.isPlain} key="article" title={<span><Icon type="book"/><span>文章管理</span></span>}>
              <Menu.Item key="normal"><Link to='/app/article/normal'>过审文章</Link></Menu.Item>
              <Menu.Item key="garbage"><Link to='/app/article/garbage'>垃圾箱</Link></Menu.Item>
            </SubMenu>
            <SubMenu hidden={Auth.isPlain} key="setting" title={<span><Icon type="setting"/><span>基础设置</span></span>}>
              <Menu.Item key="picker"><Link to='/app/setting/picker'>下拉列表框/问题</Link></Menu.Item>
              <Menu.Item key="banner"><Link to='/app/setting/banner'>轮播图</Link></Menu.Item>
              <Menu.Item key="inviteCode"><Link to='/app/setting/inviteCode'>邀请码</Link></Menu.Item>
              {/*<Menu.Item key="manager">管理员（开发中）</Menu.Item>*/}
            </SubMenu>
          </Menu>
        )
      }
    }
    return (
      <Router>
        <Layout>
          <Sider style={style.sider}>
            <IsSuper />
          </Sider>
          <Layout style={style.body}>
            <Header style={style.header}>
              <Badge style={style.badge}>
                <Avatar icon='user'/>
                <span>&emsp;{Auth.user}</span>
                <span>&emsp;<a onClick={this.LoginOut}>退出</a></span>
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
              <PrivateRoute path='/app/setting/inviteCode' component={InviteCode}/>
              <PrivateRoute path='/app/setting/banner' component={Banner}/>
              <PrivateRoute path='/app/setting/picker' component={OptionLists}/>
              <Route path='/app/404' component={NotFound}/>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}