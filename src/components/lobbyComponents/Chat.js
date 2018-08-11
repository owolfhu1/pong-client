import React,{Component} from 'react';
import {Button, FormControl, Well} from "react-bootstrap";

const mainStyle = {
    position :'absolute',
    height : '94%',
    width : '45%',
    top : '3%',
    right : '3%',
    padding : '8px',
    border : 'black solid 1px',
    borderRadius : '5px',
    background : 'white',
};

const wellStyle = {
    height : '354px',
    overflowY: 'scroll',
    marginBottom : '10px',
    textAlign : 'left',
};

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat : [],
            input : '',
        };
        this.props.socket.on('chat', text => {
            let chat = this.state.chat;
            chat.push(<p>{text}</p>);
            this.setState({chat});
        });
    }
    
    handleInputChange = event => this.setState({input:event.target.value});
    
    handleKeyPress = event => {
        if (event.key === 'Enter' && this.state.input.length > 0) {
            this.props.socket.emit('chat',this.state.input);
            this.setState({input : ''});
        }
    };
    
    scrollToBottom = () => this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    
    componentDidUpdate() {
        this.scrollToBottom();
    };
    
    render() {
        return (
            <div style={mainStyle}>
                <Well style={wellStyle}>
                    <div>commands:</div>
                    <ul>
                        <li>'/myScore'</li>
                        <li>'/topThree'</li>
                    </ul>
                    <div>{this.state.chat}</div>
                    <div style={{ float:"left", clear: "both" }}
                         ref={(el) => { this.messagesEnd = el; }}/>
                </Well>
                <FormControl onChange={this.handleInputChange}
                             value={this.state.input}
                             type="text" placeholder="Type here to chat"
                             onKeyPress={this.handleKeyPress}/>
            </div>
        );
    }

}