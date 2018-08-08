import React,{Component} from 'react';
import OnlineList from './lobbyComponents/OnlineList';
import Chat from './lobbyComponents/Chat';
import Request from './lobbyComponents/Request';



export default class Lobby extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            input : '',
        };
        
       // this.props.socket.on('lobby', errors => this.setState({errors}));
        
    }
    
   // handleInputChange = event => {
       // this.setState({username:event.target.value});
   // };
    
    render() {
        return (
            <div style={{
                height: '430px',
                width: '630px',
                margin: 'auto',
                marginTop: '20px',
                border: 'black solid 1px',
                position: 'relative',
                background: 'lightgray',
                borderRadius: '5px',
            }}>
                
                <OnlineList socket={this.props.socket}
                            lobby={this.props.lobby}
                            username={this.props.username}/>
                
                <Chat socket={this.props.socket}
                      username={this.props.username}/>
                
                <Request socket={this.props.socket}/>
            
            </div>
        );
    }
}