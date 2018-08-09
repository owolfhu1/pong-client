import React,{Component} from 'react';
import OnlineList from './lobbyComponents/OnlineList';
import Chat from './lobbyComponents/Chat';
import Request from './lobbyComponents/Request';

const style = {
    height: '430px',
    width: '630px',
    margin: 'auto',
    marginTop: '20px',
    border: 'black solid 1px',
    position: 'relative',
    background: 'lightgray',
    borderRadius: '5px',
};

export default class Lobby extends Component {

    render() {
        return (
            <div style={style}>
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