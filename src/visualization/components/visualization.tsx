import * as React from 'preact';
import {connect} from 'preact-redux';
import {getTemperatures, getSensors} from "../../main/reducer";
import {Temperature} from "../../temperatures/state";
import {Sensor} from "../../sensors/state";

interface Props {
    temperatures: Temperature[];
    sensors: Sensor[];
    minValue: number;
    maxValue: number;
}

interface State {
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

        const canvasWidth = 800;
        const canvasHeight = 600;

        const currentTime = new Date();
        const maxTime = currentTime.getTime();
        const minTime = currentTime.getTime() - 10*1000;

        const valueSteps = 25;

        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.lineWidth = 1;

        const temperaturesToDisplay = this.props.temperatures.filter(t => t.time >= minTime && t.time <= maxTime);

        ctx.strokeStyle = '#333333';

        for (let i = 0; i < valueSteps; i++){
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight / valueSteps * i);
            ctx.lineTo(canvasWidth, canvasHeight / valueSteps * i);
            ctx.stroke();

            ctx.font = "12px Arial";
            ctx.fillStyle = "#AAAAAA";
            const text = ((i - 0) * (this.props.maxValue - this.props.minValue) / (valueSteps - 0) + this.props.minValue).toString();
            ctx.fillText(text, 0 + 4, canvasHeight / valueSteps * i + 4);
        }


        this.props.sensors && this.props.sensors.forEach(sensor => {
            const tempsForSensor = temperaturesToDisplay.filter(t => t.sensorId === sensor.id);
            ctx.strokeStyle = `#${sensor.color.hex}`;

            ctx.beginPath();

            for (let i = 0; i < tempsForSensor.length; i++) {
                const rawValue = tempsForSensor[i].value;
                const mappedValue = canvasHeight - (rawValue - this.props.minValue) * canvasHeight / (this.props.maxValue - this.props.minValue);
                ctx.lineTo(800 / tempsForSensor.length * i, mappedValue);
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

export const Visualization = connect((state, ownProps) => ({
    temperatures: getTemperatures(state),
    sensors: getSensors(state),
    minValue: ownProps.minValue,
    maxValue: ownProps.maxValue
}))(VisualizationView);