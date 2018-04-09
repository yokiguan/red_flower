import {  BrowserRouter as Router, Link, Route } from 'react-router-dom'
import React, { Component } from 'react'
import { StudentInfoList, TutorInfoList, AuditTable, Counter, Rate } from './components/Container/Containers'
const style = {
  firstMenu: {
    listStyle: 'none',
    fontSize: 16 + 'px'
  },
  secondMenu: {
    listStyle: 'none',
    fontSize: 12 + 'px'
  }

}
const Info = ( {match} ) => {
  return (
    <Router>
      <div>
        <ul style={style.secondMenu}>
          <li><Link to={`${match.url}/tutor`}>导师信息表</Link></li>
          <li><Link to={`${match.url}/stu`}>学生信息表</Link></li>
        </ul>
        <Route path={`${match.url}/tutor`} component={TutorInfoList}/>
        <Route path={`${match.url}/stu`} component={StudentInfoList} />
      </div>
    </Router>
  )
}
const FlowerManagement = ( {match} ) => {
  return (
    <router>
      <div>
        <ul style={style.secondMenu}>
          <li><Link to={`${match.url}/rate`}>小红花汇率</Link></li>
          <li><Link to={`${match.url}/counter`}>计数器</Link></li>
        </ul>
        <Route path={`${match.url}/rate`} component={Rate}/>
        <Route path={`${match.url}/counter`} component={Counter}/>
      </div>
    </router>
  )
}
const Home= ( {match} ) => {
  return (
    <Router>
      <div>
        <ul style={style.secondMenu}>
          <li><Link to={`${match.url}/audit`}>审核</Link></li>
        </ul>
        <Route path={`${match.url}/audit`} component={AuditTable} />
      </div>
    </Router>
  )
}
const Setting = ( {match} ) => {
  return (
    <Router>
      <div>
        <ul style={style.secondMenu}>
          <li><Link to={`${match.url}/picker`}>下拉列表框</Link></li>
          <li><Link to={`${match.url}/problem`}>问题</Link></li>
          <li><Link to={`${match.url}/banner`}>轮播图</Link></li>
        </ul>
        <Route path={`${match.url}/picker`} component={AuditTable}/>
        <Route path={`${match.url}/problem`} component={AuditTable}/>
        <Route path={`${match.url}/banner`} component={AuditTable}/>
      </div>
    </Router>
  )
}
const Message = ( {match} ) => {
  return (
    <Router>
      <div>
        <ul style={style.secondMenu}>
          <li><Link to={`${match.url}/send`}>发送短信</Link></li>
        </ul>
        <Route path={`${match.url}/send`} component={AuditTable}/>
      </div>
    </Router>
  )
}
class Page extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <div>
          <ul style={style.firstMenu}>
            <li><Link to='/home'>首页</Link></li>
            <li><Link to='/info'>信息管理</Link></li>
            <li><Link to='/flower'>小红花管理</Link></li>
            <li><Link to='/setting'>设置</Link></li>
            <li><Link to='/message'>消息通知</Link></li>
          </ul>
          <Route path='/info' component={Info}/>
          <Route path='/home' component={Home}/>
          <Route path='/flower' component={FlowerManagement}/>
          <Route path='/setting' component={Setting}/>
          <Route path='/message' component={Message}/>
        </div>
      </Router>
    )
  }
}
export default Page