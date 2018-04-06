import React, { Component } from 'react';
import TutorInfoList from './components/Container/TutorInfoList'
import StudentInfoList from './components/Container/StudentInfoList'
import AuditTable from './components/Container/AuditTable'
import Banner from './components/Container/Banner'
class App extends Component {
  render() {
    return (
      <section>
        <StudentInfoList/>
        <TutorInfoList/>
        <AuditTable/>
        <Banner/>
      </section>
    );
  }
}

export default App;
