import React, { Component, useState } from 'react';
import './styles.css';
import {FiSettings, FiHome, FiUser, FiBell, FiGift} from 'react-icons/fi';
import Dropdown from 'react-bootstrap/Dropdown';


export default class Settings extends Component {
    render() {
        return (
            <div className="text-left bottom-left">
            <Dropdown id="settings">
              <Dropdown.Toggle>
              <FiSettings/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1" target="_blank" href="http://opentabs.org"><FiHome /> Home</Dropdown.Item>
                <Dropdown.Item eventKey="2" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScNIVjuhLCUF_CczUf2eCP3VOIiIfl-UhJAsh-f-SJbUq7WnQ/viewform"><FiUser /> Feedback</Dropdown.Item>
                <Dropdown.Item eventKey="3" target="_blank" href="https://donorbox.org/opentabs"><FiGift /> Donate</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </div>  
        )
    }
}