import React, { useState} from 'react';
import Base from './Base';
import StripeCheckOut from 'react-stripe-checkout';
import Air from '../assets/airplane.svg';

const CarbonOffset = () => {
    const [amount, setAmount] = useState(100);

    const onAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const getToken = () => {
        //
    }

   return(
    <Base>
        <section className="section offset wow fadeIn container nunito" style = {{backgroundImage : `url(${Air})`, width : '100%', backgroundRepeat : 'no-repeat'}}>
            <div className="offsetInfo">
                <span className = 'f4'>Your Climate Impact compared to</span> <br/>
                <span className = 'f5'>Your Flight</span>
                <div className="flightco2 br2" style={{backgroundColor: 'red', color: 'white', width: '50%'}}>
                    <div className="container f5">
                        <p>kg 3,196</p>
                        <p id="totalAmount" style={{display: 'none'}}>3196</p>
                    </div>
                </div>
                <span className = 'f4'>Emission of a car per year</span>
                <div className="carco2 black br2" style={{color: 'white', width: '30%'}}>
                    <div className="container f5">
                        <p>kg 2,000</p>
                    </div>
                </div>
                <h5>Climate compactible annual emissions budget for one person</h5>
                <div className="budget green br2" style={{color: 'white', width: '30%'}}>
                    <div className="container f5">
                        <p>kg 2,300</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="payment">
                    <span className = 'f5'>My compensation amount</span>
                    <p className = 'text-muted f6'>I want to offset my flight's CO<sub>2</sub> emissions of 3,196 kg by <span id="percentage" className = 'b f4'>{amount}</span><b>%</b> by donating the following amount.</p>
                    <div className="slidecontainer" style={{width: '50%', position: 'relative'}}>
                        <div>
                            <input className = 'col-sm-2 col-md-1' type = 'number' min = '5' value = {amount} onChange = {onAmountChange}/>
                            <span className = 'text-success f4 ml2'>€</span>
                            <StripeCheckOut
                                name = 'Pay Compensation'
                                description = 'One step towards better future'
                                amount = {amount * 100}
                                currency = 'EUR'
                                token = {getToken}
                                stripeKey = 'pk_test_J1QnVQbexFpT7xGQcbFmCZCN00IEL47oYp'
                            >
                                <button type="submit" href="payment" className="btn f6 col-sm-8 col-md-4 b ml2 btn-outline-success">Pledge & book</button>
                            </StripeCheckOut>
                            <span className = 'text-danger f3 b ml1 mr1'>OR</span>
                            <button className = 'btn f6 btn-outline-primary b col-sm-8 col-md-3'>book only</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Base>
   );
}

export default CarbonOffset;