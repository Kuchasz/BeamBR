export enum Route{
    LoginForm,
    Dashboard
}

export enum InnerRoute{
    SensorsConfig,
    NetworksConfig,
    Visualization
}

export interface State{
    currentRoute: Route;
    currentInnerRoute: InnerRoute;
}