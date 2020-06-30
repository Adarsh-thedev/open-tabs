import React, { Component, useState, useRef } from 'react';
import {DateTime} from 'luxon';
import Modal from 'react-modal';
import './styles.css';
import Searchbar from './Searchbar';
import {FiLogOut } from 'react-icons/fi';
import {FiSettings, FiHome, FiUser, FiBell, FiGift} from 'react-icons/fi';
import {FaStar} from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../assets/logo2.png';
import Tooltip from '@material-ui/core/Tooltip';
import logosmall from '../assets/logo1.png';
import { Row, Col } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Background from '../assets/modal-bg.jpg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import AdBlockDetect from 'react-ad-block-detect';

const popover = (
  <Popover id="popover-basic" className='mt-3'>
    <div>
    <Popover.Title as="h3">
    <strong className="mr-auto" style={{textAlign: 'left'}}>OpenTabs' Brand New Look!<br /><small>(Update June 2020)</small></strong>
    </Popover.Title>
    <Popover.Content>
      <div>
        After much preparation, we are launching our ready-for-market version of OpenTabs! A huge thank you to our beta users for your continued support.
        <br />
        <br />
        We urge you to please share OpenTabs with your friends and family to further grow our mission of ending poverty and fighting climate change in innovative ways. 
        <br />
        <br />
        If you haven't yet, we invite you to create an account (by clicking on the settings icon on the lower left) to ensure that you never lose your tabs count again. 
        <br />
        <br />
        Stay tuned for exciting updates coming soon.
      </div>
    </Popover.Content>
    </div>
  </Popover>
);

const Update = () => (
  <OverlayTrigger trigger="click" placement="left" overlay={popover} rootClose>
    <Button id="update-btn"><FiBell /></Button>
  </OverlayTrigger>
);

const NAME_LS = 'name';
const EMAIL_LS = 'email';
const PASSWORD_LS = 'password';
const TABS_LS = 'tabs_opened';
const LOGIN_LS = 'login';

const customStyles = {
    content: {
      width: '100%',
      height: '100vh',
      opacity: '1',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      // background: 'black',
      background: "url(" + { Background } + ")",
      overflow: 'none',
      position:'fixed',
      padding: '0 20px'
      // padding: '0'
      }
  };
const getBGStyle = {
    height: '100vh',
    width: '100%',
    opacity: '1',
};

const ads = {
  ad1:
  '<iframe data-aa="1407350" src="//ad.a-ads.com/1407350?size=320x50&background_color=0080ff&text_color=ffffff&title_color=ffffff&title_hover_color=ffffff&link_color=ffffff&link_hover_color=ffffff" scrolling="no" style="width:320px; height:50px; border:0px; padding:0; overflow:hidden" allowtransparency="true"></iframe>'
};

function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

function validate(name) {
    return {
      name: name.length < 1,
    };
}

export default class Landingpage extends Component {
    constructor() {
        super();
    
        var time = this.getTime();

        this.state = {
          time,
          name: '',
          email: '',
          password: '',
          showPopup: false,
          errors: {
            name: '',
            email: '',
            password: '',
          },
          tabs_opened: JSON.parse(localStorage.getItem(TABS_LS)),
          isNameRequired: true,
          salutation: this.determineSalutation(time.hour),
          login: JSON.parse(localStorage.getItem(LOGIN_LS)) || false,
          /*Validate */
          touched: {
            email: false,
            name: false,
            password: false,
          },
          /*server*/
          response: '',
          post: '',
          responseToPost: '',
          // lpdisplay: 'block',
        };
        this.baseState = this.state;
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleLoad = this.handleLoad.bind(this);
        // this.setState({tabs_opened: this.state.tabs_opened});
    }
 
    componentDidMount() {
        // this.callApi()
        // .then(res => this.setState({ response: res.express }))
        // .catch(err => console.log(err));

        window.addEventListener('load', this.handleLoad);

        const name = localStorage.getItem(NAME_LS);

        if (name) {
          this.setState({name});
        } else {
          this.setState({modalIsOpen: true});
        }
    
        this.interval = setInterval(() => {
          var time = DateTime.local();
          this.setState({
            time,
            salutation: this.determineSalutation(time.hour)
          });
        }, 1000 * 1);
    }

    componentWillUnmount() {
        if (this.interval) {
          clearInterval(this.interval);
        }
        window.removeEventListener('load', this.handleLoad) 
    }

    togglePopup() {  
        this.setState({  
          showPopup: !this.state.showPopup  
        });  
    } 

    onKeyPress(event){
        if(event.which === 13){
          event.preventDefault();
        }
    }

