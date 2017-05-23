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

    maxValueInput: HTMLInputElement;
    minValueInput: HTMLInputElement;
    valueStepsInput: HTMLInputElement;

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

    componentDidMount(){
        this.maxValueInput.value = this.state.maxValue.toString();
        this.minValueInput.value = this.state.minValue.toString();
        this.valueStepsInput.value = this.state.valueSteps.toString();
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <span style={{margin: 10, marginLeft: 0}}>
                        <label style={{display: 'block'}}>Maximum temperature</label>
                        <input ref={(element: HTMLInputElement) => this.maxValueInput = element} onChange={({target: {value}}: HTMLInputEvent) => this.onChangeMaxValue(Number(value))}/>
                    </span>
                    <span style={{margin: 10}}>
                        <label style={{display: 'block'}}>Minimum temperature</label>
                        <input ref={(element: HTMLInputElement) => this.minValueInput = element} onChange={({target: {value}}: HTMLInputEvent) => this.onChangeMinValue(Number(value))}/>
                    </span>
                    <span style={{margin: 10}}>
                        <label style={{display: 'block'}}>Number of temperature steps</label>
                        <input ref={(element: HTMLInputElement) => this.valueStepsInput = element} onChange={({target: {value}}: HTMLInputEvent) => this.onChangeValueSteps(Number(value))}/>
                    </span>
                </div>
                    <TemperaturesChart temperatures={this.props.temperatures} sensors={this.props.sensors} {...this.state}/>
            </div>)
    }
}

export const Visualization = connect((state, ownProps) => ({
    temperatures: getTemperatures(state),
    sensors: getSensors(state),
}))(VisualizationView);