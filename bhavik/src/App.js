import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Landingpage from './components/Landingpage';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Landingpage />
      </div>
    );
  }
}

export default App;
