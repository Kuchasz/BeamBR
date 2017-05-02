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
        {color ? <div style={{width: '5px', height: '5px', background: `#${color.hex}`}}></div> : null}
        <span>{id}({name})</span>
        <span>({resolution})</span>
    </div>
)