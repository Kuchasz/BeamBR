import * as React from 'preact';
import {Component} from 'preact';
import {connect} from 'preact-redux';
import {createLoginAction} from "../actions";
import {HTMLInputEvent} from "../../core/html";

interface Props {
    createLoginAction(login: string, password: string): void;
}

interface State {
    login: string;
    password: string;
}

class LoginFormView extends Component<Props, State> {

    state = {
        login: undefined,
        password: undefined
    };

    render() {
        return (
            <div>
                <h2>Login to get access!</h2>
                <input onChange={({target: {value}}: HTMLInputEvent) => this.setState({login: value})}/>
                <input onChange={({target: {value}}: HTMLInputEvent) => this.setState({password: value})}/>
                <button onClick={() => this.props.createLoginAction(this.state.login, this.state.password)}>Login</button>
            </div>
        )
    }
}

export const LoginForm = connect(undefined, {
    createLoginAction
})(LoginFormView);