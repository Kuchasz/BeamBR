import * as React from 'preact';
import {Color} from "../../core/components/color-palette";

interface Props{
    id: string;
    resolution: number;
    name?: string;
    onClick: () => void;
    isSelected: boolean;
    color?: Color;
}

export const SensorListItem = ({onClick, isSelected, color, id, resolution, name}: Props) => (
    <div onClick={onClick} style={{margin: '5px', padding: '5px', border: 'solid 1px black', background: isSelected ? 'lightgray' : null}}>
        {color ? <span style={{display:'inline-block', width: '10px', height: '10px', background: `#${color.hex}`}}></span> : null}
        <span>{id}({name})</span>
        <span>({resolution})</span>
    </div>
)