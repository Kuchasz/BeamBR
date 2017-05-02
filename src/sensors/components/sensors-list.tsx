import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorListItem} from './sensor-list-item';
import {Sensor} from "../state";
import {createFetchSensorsAction, createSetNameForSensorAction} from "../actions";
import {getSensors, getSensorById} from "../../main/reducer";
import {HTMLInputEvent} from "../../core/html";

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

    onTypeName(name: string){
        this.setState({
            selectedSensorName: name
        });
    }

    setName() {
        this.props.createSetNameForSensorAction(this.state.selectedSensorId, this.state.selectedSensorName);
    }

    render() {
        return (
            <div>
                <button onClick={this.props.createFetchSensorsAction}>Get Sensors</button>
                {this.state.selectedSensorId !== undefined
                    ? <div>
                        <input onChange={({target: {value}}: HTMLInputEvent) => this.onTypeName(value) } placeholder="Name for sensor" value={this.state.selectedSensorName}></input>
                        <button onClick={this.setName.bind(this)}>Set</button>
                    </div>
                    : null}
                {this.props.sensors.map(s => <SensorListItem onClick={() => this.selectSensor(s.id)} isSelected={s.id === this.state.selectedSensorId} {...s}/>)}
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