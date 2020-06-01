import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Landingpage from './components/trial4bg';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
          </Route>
          <Route path="/extension">
            <Landingpage />
          </Route>
        </Switch>
      </Router>
      // <div className="App">
      //     <Landingpage />
      // </div>
    );
  }
}

export default App;
