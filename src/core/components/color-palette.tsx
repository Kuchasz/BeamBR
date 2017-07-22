import * as React from 'preact';
import {Color} from "../colors";
import {css} from 'glamor';

interface Props {
    colors: Color[];
    onChoose: (color: Color) => void;
}

export const ColorPalette = ({onChoose, colors}: Props) => (
    <div>
        {colors.map(c => <span onClick={() => onChoose(c)} {...css({display: 'inline-block', margin: '2px', width: '20px', height: '20px', background: c.hex })}></span>)}
    </div>);