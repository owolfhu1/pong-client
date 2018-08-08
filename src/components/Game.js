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
        // this.direction = {
        //     x:Math.round((Math.random())) === 0 ? 2 : -2,
        //     y:Math.round((Math.random())) === 0 ? 1 : -1,
        // };

        this.props.socket.on('update_game', data => {
            let {left,right,x,y} = data;
            this.setState({left,right,x,y});
        })



    }

    // stop = () => {
    //     for (let i in this.state.intervals)
    //         clearInterval(this.state.intervals[i]);
    //     this.setState({intervals:[]});
    // };

    handleKeyPress = event => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown')
            this.props.socket.emit(event.key);
    };

    play = () => {
        let direction = this.direction;
        let x = this.state.x + direction.x;
        let y = this.state.y + direction.y;
        let right = this.state.right;
        let left = this.state.left;
        right = right < 0 ? 0 : right > 300 ? 300 : right;
        left = left < 0 ? 0 : left > 300 ? 300 : left;
        if (y < 0) {
            direction.y = direction.y * -1;
            y = direction.y;
        } else if (y > 400) {
            direction.y = direction.y * -1;
            y = 400 + direction.y;
        }
        if (x < 0) {
            if (y < left - 4 || y > left + 100)
                this.stop();
            else {
                let spot = y - left;
                direction.y = spot < 20 ? -3 : spot > 80 ? 3 : direction.y > 0 ? 1 : -1;
                this.faster();
            }
        }
        if (x > 600) {
            if (y < right - 4 || y > right + 100)
                this.stop();
            else {
                let spot = y - right;
                direction.y = spot < 20 ? -3 : spot > 80 ? 3 : direction.y > 0 ? 1 : -1;
                this.faster();
            }
        }
        this.direction = direction;
        this.setState({x,y,right,left});
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