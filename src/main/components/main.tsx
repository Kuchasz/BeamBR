
import * as React from 'preact';
import {Route} from "../../routes/state";
import {connect} from 'preact-redux';
import {LoginForm} from "../../login/components/login-form";
import {Dashboard} from "../../dashboard/components/dashboard";

const MainComponent = ({currentRoute, token, login}) => (
    <div>
        <div>{currentRoute === Route.LoginForm ? <LoginForm></LoginForm> : <Dashboard></Dashboard>}</div>
    </div>
);

export const Main = connect(state => ({
    currentRoute: state.routes.currentRoute
}))(MainComponent);
