import React, {Component} from 'react';
import PongBody from "./pongComponents/PongBody";

const style = {
    height : '445px',
    width : '660px',
    margin : 'auto',
    marginTop : '20px',
    border : 'black solid 1px',
    position : 'relative',
    background : 'lightgray',
    borderRadius : '5px',
};

const top ={
    position: 'absolute',
    top : '-22px',
    right: '120px',
};

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            left: 150,
            right: 150,
            x: 300,
            y: 200,
            message: 'use up/down keys to control your paddle, press any other key to begin',
        };
        this.props.socket.on('update_game', data => {
            let {left, right, x, y} = data;
            this.setState({left, right, x, y});
        });
        //this.props.socket.on('start_game', () => this.setState({message: null}));
    }

    componentDidMount() {
        this.gameBody.focus();
    }

    handleKeyPress = e => {
        if (e.key === 'Escape') {
            this.props.socket.emit('exit');//implement this already.. remember observers send same emit
            return;
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown')
            this.props.socket.emit('move_paddle',e.key);
        else this.props.socket.emit('start_game');
    };

    render() {
        return (
            <div ref={div => {this.gameBody = div;}} tabIndex="0" style={style} onKeyDown={this.handleKeyPress.bind(this)}>
                <div style={top}>{this.state.message}</div>
                <PongBody left={this.state.left} right={this.state.right} x={this.state.x} y={this.state.y}/>
            </div>
        )
    }

}