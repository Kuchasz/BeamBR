import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorListItem} from './sensor-list-item';
import {getSensors} from "../../index";
import {Sensor} from "../state";
import {createFetchSensorsAction} from "../actions";

interface Props{
    sensors: Sensor[];
    createFetchSensorsAction: () => void;
}

interface State{

}

class SensorsListView extends React.Component<Props, State>{
    render(){
        return (
            <div>
                {this.props.sensors.map(s => <SensorListItem {...s}/>)}
                <button onClick={this.props.createFetchSensorsAction}>Get Sensors</button>
            </div>
        )
    }
}

export const SensorsList = connect(state => ({
    sensors: getSensors(state)
}), {
    createFetchSensorsAction
})(SensorsListView);