import React from 'react';
import Background from '../assets/jungle.jpg';
import Slide from 'react-reveal/Slide';

const backgroundStyle = {
    backgroundImage : `url(${Background})`,
    backgroundSize : 'cover',
    backgroundRepeat : 'no-repeat',
    fontFamily : 'Nunito, sans-serif'
}

const AboutOpenTabs = () => {
    return(
        <div style = {backgroundStyle}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-8 mt5">
                        <h2 className="f1 card-title" style={{
                            color: 'white',
                            paddingBottom: '35px'}}>
                            What Is OpenTabs?
                        </h2>
                    </div>
                </div>
                <div className='row'>
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
                        <div className = 'col-xs-12 col-sm-6'>
                            <div className="embed-responsive embed-responsive-16by9 shadow-5 br1 grow">
                                <iframe className="embed-responsive-item br2" title = 'youtube' src="https://www.youtube.com/embed/h8q4zSIVCzA"
                                    allowFullScreen></iframe>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="mt3 mb2 flex-center">
                                    {/* Instagram */}
                                    <a href="https://www.instagram.com/open_tabs/" target="_blank" rel="noopener noreferrer">
                                        <i style={{color: 'white'}} className="fa fa-instagram white-text f2 dim mr4"> </i>
                                    </a>

                                    {/* Linkedin */}
                                    <a href="https://www.linkedin.com/company/greco-paro/?viewAsMember=true"
                                        target = '_blank' rel="noopener noreferrer">
                                        <i style={{color: 'white'}} className="fa hover-blue fa-linkedin white-text dim f2 mr4"> </i>
                                    </a>

                                    {/* youtube */}
                                    <a href="https://www.youtube.com/channel/UC7Ggi0aAxmxHtoMqZ6BckBg" target = '_blank' rel="noopener noreferrer">
                                        <i style={{color: 'white'}} className="fa fa-youtube white-text dim f2"> </i>
                                    </a>
                                </div>
                            </div>
                            <p className="d-flex justify-content-center text-white h5 mt1">
                                Follow our journey
                            </p>
                        </div>
                    </Slide>
                </div>
            </div>
        </div>
    );
}

export default AboutOpenTabs;