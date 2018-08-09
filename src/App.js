import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login";
import socketIOClient from 'socket.io-client'
import Lobby from "./components/Lobby";
import Game from "./components/Game";
class App extends Component {
    
    constructor() {
        super();
        
        this.state = {
            state : 'login',
            username : '',
            lobby : [],
        };
        
        this.socket =
            socketIOClient('http://localhost:4000');
            //socketIOClient('https://react-pong-server.herokuapp.com/');
        
        
        this.socket.on('login', data => {
            let {username, lobby, state} = data;
            this.setState({username,lobby,state});
        });
        
        this.socket.on('start_game', () => this.setState({state:'game'}));
    
        this.socket.on('lobby', lobby => this.setState({lobby}));
        
    }
    
    display = () => {
        
        switch (this.state.state) {
            case 'login' :
                return <Login socket={this.socket}/>;
            case 'lobby' :
                return <Lobby socket={this.socket}
                              lobby={this.state.lobby}
                              username={this.state.username}/>;
            case 'game' :
                return <Game socket={this.socket}/>;
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
