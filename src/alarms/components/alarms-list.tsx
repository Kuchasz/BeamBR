import * as React from 'preact';
import {connect} from 'preact-redux';
import {getAlarmsForSensor} from "../../main/reducer";
import {Alarm, AlarmType} from "../state";
import {AlarmListItem} from "./alarm-list-item";
import {HTMLInputEvent} from "../../core/html";
import {createAlarmAction, createToggleAlarmAction} from "../actions";

interface Props {
    alarms: Alarm[];
    sensorId: string;
    createAlarmAction(temp: number, type: AlarmType): void;
    createToggleAlarmAction(alarmId: string): void;
}

interface State {
    value: number;
    selectedType: AlarmType;
}

class AlarmsListView extends React.Component<Props, State> {

    valueInput: HTMLInputElement;

    constructor() {
        super();
        this.state = {
            value: 0,
            selectedType: AlarmType.LowerThan
        };
    }

    setValue(value: number) {
        this.setState({
            value
        })
    }

    addAlarm(){
        this.props.createAlarmAction(this.state.value, this.state.selectedType);
    }

    componentDidMount(){
        this.valueInput.value = this.state.value.toString();
    }

    render() {
        return <div>
            <div>
                <span>
                    <span style={{display: 'block'}}>Temperature</span>
                    <input ref={(element: HTMLInputElement) => this.valueInput = element} type="number" onChange={({target: {value}}: HTMLInputEvent) => this.setValue(Number(value)) }></input>
                </span>
                <span>
                    <span onClick={()=>this.setState({selectedType: AlarmType.HigherThan})} style={{border: this.state.selectedType === AlarmType.HigherThan ? 'solid 1px #AAA' : null, margin: '10px'}}>&#8598;</span>
                    <span onClick={()=>this.setState({selectedType: AlarmType.LowerThan})} style={{border: this.state.selectedType === AlarmType.LowerThan ? 'solid 1px #AAA' : null, margin: '10px'}}>&#8601;</span>
                </span>
                <button onClick={this.addAlarm.bind(this)}>Add</button>
            </div>
            <div style={{display: 'flex'}}>
                {this.props.alarms.map(a => <AlarmListItem onClick={(alarmId) => this.props.createToggleAlarmAction(alarmId)} {...a}/>)}
            </div>
        </div>
    }
}

export const AlarmsList = connect((state, ownProps) => ({
    alarms: getAlarmsForSensor(state, ownProps.sensorId)
}), (dispatch, ownProps) => ({
    createAlarmAction: (temp, type) => dispatch(createAlarmAction(ownProps.sensorId, temp, type)),
    createToggleAlarmAction: (alarmId) => dispatch(createToggleAlarmAction(alarmId))
}))(AlarmsListView);