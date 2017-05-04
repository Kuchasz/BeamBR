import * as React from 'preact';
import {connect} from 'preact-redux';
import {createFetchTemperaturesAction} from "../actions";

interface Props {
    createFetchTemperaturesAction: () => void;
}

interface State {
}

class TempsReaderView extends React.Component<Props, State> {

    loopInterval: any;

    componentWillMount() {
        this.loopInterval = setInterval(() => {
            this.props.createFetchTemperaturesAction();
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.loopInterval);
    }

    render() {
        return (
            <div></div>
        )
    }
}

export const TempsReader = connect(undefined, {
    createFetchTemperaturesAction
})(TempsReaderView);