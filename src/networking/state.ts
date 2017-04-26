export interface Network{
    ssid: string;
    strength: number;
    channel: number;
    isSecured: boolean;
}

export interface State{
    currentNetwork: string;
    networks: Network[];
}