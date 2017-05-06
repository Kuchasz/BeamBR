import * as React from 'preact';
import {connect} from 'preact-redux';
import {getTemperatures, getSensors} from "../../main/reducer";
import {Temperature} from "../../temperatures/state";
import {Sensor} from "../../sensors/state";
import {TemperaturesChart} from "./temperatures-chart";
import {HTMLInputEvent} from "../../core/html";

interface Props {
    temperatures: Temperature[];
    sensors: Sensor[];
}

interface State {
    minValue: number;
    maxValue: number;
    valueSteps: number;
}

const defaults = {
    minValue: 0,
    maxValue: 100,
    valueSteps: 20
};

class VisualizationView extends React.Component<Props, State> {

    constructor(){
        super();
        this.state = {...defaults};
    }

    onChangeMinValue(value: number){
        this.setState({
            minValue: value
        });
    }

    onChangeMaxValue(value: number){
        this.setState({
            maxValue: value
        });
    }

    onChangeValueSteps(steps: number){
        this.setState({
            valueSteps: steps
        })
    }

    render() {
        return (
            <div>
                <h3>Amount of temperatures: {this.props.temperatures.length}</h3>
                <div>
                    <input onKeyUp={({target: {value}}: HTMLInputEvent) => this.onChangeMaxValue(Number(value))} value={this.state.maxValue.toString()} placeholder="Maximum chart value"/>
                    <input onKeyUp={({target: {value}}: HTMLInputEvent) => this.onChangeMinValue(Number(value))} value={this.state.minValue.toString()} placeholder="Minimum chart value"/>
                    <input onKeyUp={({target: {value}}: HTMLInputEvent) => this.onChangeValueSteps(Number(value))} value={this.state.valueSteps.toString()} placeholder="Value steps"/>
                </div>
                <TemperaturesChart temperatures={this.props.temperatures} sensors={this.props.sensors} {...this.state}/>
                {this.props.sensors.map(s => <div>
                    {s.name} - {this.props.temperatures.filter(t => t.sensorId === s.id).reverse()[0].value.toFixed(2)}
                </div>)}
            </div>)
    }
}

export const Visualization = connect((state, ownProps) => ({
    temperatures: getTemperatures(state),
    sensors: getSensors(state),
}))(VisualizationView);