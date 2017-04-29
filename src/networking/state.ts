export interface Network{
    ssid: string;
    strength: number;
    channel: number;
    isSecured: boolean;
}

export interface NetworkConnection{
    network: Network;
}

export interface State{
    connection: NetworkConnection;
    networks: Network[];
}