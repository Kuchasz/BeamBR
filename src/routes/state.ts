export enum Route{
    LoginPage,
    AppPage
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