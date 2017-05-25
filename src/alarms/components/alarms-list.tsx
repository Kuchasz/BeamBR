import * as React from 'preact';
import {connect} from 'preact-redux';
import {getAlarmsForSensor} from "../../main/reducer";
import {Alarm} from "../state";
import {AlarmListItem} from "./alarm-list-item";
import {HTMLInputEvent} from "../../core/html";
import {createAlarmAction, createToggleAlarmAction} from "../actions";

interface Props {
    alarms: Alarm[];
    sensorId: string;
    createAlarmAction(minTemp: number, maxTemp: number): void;
    createToggleAlarmAction(alarmId: string): void;
}

interface State {
    minimumValue: number;
    maximumValue: number;
}

class AlarmsListView extends React.Component<Props, State> {

    maxValueInput: HTMLInputElement;
    minValueInput: HTMLInputElement;

    constructor() {
        super();
        this.state = {
            minimumValue: 0,
            maximumValue: 0
        };
    }

    setMinimum(minimumValue: number) {
        this.setState({
            minimumValue
        })
    }

    setMaximum(maximumValue: number) {
        this.setState({
            maximumValue
        })
    }

    addAlarm(){
        this.props.createAlarmAction(this.state.minimumValue, this.state.maximumValue);
    }

    componentDidMount(){
        this.maxValueInput.value = this.state.minimumValue.toString();
        this.minValueInput.value = this.state.maximumValue.toString();
    }

    render() {
        return <div>
            <div>
                <div>
                    <span style={{display: 'block'}}>Minimum value</span>
                    <input ref={(element: HTMLInputElement) => this.maxValueInput = element} onChange={({target: {value}}: HTMLInputEvent) => this.setMinimum(Number(value)) }></input>
                </div>
                <div>
                    <span style={{display: 'block'}}>Maximum value</span>
                    <input ref={(element: HTMLInputElement) => this.minValueInput = element} onChange={({target: {value}}: HTMLInputEvent) => this.setMaximum(Number(value)) }></input>
                </div>
                <button onClick={this.addAlarm.bind(this)}>Add</button>
            </div>
            {this.props.alarms.map(a => <AlarmListItem onClick={(alarmId) => this.props.createToggleAlarmAction(alarmId)} {...a}/>)}
        </div>
    }
}

export const AlarmsList = connect((state, ownProps) => ({
    alarms: getAlarmsForSensor(state, ownProps.sensorId)
}), (dispatch, ownProps) => ({
    createAlarmAction: (minTemp, maxTemp) => dispatch(createAlarmAction(ownProps.sensorId, minTemp, maxTemp)),
    createToggleAlarmAction: (alarmId) => dispatch(createToggleAlarmAction(alarmId))
}))(AlarmsListView);