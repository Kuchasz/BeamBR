import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorListItem} from './sensor-list-item';
import {Sensor} from "../state";
import {createFetchSensorsAction, createSetNameForSensorAction} from "../actions";
import {getSensors, getSensorById} from "../../main/reducer";

interface Props {
    sensors: Sensor[];
    createFetchSensorsAction: () => void;
    createSetNameForSensorAction: (id: string, name: string) => void;
    getSensorById: (id: string) => Sensor;
}

interface State {
    selectedSensorId: string;
    selectedSensorName: string;
}

class SensorsListView extends React.Component<Props, State> {
    selectSensor(id){
        this.setState({
            selectedSensorId: id,
            selectedSensorName: this.props.getSensorById(id).name
        });
    }

    render() {
        return (
            <div>
                {this.props.sensors.map(s => <SensorListItem onClick={() => this.selectSensor(s.id)} {...s}/>)}
                <button onClick={this.props.createFetchSensorsAction}>Get Sensors</button>
                {this.state.selectedSensorId !== undefined
                    ? <div>
                        <input placeholder="Name for sensor" value={this.state.selectedSensorName}></input>
                        <button>Set</button>
                    </div>
                    : null}
            </div>
        )
    }
}

export const SensorsList = connect(state => ({
    sensors: getSensors(state),
    getSensorById: (id: string) => getSensorById(state, id)
}), {
    createFetchSensorsAction,
    createSetNameForSensorAction
})(SensorsListView);