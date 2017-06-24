import * as React from 'preact';
import {connect} from 'preact-redux';
import {SensorsList} from "../../sensors/components/sensors-list";
import {NetworksList} from "../../networking/components/networks-list";
import {getInnerRoute} from "../../root/reducer";
import {NetworkConnectionState} from "../../networking/components/network-connection-state";
import {InnerRoute} from "../../routes/state";
import {createNavigateToInnerRouteAction} from "../../routes/actions";
import {Visualization} from "../../visualization/components/visualization";
import {StateReader} from "./state-reader";
import {css} from 'glamor';
import {Menu} from "./menu";
import {MenuItem} from "./menu-item";

interface Props{
    innerRoute: InnerRoute;
    createNavigateToInnerRouteAction: (route: InnerRoute) => void;
}

interface State{
}

const menuButtonStyle = {
};

const selectedMenu = {
};

class AppPageView extends React.Component<Props, State>{
    render(){
        return (
            <div {...css({display: 'flex', flex: 1})}>
                <div {...css({minWidth: '200px', background: '#1c343f'})}>
                    <Menu>
                        <MenuItem onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.SensorsConfig)} isActive={this.props.innerRoute === InnerRoute.SensorsConfig} text="Sensors"></MenuItem>
                        <MenuItem onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.NetworksConfig)} isActive={this.props.innerRoute === InnerRoute.NetworksConfig} text="Networks"></MenuItem>
                        <MenuItem onClick={() => this.props.createNavigateToInnerRouteAction(InnerRoute.Visualization)} isActive={this.props.innerRoute === InnerRoute.Visualization} text="Visualization"></MenuItem>
                    </Menu>
                </div>
                <div {...css({flex: 1, background: '#dedede'})}>
                    {this.props.innerRoute === InnerRoute.SensorsConfig ? <SensorsList/> : null}
                    {this.props.innerRoute === InnerRoute.NetworksConfig ? <NetworksList/> : null}
                    {this.props.innerRoute === InnerRoute.Visualization ? <Visualization/> : null}
                </div>
                <StateReader/>
            </div>
        )
    }
}

export const AppPage = connect(state => ({
    innerRoute: getInnerRoute(state)
}), {
    createNavigateToInnerRouteAction
})(AppPageView);