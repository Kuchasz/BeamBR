import * as React from 'preact';
import {connect} from 'preact-redux';
import {getCurrentNetwork} from "../../index";
import {Network} from "../state";

interface Props{
    network: Network;
}

interface State{
}

class NetworkConnectionStateView extends React.Component<Props, State> {
    render(){
        return (
        <div>
            {this.props.network.ssid ? <div>
                    <span>SSID: {this.props.network.ssid}</span>
                    <span>Strength: {this.props.network.strength}</span>
                </div> : null
            }
        </div>
        )
    }
}

export const NetworkConnectionState = connect(state =>({
    network: getCurrentNetwork(state)
}))(NetworkConnectionStateView);