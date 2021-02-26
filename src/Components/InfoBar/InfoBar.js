import React from 'react';

import './InfoBar.css';
import closeIcon from '../../Icons/closeIcon.png';
import onlineIcon from '../../Icons/onlineIcon.png';



function InfoBar({room}) {
    return (
        <div className="info-bar">
            <div className="left-inner-container">
                <img className="online-icon" src={onlineIcon} alt="online"/>
                <h3>{room}</h3>
            </div>
            <div className="right-inner-container">
                <a href="/" ><img src={closeIcon} alt="close"/></a>
            </div>                     
        </div>
    );
}

export default InfoBar;
