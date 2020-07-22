import React from 'react';
import './App.css';
import Base from './Components/Base';
import FlightSearch from './Components/Flightsearch';
import Slide from 'react-reveal/Slide';
import Stats from './Components/Stats';
import AboutOpenTabs from './Components/AboutOpenTabs';
import AboutCarbonOffset from './Components/AboutCarbonOffset';
import AboutRainForest from './Components/AboutRainForest';

function App() {
  return (
    <React.Fragment>
      <Base>
        <FlightSearch/>
        <Slide right>
            <Stats/>
            <AboutOpenTabs/>
            <AboutCarbonOffset/>
            <AboutRainForest/>
        </Slide>
      </Base>
    </React.Fragment>
  );
} 

export default App;
