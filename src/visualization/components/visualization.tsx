import * as React from 'preact';
import {connect} from 'preact-redux';
import {
    getTemperatures, getSensors, getAlarmsOccurences, getAlarms, getVisualizationConfig,
    getVisualizationIntervals
} from "../../root/reducer";
import {Temperature} from "../../temperatures/state";
import {Sensor} from "../../sensors/state";
import {TemperaturesChart} from "./temperatures-chart";
import {HTMLInputEvent} from "../../core/html";
import {Alarm, AlarmOccurence} from "../../alarms/state";
import {createAcceptPastAlarmOccurenceAction} from "../../alarms/actions";
import {
    createChangeVisualizationConfigAction, createGrayVisualizationSensorAction,
    createHideVisualizationSensorAction
} from "../actions";
import {VisualizationConfig, VisualizationInterval} from "../state";

interface Props {
    temperatures: Temperature[];
    sensors: Sensor[];
    alarmsOccurences: AlarmOccurence[];
    alarms: Alarm[];
    config: VisualizationConfig;
    intervals: VisualizationInterval[];
    createAcceptPastAlarmOccurenceAction: (alarmId: string) => void;
    createChangeVisualizationConfigAction: (config: VisualizationConfig) => void;
    createHideVisualizationSensorAction: (sensorId: string) => void;
    createGrayVisualizationSensorAction: (sensorId: string) => void;
}

interface State{

}

class VisualizationView extends React.Component<Props, State> {

    maxValueInput: HTMLInputElement;
    minValueInput: HTMLInputElement;
    valueStepsInput: HTMLInputElement;

    constructor(){
        super();
    }

    onChangeMinValue(value: number){
        this.props.createChangeVisualizationConfigAction({...this.props.config, minValue: value});
    }

    onChangeMaxValue(value: number){
        this.props.createChangeVisualizationConfigAction({...this.props.config, maxValue: value});
    }

    onChangeValueSteps(steps: number){
        this.props.createChangeVisualizationConfigAction({...this.props.config, valueSteps: steps});
    }

    componentDidMount(){
        this.maxValueInput.value = this.props.config.maxValue.toString();
        this.minValueInput.value = this.props.config.minValue.toString();
        this.valueStepsInput.value = this.props.config.valueSteps.toString();
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <span style={{margin: 10, marginLeft: 0}}>
                        <label style={{display: 'block'}}>Maximum temperature</label>
                        <input ref={(element: HTMLInputElement) => this.maxValueInput = element} type="number" onChange={({target: {value}}: HTMLInputEvent) => this.onChangeMaxValue(Number(value))}/>
                    </span>
                    <span style={{margin: 10}}>
                        <label style={{display: 'block'}}>Minimum temperature</label>
                        <input ref={(element: HTMLInputElement) => this.minValueInput = element} type="number" onChange={({target: {value}}: HTMLInputEvent) => this.onChangeMinValue(Number(value))}/>
                    </span>
                    <span style={{margin: 10}}>
                        <label style={{display: 'block'}}>Number of temperature steps</label>
                        <input ref={(element: HTMLInputElement) => this.valueStepsInput = element} type="number" onChange={({target: {value}}: HTMLInputEvent) => this.onChangeValueSteps(Number(value))}/>
                    </span>
                </div>
                    <TemperaturesChart onApplyAlarmOccurence={(alarmOccurence) => this.props.createAcceptPastAlarmOccurenceAction(alarmOccurence.alarmId)}
                                       onApplyVisualizationInterval={(selectedIntervalName) => this.props.createChangeVisualizationConfigAction({...this.props.config, selectedIntervalName})}
                                       onHideSensor={(sensorId) => this.props.createHideVisualizationSensorAction(sensorId)}
                                       onGraySensor={(sensorId) => this.props.createGrayVisualizationSensorAction(sensorId)}
                                       valueSteps={this.props.config.valueSteps}
                                       maxValue={this.props.config.maxValue}
                                       minValue={this.props.config.minValue}
                                       selectedIntervalName={this.props.config.selectedIntervalName}
                                       alarms={this.props.alarms}
                                       hiddenSensors={this.props.config.hiddenSensors}
                                       grayedSensors={this.props.config.grayedSensors}
                                       alarmsOccurences={this.props.alarmsOccurences}
                                       sensors={this.props.sensors}
                                       intervals={this.props.intervals}
                                       temperatures={this.props.temperatures}/>
            </div>)
    }
}

export const Visualization = connect((state, ownProps) => ({
    temperatures: getTemperatures(state),
    sensors: getSensors(state),
    alarmsOccurences: getAlarmsOccurences(state),
    alarms: getAlarms(state),
    config: getVisualizationConfig(state),
    intervals: getVisualizationIntervals(state)
}), {
    createAcceptPastAlarmOccurenceAction,
    createChangeVisualizationConfigAction,
    createHideVisualizationSensorAction,
    createGrayVisualizationSensorAction
})(VisualizationView);