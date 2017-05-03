import * as React from 'preact';
import {connect} from 'preact-redux';
import {Color} from "../../core/components/color-palette";
import {getTemperatures} from "../../main/reducer";
import {Temperature} from "../../temperatures/state";

interface Props {
    data: Data[];
    temperatures: Temperature[];
}

interface State {
}

interface Data{
    name: string;
    color: Color;
    points: {x: number, y: number}[];
}

class VisualizationView extends React.Component<Props, State> {

    canvas: HTMLCanvasElement;

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {


        // const ctx = this.canvas.getContext('2d');
        // ctx.fillRect(0, 0, 800, 600);
        //
        // ctx.lineWidth = 1;
        //
        // this.props.data.forEach(d => {
        //     ctx.strokeStyle = `#${d.color.hex}`;
        //     ctx.beginPath();
        //
        //     for (let i =0; i<d.points.length; i++){
        //         ctx.lineTo(800 / d.points.length * i, d.points[i].y);
        //     }
        //
        //     ctx.stroke();
        // });
    }

    render() {
        return (
            <div>
                <h3>Amount of temperatures: {this.props.temperatures.length}</h3>
                <canvas ref={(canvas: HTMLCanvasElement) => this.canvas = canvas} width={800} height={600}/>
            </div>)
    }
}

export const Visualization = connect(state => ({
    temperatures: getTemperatures(state)
}))(VisualizationView);