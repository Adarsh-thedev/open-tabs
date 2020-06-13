import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
// import Landingpage from './components/Landingpage.js';
import TestLandingpage from './components/testlp.js';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            
          </Route>
//           <Route path="/tabbing">
//             <Landingpage />
//           </Route>
          <Route path="/test">
            <TestLandingpage />
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
