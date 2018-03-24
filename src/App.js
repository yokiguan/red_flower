import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Nav from './components/Navbar'
import Banner from "./components/Banner";
class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <Banner/>
      </div>
    );
  }
}

export default App;
