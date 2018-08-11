import React,{Component} from 'react';
import {Button, FormControl} from "react-bootstrap";
import Title from './loginComponents/Title'

const style = {
    height : '445px',//430
    width : '660px',//630
    margin: 'auto',
    marginTop: '20px',
    border: 'black solid 1px',
    position: 'relative',
    background: 'lightgray',
    borderRadius: '5px',
    padding: '130px',
    paddingTop: '200px',
    color: 'red',
};

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            msg: <br/>,
            username: '',
            password: '',
        };
        this.props.socket.on('login_msg', msg => this.setState({msg}));
        this.props.socket.on('register', bool => {
            let msg = 'registration ' + (bool ? 'success' : 'fail');
            this.setState({msg});
        });
    }
    
    handleUsernameInputChange = e => this.setState({username: e.target.value});
    handlePasswordInputChange = e => this.setState({password: e.target.value});

    render() {
        return (
            <div style={style}>
                <Title/>
                <div>
                    <FormControl onChange={this.handleUsernameInputChange}
                                 value={this.state.username}
                                 type="text" placeholder="Username"/>
                    <FormControl onChange={this.handlePasswordInputChange}
                                 value={this.state.password}
                                 type="password" placeholder="Password"/>
                    {this.state.msg}
                    <Button onClick={() => this.props.socket.emit('login', {
                        name:this.state.username,
                        pass:this.state.password,
                    })} bsStyle="success" block>Login</Button>
                    <Button onClick={() => this.props.socket.emit('register', {
                        name:this.state.username,
                        pass:this.state.password,
                    })} bsStyle="primary" block>Register</Button>
                </div>
            </div>
        );
    }
    
}