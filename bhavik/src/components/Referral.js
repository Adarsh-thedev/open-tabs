import React, { Component } from 'react';




export default class Referral extends Component {
    constructor() {
        super();
        localStorage.setItem('referred_by', '');
    }
    async componentDidMount() {
        // const already_referred_or_made_account = localStorage.getItem('already_referred_or_made_account');
        // if (!already_referred_or_made_account) {
            if (this.props.match.params.id) {
                // const response = await fetch('/api/referral')      
                localStorage.setItem('referred_by', this.props.match.params.id);
            }
        // }
        window.location.href = 'https://chrome.google.com/webstore/detail/opentabs/igeeighenacaciapkehcacnojlegbnpa?hl=en';
    }
    render() {
        return (
            <p></p>
        );
    }
}