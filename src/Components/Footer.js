import React from 'react';

const Footer = () => {
    return(
        <div className = 'footer bg1'>
            <div className = 'container center'>
                <div className = 'justify-content-center f4'>
                    <a href="https://www.instagram.com/open_tabs/" rel = 'noopener noreferrer' target="_blank">
                        <i className="fa fa-instagram fa-lg mr-4"> </i>
                    </a>
                    <a href="https://www.linkedin.com/company/greco-paro/?viewAsMember=true" rel = 'noopener noreferrer' target="_blank">
                        <i className="fa fa-linkedin fa-lg mr-4"> </i>
                    </a>
                    <a href="https://www.youtube.com/channel/UC7Ggi0aAxmxHtoMqZ6BckBg" rel = 'noopener noreferrer' target="_blank">
                        <i className="fa fa-youtube fa-lg mr-4"> </i>
                    </a>
                </div>
                <div className="f4 text-center">
					<p> © 2020 OpenTabs</p>
				</div>
            </div>
            <div className = 'no-margin-2'></div>
        </div>
    );
}

export default Footer;