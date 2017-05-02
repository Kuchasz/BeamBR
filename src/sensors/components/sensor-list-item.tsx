import * as React from 'preact';

interface Props{
    id: string;
    resolution: number;
    name?: string;
    onClick: () => void;
    isSelected: boolean;
}

export const SensorListItem = ({onClick, isSelected, id, resolution, name}: Props) => (
    <div onClick={onClick} style={{margin: '5px', padding: '5px', border: 'solid 1px black', background: isSelected ? 'lightgray' : null}}>
        <span>{id}({name})</span>
        <span>({resolution})</span>
    </div>
)