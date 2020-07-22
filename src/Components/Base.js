import React from 'react';
import Logo from './Logo';
import Header from './Header';
import Footer from './Footer';

const Base = ({children}) => {
    return(
        <React.Fragment>
            <Logo/>
            <Header/>
                {children}
            <Footer/>
        </React.Fragment>
    );
}

export default Base;