export interface Network{
    ssid: string;
    strength: number;
    channel: number;
    isSecured: boolean;
}

export interface State{
    currentNetworkSSID: string;
    networks: Network[];
}