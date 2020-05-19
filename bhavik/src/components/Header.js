import React, { Component, useState } from 'react';
import logo from '../assets/logo.png';
import './styles.css';
import {FiSettings, FiHome, FiUser, FiBell} from 'react-icons/fi';
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
    <Row>
      <Col xs={9}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Update (May 2020)</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Welcome to your new extension! Now Better!</Toast.Body>
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
            
              <div className="text-left bottom-left">
              <Dropdown id="settings">
                <Dropdown.Toggle>
                <FiSettings/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1" target="_blank" href="http://opentabs.org"><FiHome /> Home</Dropdown.Item>
                  <Dropdown.Item eventKey="2" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScNIVjuhLCUF_CczUf2eCP3VOIiIfl-UhJAsh-f-SJbUq7WnQ/viewform"><FiUser /> Feedback</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>     
            </div>
        )
    }
}
