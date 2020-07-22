import React from 'react';
import Background from '../assets/home-img.png';

const sectionStyle = {
    backgroundImage : `url(${Background})`,
    minHeight : 200,
    backgroundRepeat : 'no-repeat'
}

const Header = () => {
    return(
        <div>
            <div style = {sectionStyle}>
                <div className = 'col-md-4' style = {{float : 'right'}}>
                    <p className = 'text-white h1 mt5'>FLY RESPONSIBLY WITH OPENTABS</p>
                </div>
            </div>
        </div>
    );
}

export default Header;