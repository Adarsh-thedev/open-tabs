import React from 'react';
import Flight from './Flight';
import Base from './Base';


import airportsData from '../assets/airports_iataTodetails'

const haversine = require('haversine')

const FlightSearchResults = ({location}) => {
    const {searchResult, source, destination, passengers, trip, cabin} = location.state;

    try{
        var start1 = airportsData[source.toUpperCase()]['coordinates']["lat"]
        var start2 = airportsData[source.toUpperCase()]['coordinates']["lon"]
        var end1 = airportsData[destination.toUpperCase()]['coordinates']["lat"]
        var end2 = airportsData[destination.toUpperCase()]['coordinates']["lon"]
    }
    catch(err){
        alert("Invalid Input!");
    }

    var start = {"latitude":start1, "longitude":start2} 
    var end = {"latitude":end1, "longitude":end2}

    var hdistance = Math.ceil(haversine(start,end))

    var distance = 0

    if(hdistance<550){
        distance = hdistance+50
    }
    else if(hdistance>=550 && hdistance<5500){
        distance = hdistance+100
    }
    else if(hdistance>=5500){
        distance = hdistance + 125
    }

    var npas = parseInt(passengers.slice(0,1))
    var ntrip;
    if(trip==="One way"){
        ntrip = 1;
    }
    else{
        ntrip=2;
    }

    var eqn;

    const d = distance

    switch(cabin){
        case "Economy":
            eqn = 0.00000995603237 * d * d + 0.15765953 * d + 43.76057329391733;
            break;
        case "Premium Economy":
            eqn = 0.0000126914356 * d * d + 0.20106170 * d + 55.66932855501864;
            break;
        case "Business":
            eqn = 0.00001866324656 * d * d + 0.295665718 * d + 82.16042181976218;
            break;
        case "First Class":
            eqn = 0.0000248848222 * d * d + 0.394233732 * d + 109.22937305637879;
            break;
        default:
            eqn = 0.00000995603237 * d * d + 0.15765953 * d + 43.76057329391733;
            break;
    }

    const emission = Math.ceil(eqn * npas * ntrip).toString()

    return(
        <Base>
            <div className = 'container nunito mb2'>
                <h3 className = 'center mt2'>
                    {source.slice(0, source.length-5)} - {destination.slice(0, destination.length-5)}
                </h3>
                <div>
                    {Object.values(searchResult[0]).flatMap(airport =>
                        Object.values(airport).map(({flight_number, price, airline, departure_at, return_at, co2})=> (
                            // console.table(flight)
                            <Flight
                                key = {Math.random()}
                                flightNumber={flight_number} 
                                price={price}
                                airline = {airline}
                                departureTime = {departure_at}
                                returnTime = {return_at}
                                co2 = {emission}
                            />
                        ))
                    )}
                </div>
            </div>
        </Base>
    );
}

export default FlightSearchResults;