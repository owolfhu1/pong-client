import React,{Component} from 'react';
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";

const style = {
    height: '430px',
    width: '630px',
    margin: 'auto',
    marginTop: '20px',
    border: 'black solid 1px',
    position: 'relative',
    background: 'lightgray',
    borderRadius: '5px',
    padding: '150px',
    color: 'red',
};

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errors: <br/>,
            username: ''
        };
        this.props.socket.on('login_error', errors => this.setState({errors}));
    }
    
    handleInputChange = e => this.setState({username: e.target.value});
    
    render() {
        return (
            <div style={style}>
                <div>
                    <FormControl onChange={this.handleInputChange}
                                 value={this.state.username}
                                 type="text" placeholder="Username"/>
                    {this.state.errors}
                    <Button onClick={() => this.props.socket.emit('login', this.state.username)}
                            bsStyle="primary" block>Login</Button>
                </div>
            </div>
        );
    }
    
}