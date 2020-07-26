import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import airlineData from '../assets/airline_iata_name'

const Flight = ({flightNumber, price, airline, departureTime, returnTime, co2}) => {

    const [state, setState] = useState(false);

    const [redirect, setRedirect] = useState(false)

    const handleClick = event => {
        event.preventDefault();
        setState(!state);
    }

    const onSelect = () => {
        return setRedirect(!redirect);
    }

    const getRedirect = (redirect) => {
        if(redirect){
            return <Redirect to = '/carbon-offset'/>
        }
    }

    const showAllDetails = () => {
        return state && (
            <div className = 'card-body bt b--black-10 text-muted d-flex'>
                <div className = 'col-xs-12 col-sm-6'>
                    <i className = 'fa fa-plane'></i> <p className="dib ml2">{departureTime.substr(11,5)} : San Fransisco International Airport (SFO)</p><br/>
                    <i className = 'fa fa-circle'></i> <p className="dib ml2">{returnTime.substr(11,5)} : John F. Kennedy International Airport (JFK)</p>
                </div>
                <div className = 'col-xs-12 col-sm-6'>
                    <i className = 'fa fa-cloud'></i><p className="dib ml2">CO<sub>2</sub> Released:{co2} kg</p> <br/>
                    <i className = 'fa fa-wheelchair b'></i><p className="dib ml2">Average Legroom (79cm)</p> <br/>
                    <i className = 'fa fa-wifi'></i><p className="dib ml2">Wi-Fi</p> <br/>
                    <i className = 'fa fa-plug'></i><p className="dib ml2">In-seat power and USB outlets</p> <br/>
                    <i className = 'fa fa-tv'></i><p className="dib ml2">On-demand video</p>
                </div>
            </div>
        );
    }

    return (
        <div className = 'bg1 br1 shadow-1 bb b--black-20 pa2'>
			<div className="d-flex pointer no-dec justify-content-between" stlye={{textDecoration:'none'}}>
                <div className="d-flex col-xs-4">
                    <img src = {`https://www.gstatic.com/flights/airline_logos/70px/${airline}.png`}
                         alt = 'Airline Logo'
                         style = {{width : 'auto', height : '40px'}}
                         className = 'mt3 col-6'
                    />
                    <div className="col-6">
                        <div className="d-flex">
                            <p className="depart_time">{departureTime.substr(11,5)}</p>
                            {/* <p className="dash mt2">-</p>
                            <p className="depart_time mt2">{returnTime.substr(11,5)}</p> */}
                        </div>
                        <div className="airlinename text-muted">{airlineData[airline]}</div>
                    </div>
                </div>
                {!state ?
                    <div className="col-xs-2 text-center">
                        <p >7h 00m</p>
                        <p className="text-muted">CO<sub>2</sub> Released:{co2} kg</p>
                    </div>
                    : <div className="col-xs-2"></div>
                }
                {!state ?
                    <div className="col-xs-2 text-center">
                        <p>Non-stop</p>
                        <p className="text-muted">SOU-DES</p>
                    </div>
                    :
                    <div className= 'col-xs-4 col-md-2'>
                        <button 
                            className= 'btn br2 b btn-outline-primary'
                            onClick = {onSelect}
                        >
                            Select flight
                        </button>
                    </div>
                }
                    <div className="col-xs-2 text-center">
                        <p style={{color : 'green'}}>€{price}</p>
                    </div>
            </div>
            <div className="col-xs-1 text-center d-flex">
                <span onClick = {handleClick} className = 'center b f4 pointer'>
                    {!state ? 
                        <i className="fa fa-chevron-circle-down"></i> 
                        : <i className="fa fa-chevron-circle-up"></i>
                    }
                </span>
            </div>
            {showAllDetails()}
            {getRedirect(redirect)}
        </div>
    );
}

export default Flight;