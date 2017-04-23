import * as React from 'preact';
import {IRouteState, Route} from "../routes/model";
import {connect} from 'preact-redux';

const MainComponent = (props: IRouteState) => (
    <div>
        {props.currentRoute == Route.LoginForm ? <LoginForm></LoginForm> :<Dashboard></Dashboard>}
    </div>
);

export const Main = connect(state => ({
    currentRoute: state.currentRoute
}))(MainComponent);

export const LoginForm = () => (
    <div>
        <h3>Login Form Component</h3>
    </div>
);

export const Dashboard = () => (
    <div>
        <h3>Dashboard Component</h3>
    </div>
);

