import * as React from 'preact';
import {Component} from 'preact';
import {Network} from './network';
import {connect} from 'preact-redux';

class NetworksListView extends Component<any, any> {

    render() {
        return (
            <div>
                <Network channel={9} name={'D-link'} strength={45}></Network>
                <Network channel={1} name={'Pentagram'} strength={72}></Network>
                <Network channel={3} name={'Samsung'} strength={69}></Network>
            </div>
        )
    }

}

export const NetworksList = connect()(NetworksListView);