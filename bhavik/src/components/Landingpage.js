import React, {Component, useState} from 'react';
import {DateTime} from 'luxon';
import Modal from 'react-modal';
import './styles.css';
import Header from './Header';
import Searchbar from './Searchbar';
import { FiArrowRight, FiLogOut } from 'react-icons/fi';
import {FiSettings, FiHome, FiUser, FiBell, FiGift} from 'react-icons/fi';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../assets/logo2.png';

const NAME_LS = 'name';
const EMAIL_LS = 'email';
const PASSWORD_LS = 'password';
const TABS_LS = 'tabs_opened';

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
      backgroundColor: 'none',
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
  // true means invalid, so our conditions got reversed
  return {
    name: name.length === 0, //true if name is empty
    // email: email.length === 0, //true if email is empty
    // password: password.length === 0, //true if password is empty
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
          errors: false,
          // tabs_opened: 0,
          isNameRequired: true,
          salutation: this.determineSalutation(time.hour),
          login: true,
          images, currentImg: 0,
          // imgPath: "url(" + images[1] + ")" ,
          /*Bg Image*/
          // images: [
          //   "https://unsplash.com/photos/pBx1VvMCL24",
          //   "https://unsplash.com/photos/pBx1VvMCL24",
          //   "https://unsplash.com/photos/pBx1VvMCL24"
          // ],
          // selectedImage: "https://unsplash.com/photos/pBx1VvMCL24",
          /*Validate */
          touched: {
            email: false,
            username: false,
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
      }
      
      changeState = () => {
        this.setState({
          login: !this.state.login
        });
      }

      onKeyPress(event){
        if(event.which === 13){
          event.preventDefault();
        }
      }

      resetForm = () => {
        this.setState(this.baseState);
        this.setState({modalIsOpen: true});
        window.localStorage.clear();
        localStorage.clear();
        this.setState({login: this.state.login});
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
        // this.setState({tabs_opened: this.state.tabs_opened});
        // localStorage.setItem(TABS_LS, this.state.tabs_opened);
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
        // .catch(err => this.setState({ modalIsOpen: true}));

        const name = localStorage.getItem(NAME_LS);
        const email = localStorage.getItem(EMAIL_LS);
        const password = localStorage.getItem(PASSWORD_LS);
        // const tabs_opened = localStorage.getItem(TABS_LS);

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
          // this.setState({ imgPath: "url(" + images[0] + ")" })
        }, 1000 * 1);
      }

      
      componentWillUnmount() {
        if (this.interval) {
          clearInterval(this.interval);
        }
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
        const response = await fetch('/api/users/register');
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
            name: this.state.name, email: this.state.email, password: this.state.password/*,tabs_opened: this.state.tabs_opened*/,method: 'local'}),
        })
        // .then(
        //   req=>{
        //     if(!req.json.errors){
        //       // return console.log(this.state.modalIsOpen)
        //       this.setState({modalIsOpen: false})
        //     }
        //     else{
        //       // return console.log(!this.state.modalIsOpen)
        //       this.setState({modalIsOpen: true})
        //     }
        //   }
        // )
        // .then(
        //   res=>console.log(res.json()) 
        // )
        // .then(
        //   req=>{
        //     if(!req.json.errors){
        //       this.setState({errors: false});
        //       console.log(this.state.errors);
        //     }
        //   }
        // )

        // if({errors: false}){
        //   alert('Welcome')
        //   this.setState({modalIsOpen: false});
        //     console.log(this.state.modalIsOpen);
        //     this.setState({name: this.state.name});
        //     localStorage.setItem(NAME_LS, this.state.name);
        //     // localStorage.setItem(name, this.state.name);
        //     this.setState({email: this.state.email});
        //     localStorage.setItem(EMAIL_LS, this.state.email);
        //     // localStorage.setItem(email, this.state.email);
        //     this.setState({password: this.state.password});
        //     localStorage.setItem(PASSWORD_LS, this.state.password);
        //     // localStorage.setItem(password, this.state.password);
        //     this.setState({tabs_opened: this.state.tabs_opened});
        //     localStorage.setItem(TABS_LS, this.state.tabs_opened); 
        //     this.setState({login: false});
        // }if({errors: true}){
        //   alert('logi properly')
        //   this.setState({modalIsOpen: true});
        //     console.log(this.state.modalIsOpen);
        // }

        .then(
          req=>{
            if(!req.json.errors){
            this.setState({modalIsOpen: false});
            console.log(this.state.modalIsOpen);
            this.setState({name: this.state.name});
            localStorage.setItem(NAME_LS, this.state.name);
            // localStorage.setItem(name, this.state.name);
            this.setState({email: this.state.email});
            localStorage.setItem(EMAIL_LS, this.state.email);
            // localStorage.setItem(email, this.state.email);
            this.setState({password: this.state.password});
            localStorage.setItem(PASSWORD_LS, this.state.password);
            // localStorage.setItem(password, this.state.password);
            this.setState({tabs_opened: this.state.tabs_opened});
            localStorage.setItem(TABS_LS, this.state.tabs_opened); 
            this.setState({login: false}); //important to keep this false to get logout option
          }
          else {
            this.setState({modalIsOpen: !this.state.modalIsOpen});
            window.localStorage.clear();
            localStorage.clear();
            this.setState({name: ''});
            localStorage.setItem(NAME_LS, this.state.name);
            // localStorage.setItem(name, this.state.name);
            this.setState({email: ''});
            localStorage.setItem(EMAIL_LS, this.state.email);
            // localStorage.setItem(email, this.state.email);
            this.setState({password: ''});
            localStorage.setItem(PASSWORD_LS, this.state.password);
            // localStorage.setItem(password, this.state.password);
            console.log(this.state.modalIsOpen);
          }
          // this.setState({modalIsOpen: this.state.modalIsOpen}) 
          }
                   
        )
        
        console.log(this.state.modalIsOpen);
        
        
        // // /*close modal code*/
        // this.setState({modalIsOpen: false});
        // this.setState({name: this.state.name});
        // localStorage.setItem(NAME_LS, this.state.name);
        // // localStorage.setItem(name, this.state.name);
        // this.setState({email: this.state.email});
        // localStorage.setItem(EMAIL_LS, this.state.email);
        // // localStorage.setItem(email, this.state.email);
        // this.setState({password: this.state.password});
        // localStorage.setItem(PASSWORD_LS, this.state.password);
        // // localStorage.setItem(password, this.state.password);
        // this.setState({tabs_opened: this.state.tabs_opened});
        // localStorage.setItem(TABS_LS, this.state.tabs_opened); 
        // this.setState({login: false}); //important to keep this false to get logout option
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
            
    stayloggedout = () =>{
      this.setState({name: this.state.name});
      localStorage.setItem(NAME_LS, this.state.name);
      this.setState({modalIsOpen: false});
      this.setState({email: ''});
      this.setState({password: ''});
      this.setState({login: true});
      // alert('enter valid login details')
    }

    handleClick = () => {
      this.setState((prevState, { tabs_opened }) => ({
        tabs_opened: prevState.tabs_opened + 1
      }));
      localStorage.setItem(TABS_LS, this.state.tabs_opened + 1);
    };

