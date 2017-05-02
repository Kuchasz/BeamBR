import * as React from 'preact';
import {Route} from "../../routes/state";
import {connect} from 'preact-redux';
import {LoginForm} from "../../login/components/login-form";
import {NetworksList} from "../../networking/components/networks-list";
import {NetworkConnectionState} from "../../networking/components/network-connection-state";
import {SensorsList} from "../../sensors/components/sensors-list";

const MainComponent = ({currentRoute, token, login}) => (
    <div>
        <NetworkConnectionState/>
        <div>{currentRoute == Route.LoginForm ? <LoginForm></LoginForm> : <Dashboard></Dashboard>}</div>
    </div>
);

export const Main = connect(state => ({
    currentRoute: state.routes.currentRoute
}))(MainComponent);

export const Dashboard = () => (
    <div>
        <h3>Dashboard Component</h3>
        <SensorsList/>
        <NetworksList/>
    </div>
);

