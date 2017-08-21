import React, { Component } from 'react';
import logo from './box-307233_1280.png';
import NavBar from './containes/Navigation/NavBar.jsx'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <div className="App-header">
        <NavBar/>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Voting App</h2>
          
        </div>
        
        <p className="App-intro">
          <p> implementation of Voting app 
            <a href="https://www.freecodecamp.org/challenges/build-a-voting-app"> @FreeCodeCamp</a>
          </p>
        </p>
      </div>
    );
  }
}

export default App;
