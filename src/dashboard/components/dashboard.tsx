import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorsList} from "../../sensors/components/sensors-list";
import {NetworksList} from "../../networking/components/networks-list";
import {getInnerRoute} from "../../main/reducer";
import {NetworkConnectionState} from "../../networking/components/network-connection-state";
import {InnerRoute} from "../../routes/state";
import {createNavigateToInnerRouteAction} from "../../routes/actions";
import {Visualization} from "../../visualization/components/visualization";
import {TempsReader} from "./state-reader";
import {css} from 'glamor';

interface Props{
    innerRoute: InnerRoute;
    createNavigateToInnerRouteAction: (route: InnerRoute) => void;
}

interface State{
}

const menuButtonStyle = {
    cursor: 'pointer',
    padding: '5px 10px',
    color: '#444',
    border: 'solid 1px #EEE',
    margin: '5px'
};

const selectedMenu = {
    background: 'rgb(33, 150, 243)',
    color: 'white'
};

class DashboardView extends React.Component<Props, State>{
    render(){
        return (
            <div {...css({display: 'flex'})}>
                <NetworkConnectionState/>
                <TempsReader/>
                <span {...css({background: 'yellow', alignSelf: 'stretch'})}>
                    <div {...css({...menuButtonStyle, ...(this.props.innerRoute === InnerRoute.SensorsConfig ? selectedMenu : null)})} onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.SensorsConfig)}>Sensors config</div>
                    <div {...css({...menuButtonStyle, ...(this.props.innerRoute === InnerRoute.NetworksConfig ? selectedMenu : null)})} onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.NetworksConfig)}>Networks config</div>
                    <div {...css({...menuButtonStyle, ...(this.props.innerRoute === InnerRoute.Visualization ? selectedMenu : null)})} onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.Visualization)}>Visualization</div>
                </span>
                <br/>
                <div {...css({background: 'red', flex: 1})}>
                    {this.props.innerRoute === InnerRoute.SensorsConfig ? <SensorsList/> : null}
                    {this.props.innerRoute === InnerRoute.NetworksConfig ? <NetworksList/> : null}
                    {this.props.innerRoute === InnerRoute.Visualization ? <Visualization/> : null}
                </div>
            </div>
        )
    }
}

export const Dashboard = connect(state => ({
    innerRoute: getInnerRoute(state)
}), {
    createNavigateToInnerRouteAction
})(DashboardView);