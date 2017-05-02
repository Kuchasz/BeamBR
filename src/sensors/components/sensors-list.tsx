import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorListItem} from './sensor-list-item';
import {Sensor} from "../state";
import {createFetchSensorsAction, createSetNameForSensorAction, createSetColorForSensorAction} from "../actions";
import {getSensors, getSensorById} from "../../main/reducer";
import {HTMLInputEvent} from "../../core/html";
import {ColorPalette, Color} from "../../core/components/color-palette";

interface Props {
    sensors: Sensor[];
    createFetchSensorsAction: () => void;
    createSetNameForSensorAction: (id: string, name: string) => void;
    createSetColorForSensorAction: (id:string, color: Color) => void;
    getSensorById: (id: string) => Sensor;
}

interface State {
    selectedSensorId: string;
    selectedSensorName: string;
}

const colors = [
        {hex: 'f44336'},
        {hex: 'e91e63'},
        {hex: '9c27b0'},
        {hex: '673ab7'},
        {hex: '3f51b5'},
        {hex: '2196f3'},
        {hex: '03a9f4'},
        {hex: '00bcd4'},
        {hex: '009688'},
        {hex: '4caf50'},
        {hex: '8bc34a'},
        {hex: 'cddc39'},
        {hex: 'ffeb3b'},
        {hex: 'ffc107'},
        {hex: 'ff9800'},
        {hex: 'ff5722'}
    ];

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

    setColor(color: Color){
        this.props.createSetColorForSensorAction(this.state.selectedSensorId, color);
    }

    render() {
        return (
            <div>
                <button onClick={this.props.createFetchSensorsAction}>Get Sensors</button>
                {this.state.selectedSensorId !== undefined
                    ? <div>
                        <ColorPalette onChoose={(color) => this.setColor(color)} colors={colors}/>
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
    createSetNameForSensorAction,
    createSetColorForSensorAction
})(SensorsListView);