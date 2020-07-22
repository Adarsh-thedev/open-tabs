import React from 'react';
import CountUp from 'react-countup';

const Stats = () => {
    return(
        <div className = "section counter mt3" style = {{color : '#0080ff'}}>
            <div className = 'container'>
                <div className = ' row'>
                    <div className="col-xs-12 col-sm-4">
                        <div className="counter-item text-center mb2 mb-lg-0">
                            <div className="icon-box grow"><i aria-hidden="true" className="fa fa-plane fa-4x"></i></div>
                            <h3 className="mb-0 mt2 counter"><CountUp end={100} duration={5}/></h3>
                            <p className="text-muted">Flights Booked</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="counter-item text-center mb2 mb-lg-0">
                            <div className="icon-box grow"><i aria-hidden="true" className="fa fa-cloud fa-4x"></i></div>
                            <h3 className="mb-0 mt2 counter">
                                <CountUp end={10000} duration={7}/><span>KG</span>
                            </h3>
                            <p className="text-muted">CO<sub>2</sub> Offset</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="counter-item text-center mb2 mb-lg-0">
                            <div className="icon-box grow"><i aria-hidden="true" className="fa fa-tree fa-4x"></i></div>
                            <h3 className="mb-0 mt2 counter">
                                <CountUp start={0} end={100} duration={5}/>
                            </h3>
                            <p className="text-muted">Trees Planted</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;