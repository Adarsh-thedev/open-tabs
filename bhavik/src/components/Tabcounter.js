import React, { Component, useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const TABS_LS = 'tabs_opened';
export default class Tabcounter extends Component {         
    constructor() {
        super();

        this.state = {
            tabs_opened: JSON.parse(localStorage.getItem(TABS_LS)),
            // tabs_opened: 1,
        };
        // this.handleClick = this.handleClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.setState({tabs_opened: this.state.tabs_opened});
    }

    componentDidMount() {
        /*server*/
        this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));

        // const tabs_opened = localStorage.getItem(TABS_LS);

        // if (tabs_opened){
        //     this.setState({tabs})
        // }
        window.addEventListener('load', this.handleLoad);
    }
    
 componentWillUnmount() { 
    window.removeEventListener('load', this.handleLoad)  
  }
  handleLoad = async e => {
    e.preventDefault();
    const response = await fetch('/api/users/update_tabs',
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password, tabs_opened: this.state.tabs_opened, method: 'local'}),    
    }
    )
    .then(res=>console.log(res.json()));
    this.setState((prevState, { tabs_opened }) => ({
      tabs_opened: prevState.tabs_opened + 1
    }));

    this.setState({tabs_opened: this.state.tabs_opened});
    localStorage.setItem(TABS_LS, this.state.tabs_opened);
  };

    callApi = async () => {
        const response = await fetch('/api/users/update_tabs');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
      };
      

    // handleClick = async e => {
    //     const response = await fetch('/api/users/update_tabs',
    //     {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password, tabs_opened: this.state.tabs_opened, method: 'local'}),    
    //     }
    //     )
    //     .then(res=>console.log(res.json()));
    //     this.setState((prevState, { tabs_opened }) => ({
    //       tabs_opened: prevState.tabs_opened + 1
    //     }));

    //     this.setState({tabs_opened: this.state.tabs_opened});
    //     localStorage.setItem(TABS_LS, this.state.tabs_opened);
          
    //   };

    // tabLoadEventHandler() {
    //     let hash = 'tab_' + +new Date();
    //     sessionStorage.setItem('TabHash',hash);
    //     let tabs = JSON.parse(localStorage.getItem('TabsOpen')||'{}');
    //     tabs[hash]=true;
    //     localStorage.setItem('TabsOpen',JSON.stringify(tabs));
    // }
    // tabUnloadEventHandler() {
    //     let hash= sessionStorage.getItem('TabHash');
    //     let tabs = JSON.parse(localStorage.getItem('TabsOpen')||'{}');
    //     delete tabs[hash];
    //     localStorage.setItem('TabsOpen',JSON.stringify(tabs));
    // }

    render() {

            // var getting = browser.windows.getAll({
            //   populate: true,
            //   windowTypes: ["normal"]
            // });
        // const tabs = windows.getAll({populate:true},function(windows){
        //     var i=0; 
        //     windows.forEach(function(window){
        //       window.tabs.forEach(function(tab){
        //         //collect all of the urls here, I will just log them instead
        //         console.log(tab.url);
        //         i++;
        //       });
        //     });
        //     console.log(i);
        //   });

        // chrome.tabs.query({windowType:'normal'}, function(tabs) {
        //     console.log('Number of open tabs in all normal browser windows:',tabs.length);
        // }); 
        
        // let tabsCount = Object.keys( JSON.parse(localStorage.getItem('TabsOpen')||'{}') ).length
        
        return (
            <div className="tab-counter">
                <Tooltip disableFocusListener title="No. of Tabs Opened" enterDelay={500} leaveDelay={200}>
                    
                <div onLoad={this.handleLoad} style={{padding: '1px 6px', marginTop: '2vh'}}>
                        {this.state.tabs_opened}
                    </div>

                </Tooltip>
                {/* <div id="counter"></div> */}
                
            </div>
        )
    }
}

// {/* <Tooltip disableFocusListener title="No. of Tabs Opened" enterDelay={500} leaveDelay={200}> */}
                    
                    // {/* <Button /*onClick={this.handleClick} onunload={this.tabUnloadEventHandler} onload={this.tabLoadEventHandler}>*/
                        // {/* <a href="" target="_blank"> */}
                            // {this.state.tabs_opened}
                            // {/* {this.tabsCount}*/}
                            // {/* {console.log('Number of open tabs in all normal browser windows:',tabs.length)}  */}
                        /* </a> */
                    // </Button> */}
                // </div>

                // </Tooltip> 