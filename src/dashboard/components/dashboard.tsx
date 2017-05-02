import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorsList} from "../../sensors/components/sensors-list";
import {NetworksList} from "../../networking/components/networks-list";
import {getInnerRoute} from "../../main/reducer";
import {NetworkConnectionState} from "../../networking/components/network-connection-state";
import {InnerRoute} from "../../routes/state";
import {createNavigateToInnerRouteAction} from "../../routes/actions";
import {Visualization} from "../../visualization/components/visualization";

interface Props{
    innerRoute: InnerRoute;
    createNavigateToInnerRouteAction: (route: InnerRoute) => void;
}

interface State{
}

class DashboardView extends React.Component<Props, State>{
    render(){
        return (
            <div>
                <h3>Dashboard</h3>
                <NetworkConnectionState/>
                <span>
                    <button onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.SensorsConfig)}>Sensors</button>
                    <button onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.NetworksConfig)}>Networks</button>
                    <button onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.Visualization)}>Visualization</button>
                </span>
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