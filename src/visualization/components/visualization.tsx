import * as React from 'preact';
import {connect} from 'preact-redux';
import {Color} from "../../core/components/color-palette";
import {getTemperatures, getSensors} from "../../main/reducer";
import {Temperature} from "../../temperatures/state";
import {Sensor} from "../../sensors/state";

interface Props {
    data: Data[];
    temperatures: Temperature[];
    sensors: Sensor[];
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

        const ctx = this.canvas.getContext('2d');
        ctx.fillRect(0, 0, 800, 600);
        ctx.lineWidth = 1;

        this.props.sensors && this.props.sensors.forEach(sensor => {
            const tempsForSensor = this.props.temperatures.filter(t => t.sensorId === sensor.id);
            ctx.strokeStyle = `#${sensor.color.hex}`;
            ctx.beginPath();

            for (let i = 0; i< tempsForSensor.length; i++){
                ctx.lineTo(800 / tempsForSensor.length * i, tempsForSensor[i].value);
            }

            ctx.stroke();
        });

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
    temperatures: getTemperatures(state),
    sensors: getSensors(state)
}))(VisualizationView);