import * as React from 'preact';
import {IRouteState, Route} from "../routes/model";
import {connect} from 'preact-redux';
import {navigateToRoute} from "../routes/actions";

const MainComponent = ({currentRoute, navigateToDashboard, navigateToLoginForm}) => (
    <div>
        <button onClick={navigateToDashboard}>Dashboard</button>
        <button onClick={navigateToLoginForm}>Login</button>
        <div>{currentRoute == Route.LoginForm ? <LoginForm></LoginForm> : <Dashboard></Dashboard>}</div>
    </div>
);

export const Main = connect(state => ({
    currentRoute: state.currentRoute
}), dispatch => ({
    navigateToDashboard: () => dispatch(navigateToRoute(Route.Dashboard)),
    navigateToLoginForm: () => dispatch(navigateToRoute(Route.LoginForm))
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

