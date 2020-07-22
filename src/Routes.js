import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import FlightSearchResults from './Components/FlightSearchResults';
import CarbonOffset from './Components/CarbonOffset';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = '/carbon-offset' component = {CarbonOffset}/>
                <Route exact path = '/flights' component = {FlightSearchResults} />
                <Route exact path = '/' component = {App}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;