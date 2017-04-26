import * as React from 'preact';
import {Component} from 'preact';
import {connect} from 'preact-redux';
import {NetworkListItem} from './network-list-item';
import {Network} from "../state";

interface Props{
    networks: Network[];
}

interface State{

}

class NetworksListView extends Component<Props, State> {

    render() {
        return (
            <div>
                {this.props.networks.map(n => (<NetworkListItem {...n}/>))}
            </div>
        )
    }

}

export const NetworksList = connect(state => ({
    networks: state.networking.networks
}))(NetworksListView);