import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorListItem} from './sensor-list-item';
import {Sensor} from "../state";
import {createFetchSensorsAction, createSetNameForSensorAction, createSetColorForSensorAction} from "../actions";
import {getSensors} from "../../root/reducer";
import {HTMLInputEvent} from "../../core/html";
import {ColorPalette} from "../../core/components/color-palette";
import {Color, colors} from "../../core/colors";
import {AlarmsList} from "../../alarms/components/alarms-list";

interface Props {
    sensors: Sensor[];
    createFetchSensorsAction: () => void;
    createSetNameForSensorAction: (id: string, name: string) => void;
    createSetColorForSensorAction: (id:string, color: Color) => void;
}

interface State {
    selectedSensorId: string;
    selectedSensorName: string;
}

class SensorsListView extends React.Component<Props, State> {
    selectSensor(id){
        this.setState({
            selectedSensorId: id,
            selectedSensorName: this.props.sensors.filter(s => s.id === id)[0].name
        });
    }

    setName(name: string) {
        this.props.createSetNameForSensorAction(this.state.selectedSensorId, name);
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
                        <div>
                            <label>Set color for sensor</label>
                            <ColorPalette onChoose={(color) => this.setColor(color)} colors={colors}/>
                        </div>
                        <br/>
                        <div>
                            <label style={{display: 'block'}}>Set name for sensor</label>
                            <input onChange={({target: {value}}: HTMLInputEvent) => this.setName(value) } placeholder="Name for sensor" value={this.state.selectedSensorName}></input>
                        </div>
                        <br/>
                        <div>
                            <label style={{display: 'block'}}>Alarms for sensor</label>
                            <AlarmsList sensorId={this.state.selectedSensorId}/>
                        </div>
                    </div>
                    : null}
                {this.props.sensors.map(s => <SensorListItem onClick={() => this.selectSensor(s.id)} isSelected={s.id === this.state.selectedSensorId} {...s}/>)}
            </div>
        )
    }
}

export const SensorsList = connect(state => ({
    sensors: getSensors(state)
}), {
    createFetchSensorsAction,
    createSetNameForSensorAction,
    createSetColorForSensorAction
})(SensorsListView);