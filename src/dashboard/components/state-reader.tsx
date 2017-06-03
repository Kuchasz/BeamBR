import * as React from 'preact';
import {connect} from 'preact-redux';
import {createFetchTemperaturesAction} from "../../temperatures/actions";
import {createFetchAlarmsOccurencesAction} from "../../alarms/actions";

interface Props {
    createFetchTemperaturesAction: () => void;
    createFetchAlarmsOccurencesAction: () => void;
}

interface State {
}

class StateReader extends React.Component<Props, State> {

    loopInterval: any;

    componentWillMount() {
        this.loopInterval = setInterval(() => {
            this.props.createFetchTemperaturesAction();
            this.props.createFetchAlarmsOccurencesAction();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.loopInterval);
    }

    render() {
        return undefined;
    }
}

export const TempsReader = connect(undefined, {
    createFetchTemperaturesAction,
    createFetchAlarmsOccurencesAction
})(StateReader);