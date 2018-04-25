import React from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/Container/Login'
import App from './components/Container/Menu'
export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/app" component={App} />
    </Switch>
  </Router>
)