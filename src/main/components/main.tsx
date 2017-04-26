import * as React from 'preact';
import {Route} from "../../routes/model";
import {connect} from 'preact-redux';
import {LoginForm} from "../../login/components/login-form";

const MainComponent = ({currentRoute, token, login}) => (
    <div>
        <div>{currentRoute == Route.LoginForm ? <LoginForm></LoginForm> : <Dashboard></Dashboard>}</div>
        <h2>Your Login: {login}</h2>
        <h2>Your Token: {token}</h2>
    </div>
);

export const Main = connect(state => ({
    currentRoute: state.routes.currentRoute,
    token: state.login.token,
    login: state.login.login
}))(MainComponent);

export const Dashboard = () => (
    <div>
        <h3>Dashboard Component</h3>
    </div>
);

