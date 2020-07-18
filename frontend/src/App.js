import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landingpage from './components/Landingpage.js';
import Ad from './components/Ad.js';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Referral from './components/Referral';
// import OnInstall from './components/OnInstall';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            
          </Route>
          <Route path="/tabbing">
            <Landingpage />
          </Route>
          <Route path="/ads">
            <Ad />
          </Route>
          {/* <Route
            path="/referral/:id?"
            component={Referral}
          />
          <Route 
            path="/oninstall"
            component={OnInstall}
            /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
