import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorsList} from "../../sensors/components/sensors-list";
import {NetworksList} from "../../networking/components/networks-list";
import {getInnerRoute} from "../../main/reducer";
import {NetworkConnectionState} from "../../networking/components/network-connection-state";
import {InnerRoute} from "../../routes/state";
import {createNavigateToInnerRouteAction} from "../../routes/actions";
import {Visualization} from "../../visualization/components/visualization";
import {TempsReader} from "../../temperatures/components/temps-reader";

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
            <div>
                <NetworkConnectionState/>
                <TempsReader/>
                <span style={{display: 'flex'}}>
                    <div style={{...menuButtonStyle, ...(this.props.innerRoute === InnerRoute.SensorsConfig ? selectedMenu : null)}} onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.SensorsConfig)}>Sensors config</div>
                    <div style={{...menuButtonStyle, ...(this.props.innerRoute === InnerRoute.NetworksConfig ? selectedMenu : null)}} onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.NetworksConfig)}>Networks config</div>
                    <div style={{...menuButtonStyle, ...(this.props.innerRoute === InnerRoute.Visualization ? selectedMenu : null)}} onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.Visualization)}>Visualization</div>
                </span>
                <br/>
                {this.props.innerRoute === InnerRoute.SensorsConfig ? <SensorsList/> : null}
                {this.props.innerRoute === InnerRoute.NetworksConfig ? <NetworksList/> : null}
                {this.props.innerRoute === InnerRoute.Visualization ? <Visualization/> : null}
            </div>
        )
    }
}

export const Dashboard = connect(state => ({
    innerRoute: getInnerRoute(state)
}), {
    createNavigateToInnerRouteAction
})(DashboardView);