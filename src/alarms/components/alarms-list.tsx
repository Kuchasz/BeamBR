import * as React from 'preact';
import {connect} from 'preact-redux';
import {getAlarmsForSensor} from "../../main/reducer";
import {Alarm, AlarmType} from "../state";
import {AlarmListItem} from "./alarm-list-item";
import {HTMLInputEvent} from "../../core/html";
import {createAlarmAction, createToggleAlarmAction, createDeleteAlarmAction} from "../actions";
import {css} from 'glamor';

interface Props {
    alarms: Alarm[];
    sensorId: string;
    createAlarmAction(temp: number, type: AlarmType, description: string): void;
    createToggleAlarmAction(alarmId: string): void;
    createDeleteAlarmAction(alarmId: string): void;
}

interface State {
    value: number;
    description: string;
    selectedType: AlarmType;
}

class AlarmsListView extends React.Component<Props, State> {

    valueInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;

    constructor() {
        super();
        this.state = {
            value: 0,
            description: '',
            selectedType: AlarmType.LowerThan
        };
    }

    setValue(value: number) {
        this.setState({
            value
        })
    }

    setDescription(description: string){
        this.setState({
            description
        })
    }

    addAlarm(){
        this.props.createAlarmAction(this.state.value, this.state.selectedType, this.state.description);
    }

    componentDidMount(){
        this.valueInput.value = this.state.value.toString();
        this.descriptionInput.value = this.state.description.toString();
    }

    render() {
        return <div>
            <div>
                <span>
                    <span {...css({display: 'block'})}>Temperature</span>
                    <input ref={(element: HTMLInputElement) => this.valueInput = element} type="number" onChange={({target: {value}}: HTMLInputEvent) => this.setValue(Number(value)) }></input>
                </span>
                <span>
                    <span onClick={()=>this.setState({selectedType: AlarmType.HigherThan})} {...css({border: this.state.selectedType === AlarmType.HigherThan ? 'solid 1px #AAA' : null, cursor: 'pointer', padding: '4px 8px'})}>&#8598;</span>
                    <span onClick={()=>this.setState({selectedType: AlarmType.LowerThan})} {...css({border: this.state.selectedType === AlarmType.LowerThan ? 'solid 1px #AAA' : null, cursor: 'pointer', padding: '4px 8px'})}>&#8601;</span>
                </span>
                <span>
                    <span {...css({display: 'block'})}>Description</span>
                    <input ref={(element: HTMLInputElement) => this.descriptionInput = element} type="text" onChange={({target: {value}}: HTMLInputEvent) => this.setDescription(value) }></input>
                </span>
                <button onClick={this.addAlarm.bind(this)}>Add</button>
            </div>
            <div {...css({display: 'flex'})}>
                {this.props.alarms.map(a => <AlarmListItem onDelete={(alarmId) => this.props.createDeleteAlarmAction(alarmId)} onToggle={(alarmId) => this.props.createToggleAlarmAction(alarmId)} {...a}/>)}
            </div>
        </div>
    }
}

export const AlarmsList = connect((state, ownProps) => ({
    alarms: getAlarmsForSensor(state, ownProps.sensorId)
}), (dispatch, ownProps) => ({
    createAlarmAction: (temp, type, description) => dispatch(createAlarmAction(ownProps.sensorId, temp, type, description)),
    createToggleAlarmAction: (alarmId) => dispatch(createToggleAlarmAction(alarmId)),
    createDeleteAlarmAction: (alarmId) => dispatch(createDeleteAlarmAction(alarmId))
}))(AlarmsListView);