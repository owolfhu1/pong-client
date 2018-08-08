import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import socketIOClient from 'socket.io-client'
import Lobby from "./components/Lobby";
class App extends Component {
    
    constructor() {
        super();
        
        this.state = {
            socket : socketIOClient('http://localhost:4000'),
            state : 'login',
            username : '',
            lobby : [],
        };
        
        this.state.socket.on('login', data => {
            let {username, lobby, state} = data;
            this.setState({username,lobby,state});
        });
    
        this.state.socket.on('lobby', lobby => this.setState({lobby}));
        
    }
    
    display = () => {
        
        switch (this.state.state) {
            case 'login' :
                return <Login socket={this.state.socket}/>;
            case 'lobby' :
                return <Lobby socket={this.state.socket}
                              lobby={this.state.lobby}
                              username={this.state.username}/>;
        }
        
        
    };
    
    render() {
        return (
            <div className="App">
            
                {this.display()}
            
            </div>
        );
    }
}

export default App;
