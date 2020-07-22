import React, { useState } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const FlightSearch = () => {
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);

    const [details, setDetails] = useState({
        travelingDate : `${new Date().toISOString().substr(0,10)}`,
        returnDate : `${nextDate.toISOString().substr(0,10)}`,
        trip : 'Round trip',
        passengers : '1 Passenger',
        cabin : 'Economy'
    });

    const [places, setPlaces] = useState({
        source : '',
        destination : ''
    });

    const [suggetion, setSuggetion] = useState({
        sourceSuggestion : [],
        destinationSuggtion : []
    });

    const [searchResult, setSearchResult] = useState([]);

    const [redirect, setRedirect] = useState(false);

    //set default source as the nearest international airport
    useEffect(()=> {
        fetch('https://www.travelpayouts.com/whereami?locale=en')
        .then(response => response.json())
        .then(data =>setPlaces({
            ...places, 
            source : `${data.name} - ${data.iata}`
        }))
    },[]);

    const handleChange = name => event => {
        setDetails({
            ...details,
            [name] : event.target.value
        });
    }

    const {travelingDate, returnDate, passengers, trip, cabin} = details;
    const {source, destination} = places;
    //const {sourceSuggestion, destinationSuggtion} = suggetion;

    const handlePlaceChange = name => event => {
        setPlaces({
            ...places,
            [name] : event.target.value
        });

        return fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/EUR/en-US/?query=${event.target.value}`,{
            headers : {
                "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key":"f85b4d018emsh31896ab868646e1p14a6d7jsn45ecae1f6a58"
            }
        })
        .then(response =>{
            return response.json()
        })
        .then(data => {
            if(name === 'source') {
                setSuggetion({
                    ...suggetion,
                    sourceSuggestion : data
                })
            }
            if(name === 'destination') {
                setSuggetion({
                    ...suggetion,
                    destinationSuggtion : data
                })
            }
        })
        .catch(err => console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!destination || destination.length < 2){
            return alert('Please Select a valid destination');
        }

        //console.log('Event triggered');
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = trip === 'Round trip' ? `https://api.travelpayouts.com/v1/prices/cheap?origin=${source.slice(source.length-3)}&
                    destination=${destination.slice(destination.length-3)}&depart_date=${travelingDate}&return_date=${returnDate}&currency=EUR` 
                    : `https://api.travelpayouts.com/v1/prices/cheap?origin=${source.slice(source.length-3)}&
                    destination=${destination.slice(destination.length-3)}&depart_date=${travelingDate}&currency=EUR`;
        return fetch(proxyurl+url,{
            headers:{
                "x-access-token":"aab719c2a3af14867bb33e77183f05e7"
            }
        })
        .then(response =>{
            return response.json()
        })
        .then(data => {
            setSearchResult([data.data]);
            //console.log(data.data);
            if(data.data)
                setRedirect(true);
        })
        .catch(err => console.log(err));
    }

    const showSearchResult = () => {
        return redirect && (
            <Redirect to = {{
                pathname : '/flights',
                state : {
                    searchResult,
                    source, 
                    destination,
                    passengers,
                    trip,
                    cabin
                }
            }} />
        );
    }

    return(
        <React.Fragment>
            <div className = 'container' style ={{position : 'relative', bottom : '20px'}}>
                <form className = 'br4 ph2 shadow-3 bg1'>
                    <div className = 'top d-flex container ml-2'>
                        <div className="input-field ml1 select-div">
                            <select value = {trip} onChange = {handleChange('trip')} className = 'pointer browser-default bn'>
                                <option style={{color : 'black'}}>One way</option>
                                <option style={{color : 'black'}}>Round trip</option>
                            </select>
                        </div>
                        <div className="input-field ml1 select-div">
                            <select value = {passengers} onChange = {handleChange('passengers')} className = 'pointer browser-default bn'>
                                <option>1 Passenger</option>
                                <option>2 Passengers</option>
                            </select>
                        </div>
                        <div className="input-field ml1 select-div">
                            <select value = {cabin} onChange = {handleChange('cabin')} className = 'pointer browser-default bn'>
                                <option>Economy</option>
                                <option>Premium Economy</option>
                                <option>Business</option>
                                <option>First Class</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex row justify-content-between">
                    <div className="form-group col-xs-12 col-sm-3">
                            <label className = 'b f5'>FROM</label>
                            <div className="autocomplete">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder='From'
                                    value = {source}
                                    onChange = {handlePlaceChange('source')}
                                />
                            </div>
                        </div>
                        <div className="form-group col-xs-12 col-sm-3">
                            <label className = 'b f5'>TO</label>
                            <div className="autocomplete">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Where to?"
                                    value={destination}
                                    onChange = {handlePlaceChange('destination')}
                                />
                            </div>
                        </div>
                        <div className="form-group col-xs-12 col-sm-3">
                            <label className = 'b f5'>DEPART</label>
                            <div>
                                <input 
                                    type="date"
                                    className="form-control" 
                                    value={travelingDate}
                                    onChange = {handleChange('travelingDate')}
                                />
                            </div>
                        </div>
                        {trip === 'Round trip'?
                            <div className="form-group col-xs-12 col-sm-3">
                            <label className = 'b f5'>RETURN</label>
                            <div>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    value={returnDate}
                                    onChange = {handleChange('returnDate')}
                                />
                            </div>
                            </div> :
                            ''
                        }
                    </div>
                    <div className="center" style = {{position : 'relative', top : '16px'}}>
                        <button 
                            className="btn blue text-white br-pill dim b"
                            onClick = {handleSubmit}
                            onKeyPress = {(e) => {
                                if(e.keyCode === 13) {
                                    handleSubmit();
                                }
                            }}
                        >
                            <i className="fa fa-send mr-2" aria-hidden="true"> Search Flights</i>
                        </button>
                    </div>
                </form>
            </div>
            {showSearchResult()}
        </React.Fragment>
    );
}

export default FlightSearch;