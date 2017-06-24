import * as React from 'preact';
import {Temperature} from "../../temperatures/state";
import {Sensor} from "../../sensors/state";
import {Interval} from "../../core/interval";
import {Alarm, AlarmOccurence, AlarmOccurenceType, AlarmType} from "../../alarms/state";
import {css} from 'glamor';

interface Props {
    temperatures: Temperature[];
    sensors: Sensor[];
    alarmsOccurences: AlarmOccurence[];
    alarms: Alarm[];
    grayedSensors: string[];
    hiddenSensors: string[];
    intervals: Interval[];
    selectedIntervalName: string;
    maxValue: number;
    minValue: number;
    valueSteps: number;
    onApplyAlarmOccurence: (alarmsOccurences: AlarmOccurence) => void;
    onApplyVisualizationInterval: (visualizationIntervalName: string) => void;
    onGraySensor: (sensorId: string) => void;
    onHideSensor: (sensorId: string) => void;
}

interface State {
    hoveredSensor: string;
}

export class TemperaturesChart extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = {
            hoveredSensor: undefined
        };
    }

    canvas: HTMLCanvasElement;
    currentRenderLoop: number = undefined;

    componentDidMount() {
        this.renderChart();
    }

    graySensor(sensorId: string) {
            this.props.onGraySensor(sensorId);
    }

    hideSensor(sensorId: string) {
        this.props.onHideSensor(sensorId);
    }

    renderChart() {

        const {valueSteps, temperatures, minValue, maxValue, sensors} = this.props;
        const sensorsToRender = sensors.filter(s => this.props.hiddenSensors.indexOf(s.id) === -1);

        const minimumTimeUnit = 1000;

        const canvasWidth = 1280;
        const canvasHeight = 720;

        const currentTime = new Date();
        const maxTime = currentTime.getTime();
        const minTime = currentTime.getTime() - this.props.intervals.filter(i => i.name === this.props.selectedIntervalName)[0].time * minimumTimeUnit;

        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "#333";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.lineWidth = 1;

        const temperaturesToDisplay = temperatures.filter(t => t.time >= (minTime - minimumTimeUnit) && t.time <= maxTime);

        for (let i = 0; i <= valueSteps; i++) {
            ctx.beginPath();
            ctx.moveTo(40, canvasHeight / valueSteps * i);
            ctx.lineTo(canvasWidth, canvasHeight / valueSteps * i);
            ctx.stroke();
        }

        sensorsToRender && sensorsToRender.forEach(sensor => {
            const tempsForSensor = temperaturesToDisplay.filter(t => t.sensorId === sensor.id);

            ctx.strokeStyle = this.getColorForSensor(sensor);

            ctx.beginPath();

            for (let i = 0; i < tempsForSensor.length; i++) {
                const {value, time} = tempsForSensor[i];
                const mappedValue = canvasHeight - (value - minValue) * canvasHeight / (maxValue - minValue);
                const mappedTime = (time - minTime) * canvasWidth / (maxTime - minTime);
                ctx.lineTo(mappedTime, mappedValue);
            }

            ctx.stroke();
        });

        ctx.strokeStyle = '#111';

        for (let i = 0; i <= valueSteps; i++) {
            ctx.font = "12px Verdana";
            ctx.fillStyle = "#111";
            const text = ((valueSteps - i) * (maxValue - minValue) / valueSteps + minValue).toFixed(2).toString();

            const yOffset = i === 0
                ? 8
                : i === valueSteps
                    ? canvasHeight / valueSteps * i - 8
                    : canvasHeight / valueSteps * i + 4;

            ctx.fillText(text, 8, yOffset);
        }


        this.currentRenderLoop = requestAnimationFrame(() => this.renderChart());
    }

    getColorForSensor(sensor: Sensor) {
        return (this.props.grayedSensors.indexOf(sensor.id) === -1)
            ? `${sensor.color.hex}`
            : `rgba(${sensor.color.r}, ${sensor.color.g}, ${sensor.color.b}, 0.25)`;
    }

    getAlarmOccurences(sensor: Sensor) {
        const alarmsIdsForSensor = this.props.alarms.filter(a => a.sensorId === sensor.id).map(a => a.id);
        return this.props.alarmsOccurences.filter(a => alarmsIdsForSensor.indexOf(a.alarmId) !== -1);
    }

    isSensorVisible(sensor: Sensor) {
        return (this.props.hiddenSensors.indexOf(sensor.id) === -1)
    }

    isSensorHovered(sensor: Sensor) {
        return this.state.hoveredSensor === sensor.id;
    }

    setSelectedInterval(name: string) {
        this.props.onApplyVisualizationInterval(name);
    }

    setHoveredSensor(sensorId: string) {
        this.setState({
            hoveredSensor: sensorId
        })
    }

    acceptAlarmOccurence(alarmOccurence: AlarmOccurence){
        this.props.onApplyAlarmOccurence(alarmOccurence);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.currentRenderLoop);
    }

    getLastTemperatureForSensor(sensorId: string) {
        const temperaturesForSensor = this.props.temperatures.filter(t => t.sensorId === sensorId);
        return temperaturesForSensor.length > 0 ? temperaturesForSensor.reverse()[0].value.toFixed(2) : '--.--';
    }

    getAlarm(alarmId: string){
        return this.props.alarms.filter(a => a.id === alarmId)[0];
    }


    render() {
        return <div style={{display: 'inline-block', position: 'relative'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', background: '#111', padding: '10px'}}>
                {this.props.intervals.map(interval => <div onClick={() => this.setSelectedInterval(interval.name)} {...css({':hover': {background: 'rgba(255, 255, 255, 0.05)'}, padding: '8px', flex: 1, textAlign: 'center', transition: 'all 0.25s', cursor: 'pointer', fontWeight: this.props.selectedIntervalName === interval.name ? 500 : 100, color: this.props.selectedIntervalName === interval.name ? 'white' : 'gray' })}>
                    {interval.name}
                </div>)}
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-around', background: '#111', padding: '10px' }}>
                {this.props.sensors.map(sensor => <div style={{cursor: 'pointer'}}>
                    <span onClick={() => this.hideSensor(sensor.id)} style={{display: 'inline-block', borderRadius: 10, width: 10, height: 10, marginRight: 5, borderWidth: '1px', borderStyle: 'solid', borderColor: this.getColorForSensor(sensor), background: this.isSensorVisible(sensor) ? this.getColorForSensor(sensor) : null }}></span>
                    <span onClick={() => this.graySensor(sensor.id)} style={{color: this.getColorForSensor(sensor)}}>{sensor.name} - {this.getLastTemperatureForSensor(sensor.id)}</span>
                    {this.getAlarmOccurences(sensor).length > 0 ?
                        <span onMouseOut={() => this.setHoveredSensor(undefined)} onMouseOver={() => this.setHoveredSensor(sensor.id)} style={{display: 'inline-block', width: '15px', height: '15px', borderRadius: '0px', background: this.getAlarmOccurences(sensor).filter(a => a.type === AlarmOccurenceType.Current).length > 0 ? 'red' : 'orange'}}>
                            <span style={{fontSize: '12px', display: 'flex', justifyContent: 'center'}}>!</span>
                            {this.isSensorHovered(sensor) ?
                                <div style={{padding: '5px', position: 'absolute', background: 'beige'}}>
                                    {this.getAlarmOccurences(sensor).map(ao => <div>
                                        <span onClick={() => ao.type === AlarmOccurenceType.Past && this.acceptAlarmOccurence(ao)}>
                                            <span>{ao.temp.toFixed(2)} &#8451;</span>
                                            <span style={{margin: '0px 4px 0px 4px'}}>{this.getAlarm(ao.alarmId).type === AlarmType.HigherThan ? String.fromCharCode(8598) : String.fromCharCode(8601)}</span>
                                            <span>{this.getAlarm(ao.alarmId).temp.toFixed(2)} &#8451;</span>
                                        </span>
                                    </div>)}
                                </div> : null }
                        </span> : undefined }
                </div>)}
            </div>
            <canvas ref={(canvas: HTMLCanvasElement) => this.canvas = canvas} width={1280} height={720}/>
        </div>;
    }
}
