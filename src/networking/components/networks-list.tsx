import * as React from 'preact';
import {connect} from 'preact-redux';
import {NetworkListItem} from './network-list-item';
import {Network} from "../state";
import {getIsSecured} from "../reducer";
import {createFetchNetworksAction, createConnectToNetworkAction} from "../actions";
import {HTMLInputEvent} from "../../core/html";
import {getNetworks} from "../../main/reducer";

interface Props {
    networks: Network[];
    createFetchNetworksAction: () => void;
    createConnectToNetworkAction: (id: string, password: string) => void;
}

interface State {
    selectedNetworkId: string;
    password: string;
}

class NetworksListView extends React.Component<Props, State> {

    onSelectNetwork(selectedNetworkId: string) {
        this.setState({selectedNetworkId});
    }

    onTypePassword(password: string){
        this.setState({password});
    }

    onConnectToNetwork(){
        this.props.createConnectToNetworkAction(this.state.selectedNetworkId, this.state.password);
    }

    render() {
        return (
            <div>
                <button onClick={this.props.createFetchNetworksAction}>Click to fetch networks!</button>
                {this.props.networks.map(n => (<NetworkListItem onClick={this.onSelectNetwork.bind(this)} isSelected={n.ssid === this.state.selectedNetworkId} {...n}/>))}
                {this.state.selectedNetworkId
                    ? this.props.networks.filter(f => f.ssid === this.state.selectedNetworkId)[0].isSecured
                        ? <input onChange={({target: {value}}: HTMLInputEvent) => this.onTypePassword(value) } placeholder="Type password"/>
                        : null
                    : null}
                <button onClick={this.onConnectToNetwork.bind(this)}>Connect!</button>
            </div>
        )
    }

}

export const NetworksList = connect(state => ({
    networks: getNetworks(state)
}), {
    createFetchNetworksAction,
    createConnectToNetworkAction
})(NetworksListView);