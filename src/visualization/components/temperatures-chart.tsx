import * as React from 'preact';
import {Temperature} from "../../temperatures/state";
import {Sensor} from "../../sensors/state";

interface Props{
    temperatures: Temperature[];
    sensors: Sensor[];
    maxValue: number;
    minValue: number;
    valueSteps: number;
}

interface State{

}

export class TemperaturesChart extends React.Component<Props, State>{

    canvas: HTMLCanvasElement;

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {

        const {valueSteps, temperatures, minValue, maxValue, sensors} = this.props;

        const canvasWidth = 800;
        const canvasHeight = 600;

        const currentTime = new Date();
        const maxTime = currentTime.getTime();
        const minTime = currentTime.getTime() - 60*1000;

        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.lineWidth = 1;

        const temperaturesToDisplay = temperatures.filter(t => t.time >= minTime && t.time <= maxTime);

        ctx.strokeStyle = '#333';

        for (let i = 0; i <= valueSteps; i++){
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight / valueSteps * i);
            ctx.lineTo(canvasWidth, canvasHeight / valueSteps * i);
            ctx.stroke();

            ctx.font = "12px Arial";
            ctx.fillStyle = "#333";
            const text = ((valueSteps - i) * (maxValue - minValue) / valueSteps + minValue).toString();
            ctx.fillText(text, 0 + 4, canvasHeight / valueSteps * i);
        }


        sensors && sensors.forEach(sensor => {
            const tempsForSensor = temperaturesToDisplay.filter(t => t.sensorId === sensor.id);
            ctx.strokeStyle = `#${sensor.color.hex}`;

            ctx.beginPath();

            for (let i = 0; i < tempsForSensor.length; i++) {
                const {value, time} = tempsForSensor[i];
                const mappedValue = canvasHeight - (value - minValue) * canvasHeight / (maxValue - minValue);
                const mappedTime = (time - minTime) * canvasWidth / (maxTime - minTime);
                ctx.lineTo(mappedTime, mappedValue);
            }

            ctx.stroke();
        });

    }

    render(){
        return <canvas ref={(canvas: HTMLCanvasElement) => this.canvas = canvas} width={800} height={600}/>
    }
}
