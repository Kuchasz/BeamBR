import * as React from 'preact';
import {IRouteState, Route} from "../routes/model";
import {connect} from 'preact-redux';
import {LoginForm} from "../login/components/login-form";

const MainComponent = ({currentRoute}) => (
    <div>
        <div>{currentRoute == Route.LoginForm ? <LoginForm></LoginForm> : <Dashboard></Dashboard>}</div>
    </div>
);

export const Main = connect(state => ({
    currentRoute: state.routes.currentRoute
}))(MainComponent);

export const Dashboard = () => (
    <div>
        <h3>Dashboard Component</h3>
    </div>
);

