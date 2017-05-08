import * as React from 'preact';
import {Temperature} from "../../temperatures/state";
import {Sensor} from "../../sensors/state";

interface Props {
    temperatures: Temperature[];
    sensors: Sensor[];
    maxValue: number;
    minValue: number;
    valueSteps: number;
}

interface State {
    hiddenSensors: string[];
}

export class TemperaturesChart extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = {
            hiddenSensors: []
        };
    }

    canvas: HTMLCanvasElement;
    currentRenderLoop: number = undefined;

    componentDidMount() {
        this.renderChart();
    }

    toggleSensor(sensorId: string){
        const {hiddenSensors}  = this.state;
        const sensorIndex = hiddenSensors.indexOf(sensorId);
        if(sensorIndex !== -1){
            this.setState({
                hiddenSensors: [...hiddenSensors.slice(0, sensorIndex), ...hiddenSensors.slice(sensorIndex+1)]
            })
        } else {
            this.setState({
                hiddenSensors: [...hiddenSensors, sensorId]
            })
        }
    }

    renderChart() {

        const {valueSteps, temperatures, minValue, maxValue, sensors} = this.props;
        const minimumTimeUnit = 1000;

        const canvasWidth = 1280;
        const canvasHeight = 720;

        const currentTime = new Date();
        const maxTime = currentTime.getTime();
        const minTime = currentTime.getTime() - 60 * minimumTimeUnit;

        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.lineWidth = 1;

        const temperaturesToDisplay = temperatures.filter(t => t.time >= (minTime - minimumTimeUnit) && t.time <= maxTime);

        ctx.strokeStyle = '#333';

        for (let i = 0; i <= valueSteps; i++) {
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight / valueSteps * i);
            ctx.lineTo(canvasWidth, canvasHeight / valueSteps * i);
            ctx.stroke();

            ctx.font = "12px Verdana";
            ctx.fillStyle = "#333";
            const text = ((valueSteps - i) * (maxValue - minValue) / valueSteps + minValue).toString();
            ctx.fillText(text, 0 + 4, canvasHeight / valueSteps * i);
        }

        sensors && sensors.forEach(sensor => {
            const tempsForSensor = temperaturesToDisplay.filter(t => t.sensorId === sensor.id);

            if(this.state.hiddenSensors.indexOf(sensor.id) === -1)
                ctx.strokeStyle = `${sensor.color.hex}`;
            else
                ctx.strokeStyle = `rgba(${sensor.color.r}, ${sensor.color.g}, ${sensor.color.b}, 0.25)`;


            ctx.beginPath();

            for (let i = 0; i < tempsForSensor.length; i++) {
                const {value, time} = tempsForSensor[i];
                const mappedValue = canvasHeight - (value - minValue) * canvasHeight / (maxValue - minValue);
                const mappedTime = (time - minTime) * canvasWidth / (maxTime - minTime);
                ctx.lineTo(mappedTime, mappedValue);
            }

            ctx.stroke();
        });

        this.currentRenderLoop = requestAnimationFrame(() => this.renderChart());
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.currentRenderLoop);
    }

    render() {
        return <div style={{display: 'inline-block', position: 'relative'}}>
            <canvas ref={(canvas: HTMLCanvasElement) => this.canvas = canvas} width={1280} height={720}/>
            <div
                style={{position: 'absolute', right: 0, top: 0, background: 'rgba(255, 255, 255, 0.4)', padding: '5px'}}>
                {this.props.sensors.map(s =>
                    <div onClick={() => this.toggleSensor(s.id)}>
                        <span style={{display: 'inline-block', width: 10, height: 10, marginRight:5, background: s.color.hex}}></span>
                        <span>{s.name} - {this.props.temperatures.filter(t => t.sensorId === s.id).reverse()[0].value.toFixed(2)}</span>
                    </div>)}
            </div>
        </div>;
    }
}
