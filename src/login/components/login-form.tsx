import * as React from 'preact';
import {Component} from 'preact';
import {connect} from 'preact-redux';
import {createLoginAction, createLogoutAction} from "../actions";

class LoginFormView extends Component<any, any> {

    state = {
        login: undefined,
        password: undefined
    };

    render() {
        return (
            <div>
                <input onChange={({target: {value}}: {target: any}) => this.setState({login: value})}/>
                <input onChange={({target: {value}}: {target: any}) => this.setState({password: value})}/>
                <button onClick={() => this.props.createLoginAction(this.state.login, this.state.password)}>Login</button>
                <h3>Login Form Component</h3>
                <h2>{this.state.login}</h2>
                <h2>{this.state.password}</h2>
            </div>
        )
    }
}

// const class LoginFormView = ({createLoginAction}) => (
//     <div>
//         <input/>
//         <input/>
//         <h3>Login Form Component</h3>
//     </div>
// );

export const LoginForm = connect(undefined, {
    createLoginAction,
    createLogoutAction
})(LoginFormView);