import React, { Component, useState, useRef } from 'react';
import {DateTime} from 'luxon';
import Modal from 'react-modal';
import './styles.css';
import Searchbar from './Searchbar';
import { FiArrowRight, FiLogOut } from 'react-icons/fi';
import {FiSettings, FiHome, FiUser, FiBell, FiGift} from 'react-icons/fi';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../assets/logo2.png';
import Tooltip from '@material-ui/core/Tooltip';
import logosmall from '../assets/logo1.png';
import { Row, Col } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';

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

const NAME_LS = 'name';
const EMAIL_LS = 'email';
const PASSWORD_LS = 'password';
const TABS_LS = 'tabs_opened';
const LOGIN_LS = 'login';


const customStyles = {
    content: {
      width: '100vw',
      height: '100vh',
      opacity: '1',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      background: 'none',
      overflow: 'none',
      position:'fixed',
      padding: '0 20px'
      }
  };
  const getBGStyle = {
    height: '100vh',
    width: '100%',
    opacity: '1',
};

function validate(name, email, password) {
    return {
      name: name.length < 1,
    };
  }
export default class Landingpage extends Component {
    constructor() {
        super();
    
        var time = this.getTime();

        const images = [
          require('../assets/modal-bg.jpg'),
          require('../assets/img1.jpg'),
          require('../assets/img2.jpg'),
          require('../assets/img3.jpg'),
          require('../assets/grant-porter-YMBpLXZrHmc-unsplash.jpg'),
          require('../assets/lina-loos-04-C1NZk1hE-unsplash.jpg'),
          require('../assets/michael-humphries-og3xEhnrOpQ-unsplash.jpg'),
          require('../assets/paul-keiffer-aaUJ_mfSiDU-unsplash.jpg')
        ];

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
          images, currentImg: 0,
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
        };
        this.baseState = this.state;

        this.changeState = this.changeState.bind(this);

