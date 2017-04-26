import * as React from 'preact';
import {Component} from 'preact';
import {connect} from 'preact-redux';
import {NetworkListItem} from './network-list-item';
import {Network} from "../state";
import {getIsSecured} from "../reducer";
import {createFetchNetworksAction} from "../actions";

interface Props {
    networks: Network[];
    createFetchNetworksAction: () => void;
}

interface State {
    selectedNetworkSSID: string;
}

class NetworksListView extends Component<Props, State> {

    onSelectNetwork(ssid: string) {
        this.setState({selectedNetworkSSID: ssid});
    }

    render() {
        return (
            <div>
                <button onClick={this.props.createFetchNetworksAction}>Click to fetch networks!</button>
                {this.props.networks.map(n => (<NetworkListItem onClick={this.onSelectNetwork.bind(this)} {...n}/>))}
                {this.state.selectedNetworkSSID ? getIsSecured(this.props.networks, this.state.selectedNetworkSSID) ?
                    <input placeholder="Type password"></input> : null : null}
            </div>
        )
    }

}

export const NetworksList = connect(state => ({
    networks: state.networking.networks
}), {
    createFetchNetworksAction
})(NetworksListView);