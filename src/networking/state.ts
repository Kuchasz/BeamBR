export interface Network{
    name: string;
    strength: number;
    channel: number;
}

export interface State{
    networks: Network[];
}