//     checkTab(){
//       var x = getCookie("tab");    
//       document.getElementById("tabb").innerHTML = x + '  <img id="what" src="Images/logo.png" alt="">' ;
//       setCookie("tab",eval(x)+1,30);
      
//   }
//   setup(){
//     // photo = getCookie("photo");
//     tab = getCookie("tab");
//     if(tab == ""){
//         setCookie('tab',1,30);
//     }
// }

      render() {

        // const myelement = (
        //   <h1 id="counter"> 1 </h1>
        // );
        
        const {images, currentImg} = this.state;
        const urlString = `url('${images[currentImg]}')`;

        const {login} = this.state.login;

        const errors = validate(this.state.name);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
      
        const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        
        return hasError ? shouldShow : false;
        };
        // var bgimg = this.state.selectedImage;
        // var bg=require('../assets/modal-bg.jpg')
        // const Images = [
        //   require('../assets/modal-bg.jpg'),
        //   require('../assets/img1.jpg'),
        //   require('../assets/img2.jpg')   ];
        // const bgimg = require(this.state.backgroundStyle.backgroundImage)

        // var images = [
        //   "https://unsplash.com/photos/pBx1VvMCL24",
        //     "https://unsplash.com/photos/pBx1VvMCL24",
        //     "https://unsplash.com/photos/pBx1VvMCL24"
        // ]
        
        // // var imageHead = document.getElementById("image-head");
        // var i = 0;
        
        // setInterval(function() {
        //       // imageHead.style.backgroundImage = "url(" + images[i] + ")";
        //       i = i + 1;
        //       if (i == images.length) {
        //         i =  0;
        //       }
        // }, 1000);

        return (
          <div className="bg" /*id="image-head" */style={{backgroundImage: urlString}}/* style={getBGStyle} style={{ backgroundImage: "url(" + images[i] + ")"}} style={getBGStyle}style={{ backgroundImage: this.state.imgPath }} style ={ { backgroundImage: "url("+Images[0]+")" } } style={ { backgroundImage: "url("+bgimg+")"}}*/>
            <div className="bg-wrapper">
            <div className="top-content">
                <div>
                  <Header />
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
                    <Dropdown.Item eventKey="4" onClick={this.resetForm/*, this.changeState*/}
                    /*className={login ? "btn-primary" : "btn-danger"}*/>
                      {console.log(this.state.login)}
                      {/* if({this.state.login}){
                        alert('welcome')
                      }
                        else{
                          alert('login with valid')
                        }
                      } */}
                      
                    <FiLogOut /> {this.state.login? "Login" : "Log Out"}
                    {/*  Log out */}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
              
              <div className="text-center centered" >
              {/* <img src={this.state.selectedImage} /> */}
                <div className="block-text">
                  <h1 id="time">{this.state.time.toFormat("HH':'mm")}</h1>
                </div>
                <h3 id="greetings">
                  Good {this.state.salutation}, {this.state.name}.
                </h3>
                {/* {myelement} */}
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
                    <form action="" role="form" /*onSubmit={this.handleSubmit}*/>
                      <input id='step2' type='checkbox'/>
                      <input id='step3' type='checkbox'/>
                      <div id="part1" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">Hey, what's your name?</h1>
                          </div>
                          <input 
                          type="text" 
                          id="name" 
                          className=/*"form-control"*/{shouldMarkError('name') ? "error" : ""} 
                          placeholder="" 
                          aria-describedby="sizing-addon1" 
                          onChange={this.handleChangeName}
                          onBlur={this.handleBlur('name')} 
                          value={this.state.name} 
                          onKeyPress={this.onKeyPress} /*onSubmit={this.validatename}*/ 
                          required pattern="\S+"/>
                          <span className={shouldMarkError('name') ? "error" : "hidden"}
                          >invalid name</span>
                          <div className="btn-group btn-group-lg" role="group" aria-label="...">
                          <label for='step2' id="continue-step2" class="continue">
                              <div className="btn btn-default btn-primary btn-lg" onClick={this.validatename} /*validate={validate}*/><FiArrowRight /> </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div id="part2" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">What's your email {this.state.name}?</h1>
                          </div>
                          <input 
                          type="email" 
                          id="email" 
                          className={shouldMarkError('email') ? "error" : ""}
                          placeholder="" 
                          onChange={this.handleChangeEmail}
                          onBlur={this.handleBlur('email')} 
                          value={this.state.email} 
                          onKeyPress={this.onKeyPress} />
                          <span className={shouldMarkError('email') ? "error" : "hidden"}
                          >invalid email</span>
                          <div className="btn-group btn-group-lg btn-group-justified" role="group" aria-label="...">
                            <label for='step3' id="continue-step3" className="continue">
                              <div className="btn btn-default btn-primary btn-lg" role="button"><FiArrowRight /> </div>
                            </label>                    
                          </div>
                          <div className="StayLoggedOut">
                              <p>Or Would you rather stay logged out?<button onClick={this.stayloggedout}>Stay logged out</button></p>
                            </div> 
                        </div>
                      </div>

                      <div id="part3" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">{this.state.name}, enter password</h1>
                          </div>
                          <input 
                          type="password" 
                          id="password" 
                          className={shouldMarkError('password') ? "error" : ""}
                          placeholder="" 
                          onChange={this.handleChangePassword}
                          onBlur={this.handleBlur('password')} 
                          value={this.state.password} 
                          onKeyPress={this.onKeyPress} />
                          <span className={shouldMarkError('password') ? "error" : "hidden"}
                          >invalid password</span>
                          <div className="btn-group btn-group-lg" role="group" aria-label="...">
                            <label className="continue">
                              <button type="submit"
                              id="submitbtn"
                              className="btn btn-default btn-primary btn-lg" 
                              onClick={this.handleSubmit}
                              /*onSubmit={this.handleSubmit} 
                              onClick={this.closeModal}*/>
                                <FiArrowRight />
                              </button>
                            </label>
                          </div>
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
