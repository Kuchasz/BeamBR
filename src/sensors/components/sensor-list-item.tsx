import * as React from 'preact';

interface Props{
    id: string;
    resolution: number;
    name?: string;
    onClick: () => void;
}

export const SensorListItem = ({onClick, id, resolution, name}: Props) => (
    <div onClick={onClick} style={{ margin: '5px', padding: '5px' }}>
        <span>{id}({name})</span>
        <span>({resolution})</span>
    </div>
)