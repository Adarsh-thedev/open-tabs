import React, { Component, useState, useRef } from 'react';
import logosmall from '../assets/logo1.png';
import './styles.css';
import {FiSettings, FiHome, FiUser, FiBell, FiGift} from 'react-icons/fi';
import { Row, Col } from 'react-bootstrap';
import Tabcounter from './Tabcounter';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
// import Count from './count';

function Update() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <Row >
      <Overlay target={target.current} show={show}>
      <Col xs={10}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{position: 'fixed', right: '18%'}}> 
          <Toast.Header>
            <strong className="mr-auto" style={{textAlign: 'left'}}>OpenTabs' Brand New Look!<br />(Update May 2020)</strong>
          </Toast.Header>
          <Toast.Body style={{textAlign: 'justify'}}>
            <div>
            After much preparation, we are launching our ready-for-market version of OpenTabs! A huge thank you to our beta users for your continued support.
            <br />
            <br />
            We urge you to please share OpenTabs with your friends and family to further grow our mission of reducing poverty and fighting climate change. 
            <br />
            <br />
            If you haven't yet, we invite you to create an account (by clicking on the settings icon on the lower left) to ensure that you never lose your tabs count again, and can sync it across browsers and devices. 
            <br />
            <br />
            Stay tuned for exciting updates coming soon.
            </div>
          </Toast.Body>
        </Toast>
      </Col>
      
      </Overlay>
      <Col xs={3}>
        <Button id="update-btn" ref={target} onClick={() => setShow(true)}><FiBell /></Button>
      </Col>
    </Row>

  );
}

export default class Header extends Component {
  constructor(props){  
    super(props);  
    this.state = { showPopup: false };  
    }  
    
    togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }  
    render() {
        return (
            <div className="widgets"> 
              <div className="header">
                <div className="text-right top-left logo">
                  <div className="logo-counter">
                    <Update />
                    {/* <Tabcounter /> */}
                    {/* <Count /> */}
                    <img
                      src={logosmall}
                      width="35"
                      height="35"
                      className="d-inline-block align-top"
                      alt="OpenTabs logo"
                    />
                  </div>
                </div>                 
            </div>
            </div>    
        )
    }
}
