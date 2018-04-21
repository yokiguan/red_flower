import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Container/Login'
import App from './components/Container/Menu'
import NotFound from './components/Container/NotFound'
export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/app" component={App} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)