import * as React from 'preact';
import {Route} from "../../routes/state";
import {connect} from 'preact-redux';
import {LoginPage} from "../../login/components/login-page";
import {AppPage} from "../../app/components/app";
import {css} from 'glamor';

const RootComponent = ({currentRoute, token, login}) => (
        <div {...css({display: 'flex', flex: 1})}>
            {currentRoute === Route.LoginPage
                ? <LoginPage></LoginPage>
                : currentRoute === Route.AppPage
                    ? <AppPage></AppPage>
                    : null}
        </div>
);

export const Main = connect(state => ({
    currentRoute: state.routes.currentRoute
}))(RootComponent);
