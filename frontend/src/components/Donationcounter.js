import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const dcounter = (
    <Popover id="popover-dcounter" className='mt-2'>
      <div>
      <Popover.Content>
        <div className="dcounter-content">
          <p>
          This is how much money our community has raised towards our cause. Every tab you open helps end poverty and stop climate change.
          </p>
        </div>
        <div className="invite-content">
          {/* <Button id="invite-btn">Invite</Button> */}
        </div>  
      </Popover.Content>
      </div>
    </Popover>
  );

const { useState, useEffect } = React;
// const test = 'test';

// function DonationCount() {
//   // var fcount = localStorage.getItem('test') || 0; //error is that this var stays as string hence tofixed fails on reload
//   // var value = fcount || 2000;
//   var value = 2000;
//   var [dcounter, setCounter] = useState(value);
  
//   // localStorage.setItem('test', dcounter);

//   useEffect(() => {
    
//     const interval = setInterval(() => {
//       var count = .05;
//       setCounter(dcounter => dcounter + count);
//     }, 1000);
    

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);
//   localStorage.setItem('test', dcounter.toFixed(2));
//   return <p id="donationcount">${(dcounter).toFixed(2)}</p>;
// };

const Mcount_LS = 'Mcount';
export default class Donationcounter extends Component {
  //   constructor() {
  //   super();

  //   this.state = {
  //     Mcount: (localStorage.getItem('test'))
  //   };
  // }
  // componentDidMount(){
  //   window.addEventListener('load', this.handleLoad);
  // }
  // handleLoad = async e => {       
  //   e.preventDefault();        
  //   this.setState({Mcount: this.state.Mcount});
  //   localStorage.setItem(Mcount_LS, this.state.Mcount);       
  // };
  
  constructor(props) {
    super(props);

    this.state = { seconds: parseFloat(localStorage.getItem('Mcount')) || parseFloat(2863.09).toFixed(2) };
  }
  tick() {
    if (this.state.seconds < 1000000000) {
      this.setState(prevState => ({
        seconds: prevState.seconds + .00005
      }));
      this.setState({Mcount: parseFloat(this.state.seconds).toFixed(2)});
      localStorage.setItem(Mcount_LS, parseFloat(this.state.seconds).toFixed(2));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

    render() {
      
        return (
            <div>
                <OverlayTrigger trigger="click" placement="bottom" overlay={dcounter} rootClose>
                  <Button id="Donation-btn"><p>€{(localStorage.getItem('Mcount'))}</p></Button>
                </OverlayTrigger>
            </div>
        )
    }
}

