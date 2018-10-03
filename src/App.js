import React, { Component } from 'react';
import './App.css';

import CourseList from './components/CourseList';


import NavBar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <CourseList/>
      </div>
    );
  }
}

export default App;
