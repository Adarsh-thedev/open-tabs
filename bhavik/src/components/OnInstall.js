import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class OnInstall extends Component {
    constructor() {
        super();
        // const already_referred_or_made_account = localStorage.getItem('already_referred_or_made_account');
        const install_referred = localStorage.getItem('install_referred');
        const referred_by = localStorage.getItem('referred_by');
        if (!install_referred)
        {
            if (referred_by)
            {
                fetch('/api/referral/add_install_referral', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        referred_by: referred_by}),
                    })
            }   
            localStorage.setItem("install_referred", "true");
        }
        // window.open("chrome://newtab", "_self");
        // window.location.href = "chrome://newtab";
        // else {
        //     console.log("don't do it");
        // }
    }
    render() {
        return (
            <Redirect to='/tabbing' />
            // <p></p>
        );
    }
}