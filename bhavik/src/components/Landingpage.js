import React, {Component} from 'react';
import {DateTime} from 'luxon';
import Modal from 'react-modal';
import './styles.css';
import Header from './Header';
import Searchbar from './Searchbar';
import MultiStepForm from './MultiStepForm';
import $ from 'jquery';

const NAME_LS = 'NAME_LS';
const EMAIL_LS = 'EMAIL_LS';
const PASSWORD_LS = 'PASSWORD_LS'

const customStyles = {
    content: {
      width: '100vw',
      height: '100vh',
      opacity: '0.9',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      background: 'none',
      backgroundColor: 'none'
      }
  };
  const getBGStyle = {
    height: '100vh',
    width: '100%',
    opacity: '0.9'
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
        };
    
        this.closeModal = this.closeModal.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
        this.setState({name: this.state.inputValue});
        localStorage.setItem(NAME_LS, this.state.inputValue);
        this.setState({email: this.state.email});
        localStorage.setItem(EMAIL_LS, this.state.email);
        this.setState({password: this.state.password});
        localStorage.setItem(PASSWORD_LS, this.state.password);
      }
    
      handleChangeName(e) {
        this.setState({inputValue: e.target.value});
      }
      handleChangeEmail(e) {
        this.setState({email: e.target.value});
      }
      handleChangePassword(e) {
        this.setState({password: e.target.value});
      }
    
      componentDidMount() {
        //jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

        const name = localStorage.getItem(NAME_LS);
        if (name) {
          this.setState({name});
        } else {
          this.setState({modalIsOpen: true});
        }
    
        fetch('https://horizonshq.herokuapp.com/api/inspirationalquotes')
          .then(resp => resp.json())
          .then(resp => this.setState({quote: resp.message}));
    
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

      render() {
        return (
          <div className="bg" style={getBGStyle}>
            <div className="bg-wrapper">
            
            <div className="top-right">
                <div>
                  <Header />
                </div>
              </div>
              
              <div className="text-center centered">
                <div className="block-text">
                  <h1 id="time">{this.state.time.toFormat("h':'mm")}</h1>
                </div>
                <h3 id="greetings">
                  Good {this.state.salutation}, {this.state.name}!
                </h3>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  style={customStyles}
                  contentLabel="name-modal"
                >

                  {/* <MultiStepForm /> */}
                  {/* <div className="modal-content">
                    <div className="modal-title">What's your name?</div>
                      <div className="modal-input" >
                        <form>
                        <input required name="name" type="text" onChange={this.handleChangeName}/>
                        </form>
                      </div>
                      <div className="modal-title">Enter your email?</div>
                      <div className="modal-input" >
                        <input name="email" type="email" onChange={this.handleChangeEmail}/>
                      </div>
                      <div className="modal-title">Enter your password?</div>
                      <div className="modal-input" >
                        <input name="password" type="password" onChange={this.handleChangePassword}/>
                      </div>
                      <div className="modal-btn">
                        <button className="modal-button" onClick={this.closeModal}>
                          Enter
                        </button>
                      </div>
                  </div> */}

<div class="row">
    <div class="col-md-6 col-md-offset-3">
        <form id="msform">
            <fieldset>
           
                <input type="text" name="fname" placeholder="Name"/>
                <input type="button" name="next" class="next action-button" value="Next"/>
            </fieldset>
          
            <fieldset>
                <input type="email" name="Email" placeholder="Email"/>
                <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
                <input type="button" name="next" class="next action-button" value="Next"/>
            </fieldset>
            <fieldset>
                <input type="password" name="pass" placeholder="Password"/>
                <input type="button" name="previous" class="previous action-button-previous" value="Previous"/>
                <input type="submit" name="submit" class="submit action-button" value="Submit"/>
            </fieldset>
        </form>
    </div>
</div>



                </Modal>
              </div>
              <div className="Search">
                <Searchbar />
              </div>
            </div> 
          </div>
        );
      }
}
