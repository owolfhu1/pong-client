import React,{Component} from 'react';
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";


export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errors : null,
            username : ''
        };
        
        this.props.socket.on('login_error', errors => this.setState({errors}));
        
    }
    
    handleInputChange = event => {
        this.setState({username:event.target.value});
    };
    
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
                padding: '150px',
                color: 'red',
            }}>
                
                <Form horizontal>
                    
                    <FormGroup>
                            <FormControl onChange={this.handleInputChange}
                                         value={this.state.username}
                                         type="text" placeholder="Username"/>
                    </FormGroup>
        
                    <FormGroup>
                            <Button onClick={() => this.props.socket.emit('login', this.state.username)}
                                    bsStyle="primary" block>Login</Button>
                    </FormGroup>
    
                    <FormGroup>
        
                        {this.state.errors}
    
                    </FormGroup>
                    
                </Form>
            
            </div>
        );
    }
}