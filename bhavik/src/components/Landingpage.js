import React, {Component} from 'react';
import {DateTime} from 'luxon';
import Modal from 'react-modal';
import './styles.css';
import Header from './Header';
import Searchbar from './Searchbar';
import { FiArrowRight } from 'react-icons/fi';
import logo from '../assets/logo.png';
import Settings from './Settings';

// const NAME_LS = 'NAME_LS';
// const EMAIL_LS = 'EMAIL_LS';
// const PASSWORD_LS = 'PASSWORD_LS'
const NAME_LS = 'name';
const EMAIL_LS = 'email';
const PASSWORD_LS = 'password'

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
    opacity: '1'
};
export default class Landingpage extends Component {
    constructor() {
        super();
    
        var time = this.getTime();
    
        this.state = {
          time,
          name: '',
          email: '',
          password: '',
          isNameRequired: false,
          salutation: this.determineSalutation(time.hour),
          /*server*/
          response: '',
          post: '',
          responseToPost: '',
        };
    
        this.closeModal = this.closeModal.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
        this.setState({name: this.state.name});
        localStorage.setItem(NAME_LS, this.state.name);
        // localStorage.setItem(name, this.state.name);
        this.setState({email: this.state.email});
        localStorage.setItem(EMAIL_LS, this.state.email);
        // localStorage.setItem(email, this.state.email);
        this.setState({password: this.state.password});
        localStorage.setItem(PASSWORD_LS, this.state.password);
        // localStorage.setItem(password, this.state.password);
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
    
      componentDidMount() {
        /*server*/
        this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));

        const name = localStorage.getItem(NAME_LS);
        const email = localStorage.getItem(EMAIL_LS);
        const password = localStorage.getItem(PASSWORD_LS);

        if (name) {
          this.setState({name});
        } else {
          this.setState({modalIsOpen: true});
        }
    
        // fetch('https://horizonshq.herokuapp.com/api/inspirationalquotes')
        //   .then(resp => resp.json())
        //   .then(resp => this.setState({quote: resp.message}));
    
        setInterval(() => {
          var time = DateTime.local();
          this.setState({
            time,
            salutation: this.determineSalutation(time.hour)
          });
        }, 1000 * 1);
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
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password, method: 'local'}),
        });
        const body = await response.text();
        console.log(body);
        this.setState({ responseToPost: body });
      };

      render() {
        return (
          <div className="bg" style={getBGStyle}>
            <div className="bg-wrapper">
            
            <div className="top-content">
                <div>
                  <Header />
                </div>
            </div>

            <div className="bottom-content">
                <div>
                  <Settings />
                </div>
            </div>
              
              <div className="text-center centered">
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
                  aria-HideApp="false"
                >
                  <img
                      src={logo}
                      width="80"
                      height="80"                    
                      alt="OpenTabs logo"
                      className="User-Logo"
                    />
                  <div class="form-container">
                    <form action="" role="form" onSubmit={this.handleSubmit}>
                      <input id='step2' type='checkbox'/>
                      <input id='step3' type='checkbox'/>
                      <div id="part1" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">Hey Buddy, What's your name?</h1>
                          </div>
                          <input type="text" id="name" className="form-control" placeholder="" aria-describedby="sizing-addon1" onChange={this.handleChangeName} value={this.state.name}/>
                          <div className="btn-group btn-group-lg" role="group" aria-label="...">
                            <label for='step2' id="continue-step2" class="continue">
                              <div className="btn btn-default btn-success btn-lg"><FiArrowRight/> </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div id="part2" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">What's your Email {this.state.name}?</h1>
                          </div>
                          <input type="email" id="email" className="form-control" placeholder="" onChange={this.handleChangeEmail} value={this.state.email}/>
                          <div className="btn-group btn-group-lg btn-group-justified" role="group" aria-label="...">

                            {/* <label for='step2' id="back-step2" className="back">
                              <div className="btn btn-default btn-primary btn-lg" role="button">Back</div>
                            </label> */}


                            <label for='step3' id="continue-step3" className="continue">
                              <div className="btn btn-default btn-success btn-lg" role="button"><FiArrowRight /> </div>
                            </label>

                          </div>
                        </div>
                      </div>

                      <div id="part3" className="form-group">
                        <div className="panel panel-primary">
                          <div className="panel-heading">
                            <h1 className="panel-title">{this.state.name}, Enter Password</h1>
                          </div>
                          <input type="password" id="password" className="form-control" placeholder="" onChange={this.handleChangePassword} value={this.state.password}/>
                          <div className="btn-group btn-group-lg" role="group" aria-label="...">
                            {/* <label for='step3' id="back-step3" className="back">
                              <div className="btn btn-default btn-primary btn-lg">Back</div>
                            </label> */}
                            <label class="continue">
                              <button type="submit" className="btn btn-default btn-success btn-lg" onClick={this.closeModal}>Submit</button>
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
