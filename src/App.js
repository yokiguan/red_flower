import React, { Component } from 'react';
import TutorInfoList from './components/Container/TutorInfoList'
import StudentInfoList from './components/Container/StudentInfoList'
import AuditTable from './components/Container/AuditTable'
import Banner from './components/Container/Banner'
import NavMenu from './components/Container/Menu'
import Page from './Page'
class App extends Component {
  render() {
    return (
      <NavMenu />
    );
  }
}

export default App;