    resetForm = async() => {
        await fetch('/api/users/update_tabs',
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: localStorage.getItem(EMAIL_LS), tabs_opened: localStorage.getItem(TABS_LS)}),    
        }
        )

        // 1st version
        // this.setState(this.baseState);
        // this.setState({login: true});
        // localStorage.setItem(LOGIN_LS, this.state.login);
        // this.setState({modalIsOpen: true});
        // window.localStorage.clear();
        // localStorage.clear();
        // this.setState({tabs_opened: 0});
        // localStorage.setItem(TABS_LS, this.state.tabs_opened);
        // 2nd version
        this.setState({name: ''});
        localStorage.setItem(NAME_LS, this.state.name);
        this.setState({email: ''});
        localStorage.setItem(EMAIL_LS, this.state.email);
        this.setState({password: ''});
        localStorage.setItem(PASSWORD_LS, this.state.password);
        this.setState({login: true});
        localStorage.setItem(LOGIN_LS, this.state.login);
        this.setState({modalIsOpen: true});
        window.localStorage.clear(this.state.login);
        localStorage.clear(this.state.login);
        this.setState({tabs_opened: this.state.tabs_opened});
        localStorage.setItem(TABS_LS, this.state.tabs_opened);
    }
      
    handleChangeName(e) {
        this.setState({name: e.target.value});
    }
    
    handleChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    handleChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

    determineSalutation(hour) {
        if (hour > 11 && hour < 19) {
          return 'afternoon';     
        } else if (hour > 18) {
          return 'evening';
        } else {
          return 'morning';
        }
    }
    
    getTime() {
        return DateTime.local();
    }

    callApi = async () => {
        const response = await (fetch('/api/users/register'));
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
    };
    
    callApi = async () => {
        const response = await fetch('/api/users/update_tabs');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
    };

    // getCookie(name) {
    //     var dc = document.cookie;
    //     var prefix = name + "=";
    //     var begin = dc.indexOf("; " + prefix);
    //     if (begin === -1) {
    //         begin = dc.indexOf(prefix);
    //         if (begin !== 0) return null;
    //     }
    //     else
    //     {
    //         begin += 2;
    //         var end = document.cookie.indexOf(";", begin);
    //         if (end === -1) {
    //         end = dc.length;
    //         }
    //     }
    //     // because unescape has been deprecated, replaced with decodeURI
    //     //return unescape(dc.substring(begin + prefix.length, end));
    //     return decodeURI(dc.substring(begin + prefix.length, end));
    // } 
      
    handleSubmit = async e => {
      e.preventDefault();
        
        // var tab = this.getCookie("tab");

        // if (tab == null) {
        //     console.log('cookie doesnt exist') // do cookie doesn't exist stuff;
        // }
        // else {
        //     this.setState({tabs_opened: tab})
        // }

      var referred_by = localStorage.getItem("referred_by");
      const user_referred = localStorage.getItem("user_referred");
      // if (!user_referred)
      // {
      //   localStorage.setItem("user_referred", "true");
      //   console.log("do it");
      // }
      // else {
      //   referred_by = "";

      //   console.log("dont do it");
      // }

        await fetch('/api/users/register', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: this.state.name, email: this.state.email, password: this.state.password, tabs_opened: this.state.tabs_opened, method: 'local'}),
        })

        .then(res => res.json())
        .then(data=>{
            if(!data.errors){
            this.setState({modalIsOpen: false});
            this.setState({name: this.state.name});
            localStorage.setItem(NAME_LS, this.state.name);
            this.setState({email: this.state.email});
            localStorage.setItem(EMAIL_LS, this.state.email);
            this.setState({password: this.state.password});
            // localStorage.setItem(PASSWORD_LS, this.state.password);
            this.setState({tabs_opened: data.user.tabs_opened});
            localStorage.setItem(TABS_LS, this.state.tabs_opened); 
            this.setState({login: false});
            localStorage.setItem(LOGIN_LS, this.state.login); 
            // this.setState({lpdisplay: 'block'});
          }
          else {
            this.setState({modalIsOpen: true});
            alert('Please enter valid login details!')
            this.setState({login: true});
            localStorage.setItem(LOGIN_LS, this.state.login);
          }
          }          
        )
        this.setState({modalIsOpen: this.state.modalIsOpen})
    };

    handleLoad = async e => {
        e.preventDefault();
        await fetch('/api/users/single_update_tabs',
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: localStorage.getItem(EMAIL_LS)}),    
        }
        )

        this.setState((prevState, { tabs_opened }) => ({
            tabs_opened: prevState.tabs_opened + 1
        }));
        
        this.setState({tabs_opened: this.state.tabs_opened});
        localStorage.setItem(TABS_LS, this.state.tabs_opened);
        this.setState({modalIsOpen: this.state.modalIsOpen})

        this.setState((prevState, { login }) => ({
            login: prevState.login
          }));
          
        this.setState({login: this.state.login});
        localStorage.setItem(LOGIN_LS, this.state.login);
    };

    stayloggedout = () =>{
      this.setState({name: this.state.name});
      localStorage.setItem(NAME_LS, this.state.name);
      this.setState({modalIsOpen: false});
      this.setState({email: ''});
      this.setState({password: ''});
      //1st version
      this.setState({tabs_opened: 0});
      //2nd version
      this.setState({tabs_opened: this.state.tabs_opened});
      localStorage.getItem(LOGIN_LS); 
      this.setState({login: true});
      localStorage.setItem(LOGIN_LS, this.state.login);
      // this.setState({lpdisplay: 'block'});
    }

    handleClick = () => {
      this.setState((prevState, { tabs_opened }) => ({
        tabs_opened: prevState.tabs_opened + 1
      }));
      localStorage.setItem(TABS_LS, this.state.tabs_opened + 1);
    };

    validatename = (e) => {
      if (!this.canBeSubmitted()) {
        e.preventDefault();
        return;
      }
    }
    
    canBeSubmitted() {
      const errors = validate(this.state.name);
      const isDisabled = Object.keys(errors).some(x => errors[x]);
      return !isDisabled;
    } 

    validateemail = (e) => {
      if (!this.EmailcanBeSubmitted()) {
        e.preventDefault();
        return;
      }
    }
    EmailcanBeSubmitted() {
      const errors = validate(this.state.email);
      const isDisabled = Object.keys(errors).some(x => errors[x]);
      return !isDisabled;
  } 

    render() {
        const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
        // const {login} = this.state.login;
        const errors = validate(this.state.name, this.state.email, this.state.password);
        // const isDisabled = Object.keys(errors).some(x => errors[x]);
      
        const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        
        return hasError ? shouldShow : false;
        };

        return (
          <div className="bg" style={getBGStyle}>
            <div className="bg-wrapper">
              <Modal
                isOpen={this.state.modalIsOpen}
                style={customStyles}
                contentLabel="name-modal"
                ariaHideApp={false}
              >
                <img
                  src={logo}
                  width="80"
                  height="99"                    
                  alt="OpenTabs logo"
                  className="User-Logo"
                />
    
                <div className="form-container">
                <form onSubmit={this.handleSubmit} noValidate>
                <input id='step2' type='checkbox'/>
                      <input id='step3' type='checkbox'/>
                        <div id="part1" className="form-group">
                        <div className="panel panel-primary">
                        <Row>
                        <Col>
                        <div className="panel-heading">
                            <h1 className="panel-title">Hello, what's your name?</h1>
                          </div>
                    
                            <input type='text' name='name' 
                            autoComplete='off'
                            onChange={this.handleChangeName} 
                            className={shouldMarkError('name') ? "error" : ""} 
                            placeholder="" 
                            aria-describedby="sizing-addon1" 
                            onBlur={this.handleBlur('name')} 
                            value={this.state.name} 
                            onKeyPress={this.onKeyPress}
                            required pattern="\S+"
                            noValidate />
                        </Col>
                        </Row>
                            <div className="btn-group btn-group-lg" role="group" aria-label="...">
                                <label htmlFor='step2' id="continue-step2" className="continue">
                                    <div className="btn btn-default btn-primary btn-lg" onClick={this.validatename}>Continue</div>
                                </label>
                            </div>
                        </div>
                        </div>

                        <div id="part2" className="form-group">
                        <div className="panel panel-primary">
                        <Row>
                          <Col>
                            <div className="panel-heading">
                                <h1 className="panel-title">What's your email, {this.state.name}?</h1>
                            </div>
                                <input type='email' name='email'
                                autoComplete='off' 
                                onChange={this.handleChangeEmail} 
                                className={shouldMarkError('email') ? "error" : ""} 
                                placeholder="" 
                                aria-describedby="sizing-addon1" 
                                onBlur={this.handleBlur('email')} 
                                value={this.state.email} 
                                onKeyPress={this.onKeyPress}
                                noValidate 
                                pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" required/>
                                <div className="errorspan">
                                    <span className={((this.state.email.length)>0 && !(emailPattern.test(this.state.email))) ? "error" : "hidden"}>This does not look like a valid email address </span>
                                </div>
                            </Col>
                          </Row>
                              
                                <div className="btn-group btn-group-lg btn-group-justified" role="group" aria-label="...">
                                    <label htmlFor='step3' id="continue-step3" className="continue">
                                        <div className="btn btn-default btn-primary btn-lg" role="button" onClick={this.validateemail}>Continue</div>
                                    </label>                    
                                </div>
                                <div className="StayLoggedOut">
                                    <p>Or would you rather stay logged out?<button onClick={this.stayloggedout}>Stay logged out</button></p>
                                </div>
                            </div>
                        </div>

                        <div id="part3" className="form-group">
                        <div className="panel panel-primary">
                        <Row>
                        <Col>
                          <div className="panel-heading">
                            <h1 className="panel-title">{this.state.name}, enter password</h1>
                          </div>
                            <input type='password' name='password'
                            autoComplete='off' 
                            onChange={this.handleChangePassword} 
                            className={shouldMarkError('password') ? "error" : ""} 
                            placeholder="" 
                            aria-describedby="sizing-addon1"
                            onBlur={this.handleBlur('password')} 
                            value={this.state.password} 
                            onKeyPress={this.onKeyPress} 
                            noValidate />
                            <div className="errorspan">
                                <span className={((this.state.password.length)>0 && (this.state.password.length)<5) ? "error" : "hidden"}>Password should be at least five characters.</span>
                            </div>
                          </Col>
                        </Row>
                            <div className="btn-group btn-group-lg" role="group" aria-label="...">
                            <label className="continue">
                                <button type="submit"
                                id="submitbtn"
                                className="btn btn-default btn-primary btn-lg" 
                                onClick={this.handleSubmit}
                                >
                                Continue
                                </button>
                            </label>
                            </div>
                            <label htmlFor='step3' id="back-step3" className="back">
                                <div className="btn btn-default btn-primary btn-lg">Use a different email address</div>
                            </label>
                            </div>
                        </div>
                    </form>
                </div>
              </Modal>

            <div className="top-content">
            <div className="widgets"> 
              <div className="header">
                <div className="text-right top-left logo">
                  <div className="logo-counter">
                    <Update />
                    <div className="tab-counter">
                    <Tooltip disableFocusListener title="No. of Tabs Opened" enterDelay={500} leaveDelay={200}>
                    <div onLoad={this.handleLoad} style={{padding: '8px 8px', position: 'relative', display: 'block'}}>
                      <button style={{border: 'none', background: 'none'}}>
                      {/* <a style={{textDecoration: 'none'}}>  */}
                      {this.state.tabs_opened}
                      {/* </a> */}
                      </button>
                    </div>
                    </Tooltip>
                  </div>
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
            </div>
            
            <div className="bottom-content">
                <div className="text-left bottom-left">
                <Dropdown id="settings">
                  <Dropdown.Toggle>
                  <FiSettings/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1" href="https://opentabs.org/"><FiHome /> Home</Dropdown.Item>
                    <Dropdown.Item eventKey="2" href="https://addons.mozilla.org/en-US/firefox/addon/opentabs_org/" target="_top"><FaStar /> Rate Us</Dropdown.Item>
                    <Dropdown.Item eventKey="3" href="https://docs.google.com/forms/d/e/1FAIpQLScNIVjuhLCUF_CczUf2eCP3VOIiIfl-UhJAsh-f-SJbUq7WnQ/viewform"><FiUser /> Feedback</Dropdown.Item>
                    <Dropdown.Item eventKey="4" href="https://donorbox.org/opentabs"><FiGift /> Donate</Dropdown.Item>
                    <Dropdown.Item eventKey="5" onClick={this.resetForm} onLoad={this.handleLoad}>
                        <FiLogOut /> {(this.state.login) ? "Login" : "Log Out"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
              
            <div className="text-center centered">
              <Row>
                <Col>
                  <Row>
                    <Col>
                    <div className="block-text">
                      <p id="time">{this.state.time.toFormat("HH':'mm")}</p>
                      <p id="greetings">Good {this.state.salutation}, {this.state.name}.</p>
                      <Searchbar />
                    </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="ads">
            <Row className="ads-row">
              <Col style={{textAlign: "center"}}>
                <Tooltip title={<p style={{ fontSize: "14px", lineHeight: "1.2", textAlign: "center" }}>We raise money from these ads to end poverty & stop climate change.</p>}>
                  <div className="Ad1">
                    <Iframe iframe={ads["ad1"]} allow="autoplay"/>,
                  </div>
                </Tooltip>
              </Col>
            </Row>
            {/* <AdBlockDetect>
                <p style={{color: 'white'}}>Show this if an ad blocker has been enabled.</p>
            </AdBlockDetect> */}
            </div>
            </div> 
        </div>
        );
    }
}
