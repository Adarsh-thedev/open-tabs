import React, { Component, useState } from 'react';
import logo from '../assets/logo.png';
import './styles.css';
import {FiSettings, FiHome, FiUser, FiBell, FiGift} from 'react-icons/fi';
import Dropdown from 'react-bootstrap/Dropdown';
import { Row, Col } from 'react-bootstrap';
import Tabcounter from './Tabcounter';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import Button from 'react-bootstrap/Button';

function Update() {
  const [show, setShow] = useState(true);

  return (
    <Row style={{
      position: 'relative',
      margin: '0 -15px'
    }}>
      <Col xs={9}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{
      position: 'absolute'
    }}> 
          <Toast.Header>
            <strong className="mr-auto" style={{textAlign: 'left'}}>OpenTabs' Brand New Look!<br />(Update May 2020)</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body style={{textAlign: 'justify'}}>
            <div>
          After much preparation and hard work, we are launching our ready-for-market version of OpenTabs. A huge thank you to our 100 beta users and their faith in us for helping us reach this milestone.
          This has all been possible thanks to you and we urge you to please share OpenTabs with your friends and family to further grow our mission of reducing poverty and fighting climate change.
          <br />
          <br />
          New Features Include:
          <ul>
            <li>A new and improved design</li>
            <li>Daily-changing stunning wallpapers</li>
            <li>A secure and privacy-centred account system.</li>
          </ul>
          If you haven't yet, we invite you to create an account (by clicking on the settings icon on the lower left) to ensure that you never lose your tabs count again, and can sync it across browsers and devices. Stay tuned for exciting updates coming soon.
          </div>
          </Toast.Body>
        </Toast>
      </Col>
      <Col xs={3}>
        <Button id="update-btn" onClick={() => setShow(true)}><FiBell /></Button>
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
                    <Tabcounter />
                    <img
                      src={logo}
                      width="35"
                      height="35"
                      className="d-inline-block align-top"
                      alt="OpenTabs logo"
                    />
                  </div>
                </div>                 
            </div>

            {/* <div className="text-left bottom-left">
            <Dropdown id="settings">
              <Dropdown.Toggle style={{padding: '0'}}>
              <FiSettings/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1" target="_blank" href="http://opentabs.org"><FiHome /> Home</Dropdown.Item>
                <Dropdown.Item eventKey="2" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScNIVjuhLCUF_CczUf2eCP3VOIiIfl-UhJAsh-f-SJbUq7WnQ/viewform"><FiUser /> Feedback</Dropdown.Item>
                <Dropdown.Item eventKey="3" target="_blank" href="https://donorbox.org/opentabs"><FiGift /> Donate</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </div> */}
            </div>    
        )
    }
}
