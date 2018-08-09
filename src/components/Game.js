import React, {Component} from 'react';
import PongBody from "./pongComponents/PongBody";


export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            left: 150,
            right: 150,
            x: 300,
            y: 200,
            
        };

        this.props.socket.on('update_game', data => {
            let {left,right,x,y} = data;
            this.setState({left,right,x,y});
        })
        
    }

    handleKeyPress = event => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
            this.props.socket.emit('move_paddle',event.key);
        else
            this.props.socket.emit('start_game');
    };
    

    render() {
        return <div tabIndex="0" style={{
            height : '430px',
            width : '630px',
            margin : 'auto',
            marginTop : '20px',
            border : 'black solid 1px',
            position : 'relative',
            background : 'lightgray',
            borderRadius : '5px',
        }} onKeyDown={this.handleKeyPress.bind(this)}>
            <PongBody left={this.state.left} right={this.state.right} x={this.state.x} y={this.state.y}/>
        </div>
    }

}