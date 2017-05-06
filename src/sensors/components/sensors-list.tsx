import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorListItem} from './sensor-list-item';
import {Sensor} from "../state";
import {createFetchSensorsAction, createSetNameForSensorAction, createSetColorForSensorAction} from "../actions";
import {getSensors} from "../../main/reducer";
import {HTMLInputEvent} from "../../core/html";
import {ColorPalette} from "../../core/components/color-palette";
import {Color, colors} from "../../core/colors";

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
            selectedSensorName: this.props.sensors.filter(s => s.id ===id)[0].name
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
    sensors: getSensors(state)
}), {
    createFetchSensorsAction,
    createSetNameForSensorAction,
    createSetColorForSensorAction
})(SensorsListView);