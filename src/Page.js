import {  BrowserRouter as Router, Link, Route } from 'react-router-dom'
import React, { Component } from 'react'
import { StudentInfoList, TutorInfoList, AuditTable } from './components/Container/Containers'
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
          </ul>
          <Route path='/info' component={Info}/>
          <Route path='/home' component={Home}/>
        </div>
      </Router>
    )
  }
}
export default Page