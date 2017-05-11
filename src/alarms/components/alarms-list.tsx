import * as React from 'preact';
import {connect} from 'preact-redux';
import {getAlarmsForSensor} from "../../main/reducer";
import {Alarm} from "../state";
import {AlarmListItem} from "./alarm-list-item";

interface Props{
    alarms: Alarm[];
}

interface State{

}

class AlarmsListView extends React.Component<Props, State>{
    render(){
        return <div>
            {this.props.alarms.map(a => <AlarmListItem {...a}/>)}
        </div>
    }
}

export const AlarmsList = connect((state, ownProps) => ({
    alarms: getAlarmsForSensor(state, ownProps.sensorId)
}))(AlarmsListView);