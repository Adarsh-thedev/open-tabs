import React from 'react';
import Background from '../assets/about-carbon.jpg';
import Slide from 'react-reveal/Slide';
import CountUp from 'react-countup';

const backgroundStyle = {
    backgroundImage : `url(${Background})`,
    backgroundSize : 'cover',
    backgroundRepeat : 'no-repeat',
    fontFamily : 'Nunito, sans-serif'
}

const manualOpacity = {
    backgroundColor: 'black', 
    opacity: '0.5', 
    position: 'absolute', 
    width: '100%', 
    height: '100%',
     top: '0px'
}

const AboutCarbonOffset = () => {
    return(
        <div className = 'no-margin' style = {backgroundStyle}>
            <div style={manualOpacity}></div>
            <div className = 'container'>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 mt5">
                        <h2 className="f1 card-title" style={{
                            color: 'white',
                            paddingBottom: '35px'}}>
                            What Is Carbon Offsetting?
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <Slide left>
                        <div className = 'col-xs-12 col-sm-6'>
                            <p className = 'f4 b' style={{color: 'white'}}>
                                OpenTabs is a non-profit with a mission to reduce poverty and fight climate change in innovative ways. We want
                                to be the most affordable and convenient way of having an impact.</p>
                            <p className = 'f4 b' style={{color: 'white'}}>
                                For this reason, we created a free web browser extension that allows you to passively raise funds towards
                                providing microloans, preventing malaria, and saving rainforests, by simply opening new
                                tabs.
                            </p>
                        </div>
                    </Slide>
                    <Slide right>
                        <div className = 'col-xs-12 col-sm-6 center'>
                            <div style={{color:'white', margin: 'auto'}}>
								<div className="center"><i aria-hidden="true" className="fa fa-cloud fa-4x"></i></div>
								<p className="mb-0 mt2 f1"><CountUp end = {10000} duration = {7}></CountUp><span className = 'ml1'>KG</span>
								</p>
								<p className="text-white">CO<sub>2</sub> Offsetted</p>
							</div>
                        </div>
                    </Slide>
                </div>
            </div>
        </div>
    );
}

export default AboutCarbonOffset;