        this.closeModal = this.closeModal.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleLoad = this.handleLoad.bind(this);
        this.setState({tabs_opened: this.state.tabs_opened});
      }

      changeState = () => {
        this.setState({
          login: !this.state.login
        });
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

      resetForm = () => {
        this.setState(this.baseState);
        this.setState({login: true});
        localStorage.setItem(LOGIN_LS, this.state.login);
        this.setState({modalIsOpen: true});
        window.localStorage.clear();
        localStorage.clear();
        // this.setState({name: 'Tabber'});
        // localStorage.setItem(NAME_LS, this.state.name);
        // this.setState({modalIsOpen: false}); //for tabber 
        this.setState({tabs_opened: this.state.tabs_opened});
        localStorage.setItem(TABS_LS, this.state.tabs_opened);
      }

      closeModal() {
        this.setState({modalIsOpen: false});
        this.setState({name: this.state.name});
        localStorage.setItem(NAME_LS, this.state.name);
        this.setState({email: this.state.email});
        localStorage.setItem(EMAIL_LS, this.state.email);
        this.setState({password: this.state.password});
        localStorage.setItem(PASSWORD_LS, this.state.password);
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

      componentDidMount() {

        this.interval = setInterval(() => this.changeBackgroundImage(), 86400000);
        /*server*/
        this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));

        window.addEventListener('load', this.handleLoad);

        const name = localStorage.getItem(NAME_LS);
        const email = localStorage.getItem(EMAIL_LS);
        const password = localStorage.getItem(PASSWORD_LS);
        const tabs_opened = localStorage.getItem(TABS_LS);

        if (name/*, email, password*/) {
          this.setState({name});
          // this.setState({email});
          // this.setState({password});
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

      changeBackgroundImage() {
        let newCurrentImg = 0;
        const {images, currentImg} = this.state;
        const noOfImages = images.length;
  
        if (currentImg !== noOfImages - 1) {
          newCurrentImg = currentImg + 1;
        }
  
        this.setState({currentImg: newCurrentImg});
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

      /*server*/
      callApi = async () => {
        const response = await (fetch('/api/users/register'));
        // fetch('/api/users/update_tabs')])
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
      
      handleSubmit = async e => {
        e.preventDefault();
        
        const response = await fetch('/api/users/register', 
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
            console.log(data);
            if(!data.errors){
            this.setState({modalIsOpen: false});
            console.log(this.state.modalIsOpen);
            this.setState({name: this.state.name});
            localStorage.setItem(NAME_LS, this.state.name);
            this.setState({email: this.state.email});
            localStorage.setItem(EMAIL_LS, this.state.email);
            this.setState({password: this.state.password});
            localStorage.setItem(PASSWORD_LS, this.state.password);
            this.setState({tabs_opened: this.state.tabs_opened});
            localStorage.setItem(TABS_LS, this.state.tabs_opened); 
            this.setState({login: false}); //important to keep this false to get logout option
            localStorage.setItem(LOGIN_LS, this.state.login); 
          }
          else {
            this.setState({modalIsOpen: true});
            alert('Please enter valid login details!')
            console.log(this.state.modalIsOpen);
            this.setState({login: true}); //important to keep this false to get logout option
            localStorage.setItem(LOGIN_LS, this.state.login);
          }
          }          
        )
        this.setState({modalIsOpen: this.state.modalIsOpen})
        console.log(this.state.modalIsOpen);

        // this.setState({login: false});
        // localStorage.setItem(LOGIN_LS, this.state.login); 
        };

        handleLoad = async e => {
            e.preventDefault();
            const response = await fetch('/api/users/update_tabs',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: localStorage.getItem(EMAIL_LS), tabs_opened: localStorage.getItem(TABS_LS)}),    
            }
            )
            .then(res=>console.log(res.json()));

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

            // if((this.state.email.length)<1){
            //   this.setState({login: false}) //to make logout toggle stay even on load
            //   localStorage.setItem(LOGIN_LS, this.state.login);
            //   console.log(this.state.login);
            // }
            // else {
            //   this.setState({login: false}) //to make logout toggle stay even on load
            //   localStorage.setItem(LOGIN_LS, this.state.login);
            //   console.log(this.state.login);
            // }
            
          };

    stayloggedout = () =>{
      this.setState({name: this.state.name});
      localStorage.setItem(NAME_LS, this.state.name);
      this.setState({modalIsOpen: false});
      this.setState({email: ''});
      this.setState({password: ''});
      localStorage.getItem(LOGIN_LS); 
      this.setState({login: true});
      localStorage.setItem(LOGIN_LS, this.state.login);
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
        const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
        if (!emailPattern.test(this.state.email)) {
          errors.email = 'Enter a valid email';
        //   alert('Email should be in abc@email.com format')
        }
        this.setState({email: this.state.email})
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
      }  

    //   validatepassword= (e) => {
    //     if (!this.PasswordcanBeSubmitted()) {
    //       e.preventDefault();
    //       return;
    //     }
    //   }
    //   PasswordcanBeSubmitted() {
    //     const errors = validate(this.state.password);
    //     if ({password: '' || this.state.password.length < 5}){
    //         alert('Password should be of minimum 5 characters!')
    //         this.setState({modalIsOpen: true})
    //     }
    //     this.setState({password: this.state.password})
    //     const isDisabled = Object.keys(errors).some(x => errors[x]);
    //     return !isDisabled;
    //   }  

      render() {
        const {images, currentImg} = this.state;
        const urlString = `url('${images[currentImg]}')`;

        const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
        const {login} = this.state.login;

        const errors = validate(this.state.name, this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
      
        const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        
        return hasError ? shouldShow : false;
        };

        return (
          <div className="bg" style={getBGStyle}/*style={{backgroundImage: urlString}}*/>
            <div className="bg-wrapper">
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
                      <a href="" target="_blank" style={{textDecoration: 'none'}}> 
                      {this.state.tabs_opened}</a>
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
                    <Dropdown.Item eventKey="1" target="_blank" href="http://opentabs.org"><FiHome /> Home</Dropdown.Item>
                    <Dropdown.Item eventKey="2" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScNIVjuhLCUF_CczUf2eCP3VOIiIfl-UhJAsh-f-SJbUq7WnQ/viewform"><FiUser /> Feedback</Dropdown.Item>
                    <Dropdown.Item eventKey="3" target="_blank" href="https://donorbox.org/opentabs"><FiGift /> Donate</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={this.resetForm} onLoad={this.handleLoad}/*onLoad={this.LoginLoad}*/>
                      {console.log(this.state.login)}             
                    {/* <FiLogOut /> {login? "Login" : "Log Out"} */}
                    <FiLogOut /> {(this.state.login) ? "Login" : "Log Out"}
                    {/* <span className={(this.state.email.length)>0 ? "Login" : "Log Out"}> </span> */}
                    {/* <FiLogOut /> {(()=>{
                        switch (this.state.login){
                            case "true": return "login";
                            default: return "Log Out";
                        }
                    })} */}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
              
              <div className="text-center centered" >
                <div className="block-text">
                  <h1 id="time">{this.state.time.toFormat("HH':'mm")}</h1>
                </div>
                <h3 id="greetings">
                  Good {this.state.salutation}, {this.state.name}.
                </h3>
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

                <div class="form-container">
                <form onSubmit={this.handleSubmit} noValidate>
                <input id='step2' type='checkbox'/>
                      <input id='step3' type='checkbox'/>
                      <div id="part1" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">Hey, what's your name?</h1>
                          </div>
                    
                        <input type='text' name='name' 
                        onChange={this.handleChangeName} 
                        className={shouldMarkError('name') ? "error" : ""} 
                        placeholder="" 
                        aria-describedby="sizing-addon1" 
                        onBlur={this.handleBlur('name')} 
                        value={this.state.name} 
                        onKeyPress={this.onKeyPress} /*onSubmit={this.validatename}*/ 
                        required pattern="\S+"
                        noValidate />
                        <span className={shouldMarkError('name') ? "error" : "hidden"}
                          >invalid name</span>
                        <div className="btn-group btn-group-lg" role="group" aria-label="...">
                          <label for='step2' id="continue-step2" class="continue">
                              <div className="btn btn-default btn-primary btn-lg" onClick={this.validatename}><FiArrowRight /> </div>
                            </label>
                          </div>
                    </div>
                    </div>

                      <div id="part2" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">What's your email {this.state.name}?</h1>
                          </div>
                            <input type='email' name='email' 
                            onChange={this.handleChangeEmail} 
                            className={shouldMarkError('email') ? "error" : ""} 
                            placeholder="" 
                            aria-describedby="sizing-addon1" 
                            onBlur={this.handleBlur('email')} 
                            value={this.state.email} 
                            onKeyPress={this.onKeyPress}
                            noValidate 
                            pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" required/>
                        
                            {/* <span className={shouldMarkError('email') ? "error" : "hidden"}
                            >invalid email</span> */}

                          <span className={((this.state.email.length)>0 /*&& (this.state.email.length)<5 */&& !(emailPattern.test(this.state.email))) ? "error" : "hidden"}>'{this.state.email}' is not a valid email </span>

                        <div className="btn-group btn-group-lg btn-group-justified" role="group" aria-label="...">
                            <label for='step3' id="continue-step3" className="continue">
                              <div className="btn btn-default btn-primary btn-lg" role="button" onClick={this.validateemail}><FiArrowRight /> </div>
                            </label>                    
                          </div>
                        <div className="StayLoggedOut">
                            <p>Or would you rather stay logged out?<button onClick={this.stayloggedout}>Stay logged out</button></p>
                        </div>
                    </div>
                    </div>
                    
                      <div id="part3" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">{this.state.name}, enter password</h1>
                          </div>
                            <input type='password' name='password' 
                            onChange={this.handleChangePassword} 
                            className={shouldMarkError('password') ? "error" : ""} 
                            placeholder="" 
                            aria-describedby="sizing-addon1"
                            onBlur={this.handleBlur('password')} 
                            value={this.state.password} 
                            onKeyPress={this.onKeyPress} 
                            noValidate />

                        <span className={((this.state.password.length)>0 && (this.state.password.length)<5) ? "error" : "hidden"}>Please enter a valid password for {this.state.email}</span>

                        <div className="btn-group btn-group-lg" role="group" aria-label="...">
                        <label className="continue">
                            <button type="submit"
                              id="submitbtn"
                              className="btn btn-default btn-primary btn-lg" 
                              onClick={this.handleSubmit}
                            >
                            <FiArrowRight />
                            </button>
                        </label>
                        </div>
                        <label for='step3' id="back-step3" class="back">
                            <div class="btn btn-default btn-primary btn-lg">Use a different email address</div>
                        </label>
                        </div>
                        </div>
                    </form>
                </div>
                </Modal>
              <div className="Search">
                <Searchbar />
              </div>
              </div>
            </div> 
          </div>
        );
      }
}
