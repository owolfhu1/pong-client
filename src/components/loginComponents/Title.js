import React from 'react';
import nodeLogo from './node-logo.svg';
import reactLogo from './react-logo.svg';
import './title.css';

const style = {
    position : 'absolute',
    top : '38px',
    left: '109px',
    fontSize : '75px',
};

const textStyle = {
    position : 'absolute',
    color : 'green',
    fontFamily : 'Courier New',
    top : '8px',
    left : '125px',
};

const Title = props => {
    
    return (
        <div style={style}>
            <span style={textStyle}>Pong </span>
            <img src={reactLogo} className="App-logo" alt="logo" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img src={nodeLogo} className="App-logo" alt="logo" />
        </div>
    );
    
};

export default Title;